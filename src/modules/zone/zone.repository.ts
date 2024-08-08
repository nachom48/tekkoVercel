import axios from "axios";

namespace ZoneRepository {
  export const apiAccess = {
    async getAll() {
        try {
          const requestUrl = `/api/zone?`;
          const response = await axios.get(requestUrl);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
  
    }

}


export default ZoneRepository;
