import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "../rootStore";
import { UserType } from "../../types/user";
import auth from '@react-native-firebase/auth';
import { getAllUsersFromFirestore } from "../../services/firestoreService";
import { db } from "../../config/firebase";

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


    filterUsers =  (query: string) => {
        runInAction(async () => {
            if (!query) {
                const uid = auth()?.currentUser?.uid;
                this.allUsers = await getAllUsersFromFirestore(uid);
            } else {
                this.allUsers = this.allUsers.filter(user =>
                    user.name.toLowerCase().includes(query.toLowerCase())
                );
            }
        })
    };


    getAllUsersWithLastMessages = async () => {
        try {
            const currentUser = auth().currentUser;
            const usersSnapshot = await db.collection('users').where('id', '!=', currentUser.uid).get();
            const usersData = usersSnapshot?.docs.map(doc => doc.data());

            const usersWithMessages = await Promise.all(usersData.map(async user => {
                const groupId = `${user.id}-${currentUser?.uid}`;
                const reverseId = `${currentUser?.uid}-${user.id}`;
                const chatDoc = await db.collection('chats').doc(groupId).get();
                const reverseChatDoc = await db.collection('chats').doc(reverseId).get();
                let lastMessage = null;

                if (chatDoc.exists) {
                    const messages = chatDoc.data().messages || [];
                    lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
                } else if (reverseChatDoc.exists) {
                    const messages = reverseChatDoc.data().messages || [];
                    lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
                }

                return {
                    ...user,
                    lastMessage
                };
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