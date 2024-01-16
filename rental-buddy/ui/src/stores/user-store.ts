import { User } from "firebase/auth";
import { action, makeAutoObservable, observable } from "mobx";

export class UserStore {
  @observable currentUser?: User

  constructor() {
    // define and init observables
    makeAutoObservable(this);
  }

  @action
  setCurrentUser(user: User) {
    this.currentUser = user;
  }
}
