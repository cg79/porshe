import { observable, action, makeObservable } from "mobx";
import httpService from "../../actions/http-service";
import { Company } from "./Company";
let company_list = require('../../data/companies.json');

const COMPANY_ROUTE = "/api/company";

class CompaniesStore {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      add: action,
    });
    this.list=company_list;
  }

  add(item: Company) {
    this.list.push(item as never);
  }

  async load() {
    debugger;
    this.list=company_list;
    // const response = await httpService.get(COMPANY_ROUTE);
    // this.list = response.data;
  }

  async saveNewCompany(companyData: any) {
    const response = await httpService.post(COMPANY_ROUTE, companyData);

    const { data } = response;
    this.add(data);

    return data;
  }
}

export default new CompaniesStore();
