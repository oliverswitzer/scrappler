import { UserStore } from "@/stores/user-store";

const userStore = new UserStore

export const RootStore = {
  userStore,
};
