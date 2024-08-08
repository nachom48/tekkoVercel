import AuthRepository from "./auth.repository";


namespace AuthService {
  export async function postGoogle(body:string) {
    return await AuthRepository.postGoogle(body);
  }

}

export default AuthService;
