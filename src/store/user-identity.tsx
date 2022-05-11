export class User {
  logo = "";
  name = "";
  constructor(data: any) {
    const { logo, name } = data;
    this.logo =
      logo ||
      "https://preview.forward31.com/wp-content/uploads/2021/10/Forward-31-05-Fanzone-0214.jpg";
    this.name = name;
  }
}
