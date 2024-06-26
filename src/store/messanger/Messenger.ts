import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "../rootStore";
import { UserType } from "../../types/user";
import { getAllUsersFromFirestore } from "../../services/firestoreService";

export class MessengerStore {
    private readonly root: RootStore;
    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    userData = [];

    allUsers: UserType[] = [];


    getAllUsers = () => {
        runInAction(async () => {
            const users = await getAllUsersFromFirestore();
            this.allUsers = users;
            this.userData = users;
        })
    };

    filterUsers = (query: string) => {
        runInAction(() => {
            if (!query) {
                this.userData = this.allUsers;
            } else {
                this.userData = this.allUsers.filter(user =>
                    user.name.toLowerCase().includes(query.toLowerCase())
                );
            }
        })
    };



}