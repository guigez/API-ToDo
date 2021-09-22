import { uuid } from "uuidv4";

class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, 'id'>, id?: string){
    Object.assign(this, props);

    //caso seja o novo usuario, cria-se um id
    if(!id){
      this.id = uuid();
    }
  }
}
export { User }