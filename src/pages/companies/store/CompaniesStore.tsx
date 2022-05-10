import { observable, computed, action, autorun, makeObservable } from "mobx";
import httpService from "../../../actions/http-service";
import { Company } from "./Company";

export class CompaniesStore {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      add: action,
    });
  }
 

  add(item: Company) {
    this.list.push(item as never);
  }

  async load(){
    const response = await httpService.get('');
    debugger;
    this.list = response;
  }

}
