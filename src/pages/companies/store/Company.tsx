import { observable, computed, makeObservable } from "mobx";
export class Company {
  name;
  constructor(data: any) {
    const { name } = data;
    this.name = name;
    makeObservable(this, {
      name: observable,
    });
  }
}
