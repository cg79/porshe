
import Router from "next/router";

class Redirect {
    navigate(url:string){
        Router.push(url);
    }
}

export default Redirect;