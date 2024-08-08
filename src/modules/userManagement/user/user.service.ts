import { CreateUserDTO } from "./create-user.dto";
import UserRepository from "./user.repository";


namespace UserService {
  export async function createUser(newUser:CreateUserDTO) {
    console.log(newUser)
    return await UserRepository.apiAccess.createNewUser(newUser);
  }

  export async function createNewSupplier(newUser:CreateUserDTO) {
    return await UserRepository.apiAccess.createNewSupplier(newUser);
  }

  
}

export default UserService;
