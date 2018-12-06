export class Student {
  public id: string;
  public firstname: string;
  public lastname: string;
  public class_id: number;


  constructor(id: string, firstname: string, lastname: string, class_id: number) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.class_id = class_id;
  }

  getFullName(){
    return this.firstname+" "+this.lastname;
  }
}




