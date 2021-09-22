import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";



interface IUserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{  
  async execute(data: IUserRequest){
    const usersRepository = new UsersRepository();
    
    //verifica se o usuario ja existe
    const userAlreadyExist = await usersRepository.findByEmail(data.email);

    if(userAlreadyExist){
      return userAlreadyExist;
      //throw new Error('User already exists');
    }

    const user = new User(data);

    //salvando usuario
    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService }