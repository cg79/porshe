
const USER_KEY = 'porsche_user';

class IdentityStore {
    loggedUser: any;
    constructor(){
        this.getLoggedUser();
    }

    getLoggedUser(){
        const storageuser= localStorage.getItem(USER_KEY);
        if(!storageuser){
            return;
        }
        this.loggedUser = this.stringToJson(storageuser);
    }

    setLoggedUser(jsonUser: any){
        this.loggedUser = jsonUser;
        localStorage.setItem(USER_KEY, JSON.stringify(jsonUser));
    }

    stringToJson(str:string){
        try{
            return JSON.parse(str);
        }
        catch(err){
            return null;
        }
    }
}

export default new IdentityStore();