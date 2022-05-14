import { makeObservable, observable } from "mobx";
import { User } from "./user-identity";

class IdentityStore {
  loggedUser: User | null = null;

  constructor(){
    makeObservable(this, {
      loggedUser: observable,
    });
  }

  setLoggedUser(jsonUser: any) {
    if (!jsonUser) {
      throw new Error("You cannot set a invalid user");
    }
    this.loggedUser = new User(jsonUser);
  }

  logout() {
    // debugger;
    this.loggedUser = null;
    // this.loggedUser = new User({email:'geo'});
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
