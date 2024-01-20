import { User } from "@/core/user";
import { Firebase } from "@/firebase";
import { action, makeAutoObservable, observable } from "mobx";
import { Listing } from "rb-shared";
import { RootStore } from "./RootStore";

export class SessionStore {
  private fb: Firebase;
  private rootStore: RootStore;
  @observable currentUser?: User
  @observable listings: Listing[]

  constructor(rootStore: RootStore) {
    this.fb = new Firebase();
    this.rootStore = rootStore
    this.listings = []

    makeAutoObservable(this);
  }

  @action
  logIn = async () => {
    const user = await this.fb.signInWithGoogle()

    if (user) {
      const listings = await this.fb.getListings()
      this.currentUser = user;
      this.setListings(listings);
    }
  }

  @action
  setListings = (listings: Listing[]) => {
    this.listings = listings;
  }
}
