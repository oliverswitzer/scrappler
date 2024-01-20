import { SessionStore } from "./SessionStore";

export class RootStore {
  sessionStore: SessionStore;

  constructor() {
    this.sessionStore = new SessionStore(this);
  }
};
