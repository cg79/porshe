import { observable, computed, action, autorun, makeObservable } from "mobx";
import httpService from "../../../actions/http-service";
import { Company } from "./Company";

const COMPANY_ROUTE = "/api/company";

class CompaniesStore {
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

  async load() {
    const response = await httpService.get(COMPANY_ROUTE);
    this.list = response.data;
  }

  async saveNewCompany(companyData: any) {
    const response = await httpService.post(COMPANY_ROUTE, companyData);

    const { data } = response;
    this.add(data);

    return data;
  }
}

export default new CompaniesStore();
