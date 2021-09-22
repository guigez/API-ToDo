import { User } from "../entities/User";

class UsersRepository{
  async findByEmail(email:string): Promise<User> { 
    
    const user = new User({"name":"Akuma Saito", "email":"akuma@gmail.com", "password":"12345"});

    return user; 
  }

  async save(user: User): Promise<void> {  }

}

export { UsersRepository }