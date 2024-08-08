import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "../rootStore";
import { UserType } from "../../types/user";
import auth from '@react-native-firebase/auth';
import { getAllUsersFromFirestore } from "../../services/firestoreService";
import { db } from "../../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
            const users = await getAllUsersFromFirestore(uid, this.lastDocId);
            runInAction(() => {
                if (users.length > 0) {
                    this.allUsers = [...this.allUsers, ...users];
                    this.lastDocId = users[users.length - 1].id;
                    console.log("Updated lastDocId to:", this.lastDocId);
                } else {
                    this.lastDocId = null; // No more users to fetch
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

    getAllUsersWithLastMessages = async () => {
        try {
            const currentUser = auth().currentUser;
            // Fetch all users except the current one
            const usersSnapshot = await db.collection('users').where('id', '!=', currentUser.uid).get();
            const usersData = usersSnapshot.docs.map(doc => doc.data());

            // Extract all unique roomIds in parallel
            const roomQueries = usersData.map(user => {
                const senderId = currentUser.uid;
                const receiverId = user.id;

                // Find the chat room between the current user and this user
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

            // Await all room queries
            const roomIds = await Promise.all(roomQueries);

            // Fetch the latest message for each room in parallel
            const messagesQueries = roomIds.map(roomId => {
                if (!roomId) return null;

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
                                createdAt: messageDoc.createdAt.toDate(),
                                senderId: messageDoc.senderId,
                                receiverId: messageDoc.receiverId,
                                roomId: messageDoc.roomId,
                                audio: messageDoc.audio || null,
                            };
                        }
                        return null;
                    });
            });

            // Await all messages queries
            const lastMessages = await Promise.all(messagesQueries);

            // Combine user data with their last messages
            const usersWithMessages = usersData.map((user, index) => ({
                ...user,
                lastMessage: lastMessages[index] || null,
            }));

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
    };
}