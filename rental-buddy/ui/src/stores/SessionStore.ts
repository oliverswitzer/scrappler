import { User } from "@/core/user";
import { Firebase } from "@/firebase";
import { action, makeAutoObservable, observable } from "mobx";
import { Listing } from "rb-shared";
import { RootStore } from "./RootStore";

export class SessionStore {
  private fb: Firebase;
  private rootStore: RootStore;
  @observable currentUser: User | null = null
  @observable listings: Listing[]

  constructor(rootStore: RootStore) {
    this.fb = new Firebase(rootStore);
    this.rootStore = rootStore
    this.listings = []

    makeAutoObservable(this);
  }

  @action
  signIn = async () => {
    await this.fb.signInWithGoogle()
  }
  @action
  signOut = async () => {
    await this.fb.signOut()
  }

  @action
  setCurrentUser = async (user: User | null) => {
    this.currentUser = user
  }

  @action
  setListings = (listings: Listing[]) => {
    this.listings = listings;
  }
}
