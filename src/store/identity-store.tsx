import { User } from "./user-identity";

const USER_KEY = "porsche_user";

class IdentityStore {
  loggedUser: User | null = null;

  constructor() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    const storageuser = localStorage.getItem(USER_KEY);
    if (!storageuser) {
      return;
    }
    const jsonUser = this.stringToJson(storageuser);
    this.loggedUser = new User(jsonUser);
  }

  setLoggedUser(jsonUser: any) {
    if (!jsonUser) {
      throw new Error("You cannot set a invalid user");
    }
    this.loggedUser = new User(jsonUser);
    this.loggedUser = jsonUser;
    localStorage.setItem(USER_KEY, JSON.stringify(jsonUser));
  }

  stringToJson(str: string) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  }
}

export default new IdentityStore();
