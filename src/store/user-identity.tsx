export class User {
  logo = "";
  name = "";
  email = '';

  constructor(data: any) {
    const { logo, name, email } = data;
    this.email=email;
    this.logo =
      logo ||
      "https://preview.forward31.com/wp-content/uploads/2021/10/Forward-31-05-Fanzone-0214.jpg";
    this.name = name;
  }

  info(){
    return this.email? this.email:'no email';
  }
}
