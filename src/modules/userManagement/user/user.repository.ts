import axios from "axios";
import { CreateUserDTO } from "./create-user.dto";

namespace UserRepository {
  export const apiAccess = {
    async createNewUser(newUser: CreateUserDTO) {
      try {
        // Intentar stringify para detectar referencias circulares
        try {
          console.log("Objeto a enviar:", JSON.stringify(newUser, null, 2));
        } catch (stringifyError) {
          console.error("Error al stringify el objeto:", stringifyError);
        }

        const requestUrl = `/api/users`;
        const response = await axios.post(requestUrl, newUser);
        return response.data;
      } catch (error) {
        console.error("Error en createNewUser:", error);
        throw error;
      }
    },

    async createNewSupplier(newUser: CreateUserDTO) {
      try {
        const requestUrl = `/api/users/tekko`;
        const response = await axios.post(requestUrl, newUser);
        return response.data;
      } catch (error) {
        console.error("Error en createNewSupplier:", error);
        throw error;
      }
    },
  };
}

export default UserRepository;
