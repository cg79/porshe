export class User {
  picture = "";
  name = "";
  email = '';

  constructor(data: any) {
    const { picture, name, email } = data;
    this.email=email;
    this.picture =
    picture ||
      "https://preview.forward31.com/wp-content/uploads/2021/10/Forward-31-05-Fanzone-0214.jpg";
    this.name = name;
  }

  info(){
    const {name, email} = this;

    if(name){
      return name;
    }

    if(email){
      return email.substring(0, email.indexOf('@'));
    }

    return '';
  }
}
