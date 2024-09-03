import { makeAutoObservable, runInAction } from "mobx";
import auth from '@react-native-firebase/auth';
import moment from "moment";

import { getAllUsersFromFirestore } from "../../services/firestoreService";
import { UserType } from "../../types/user";
import { db } from "../../config/firebase";
import { RootStore } from "../rootStore";


export class MessengerStore {
    private readonly root: RootStore;
    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    userData = [];
    lastMessage = [];

    allUsers: UserType[] = [];
    loading: boolean = true;
    searchedUsers: UserType[] = [];
    lastDocId: string | null = null;


    getAllUsers = async () => {
        this.loading = true;
        try {
            const uid = auth()?.currentUser?.uid;
            console.log("Fetching users with lastDocId:", this.lastDocId);
            const users = await getAllUsersFromFirestore(uid);
            runInAction(() => {
                if (users.length > 0) {
                    this.allUsers = [...this.allUsers, ...users];
                    this.lastDocId = users[users.length - 1].id;
                    console.log("Updated lastDocId to:", this.lastDocId);
                } else {
                    this.lastDocId = null; 
                    console.log("No more users to fetch");
                }
            });
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };



    filterUsers = (query: string) => {
        runInAction(() => {
            if (!query) {
                this.searchedUsers = [];
            } else {
                this.searchedUsers = this.allUsers.filter(user =>
                    user.name.toLowerCase().includes(query.toLowerCase())
                );
            }
        });
    };

    getUnreadMessagesCount = async (roomId: string, receiverId: string) => {
        const messagesRef = db.collection('Messages');
        const snapshot = await messagesRef
            .where('roomId', '==', roomId)
            .where('receiverId', '==', receiverId)
            .where('read', '==', false)
            .get();
        return snapshot.size;
    }

    getAllUsersWithLastMessages = async () => {
        try {
            const currentUser = auth().currentUser;
            if (!currentUser) throw new Error("No current user");

            const usersSnapshot = await db.collection('users').where('id', '!=', currentUser.uid).get();
            const usersData = usersSnapshot.docs.map(doc => doc.data());

            const roomQueries = usersData.map(user => {
                const senderId = currentUser.uid;
                const receiverId = user.id;

                return db.collection('Rooms')
                    .where('senderId', 'in', [senderId, receiverId])
                    .where('receiverId', 'in', [senderId, receiverId])
                    .limit(1)
                    .get()
                    .then(roomQuerySnapshot => {
                        if (!roomQuerySnapshot.empty) {
                            return roomQuerySnapshot.docs[0].id;
                        }
                        return null;
                    });
            });

            const roomIds = await Promise.all(roomQueries);
            const messagesQueries = roomIds.map(roomId => {
                if (!roomId) return Promise.resolve(null);

                return db.collection('Messages')
                    .where('roomId', '==', roomId)
                    .orderBy('createdAt', 'desc')
                    .limit(1)
                    .get()
                    .then(messagesSnapshot => {
                        if (!messagesSnapshot.empty) {
                            const messageDoc = messagesSnapshot.docs[0].data();
                            return {
                                _id: messageDoc._id,
                                text: messageDoc.text,
                                createdAt: messageDoc.createdAt ? moment.utc(messageDoc?.createdAt?.toDate()).local().format('YYYY-MM-DD HH:mm:ss') : null,
                                senderId: messageDoc.senderId,
                                receiverId: messageDoc.receiverId,
                                roomId: messageDoc.roomId,
                                audio: messageDoc.audio || null,
                                video: messageDoc.video || null,
                            };
                        }
                        return null;
                    });
            });

            const lastMessages = await Promise.all(messagesQueries);

            const unreadMessagesQueries = roomIds.map((roomId, index) => {
                if (!roomId) return Promise.resolve({ userId: usersData[index].id, unreadCount: 0 });

                const receiverId = auth().currentUser.uid;
                return this.getUnreadMessagesCount(roomId, receiverId)
                    .then(count => ({
                        userId: usersData[index].id,
                        unreadCount: count
                    }));
            });

            const unreadMessageCounts = await Promise.all(unreadMessagesQueries);

            const usersWithMessages = usersData.map((user, index) => {
                const unreadCount = unreadMessageCounts.find(count => count.userId === user.id)?.unreadCount || 0;

                return {
                    ...user,
                    lastMessage: lastMessages[index] || null,
                    unreadMessages: unreadCount
                };
            });

            runInAction(() => {
                this.userData = usersWithMessages.filter(user => user.lastMessage !== null);
            });
        } catch (error) {
            console.error("Failed to fetch users with last messages", error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

}