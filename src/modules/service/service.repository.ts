import axios from "axios";

namespace ServiceRepository {
  export const apiAccess = {
    async getAll() {
        try {
          const requestUrl = `/api/service?`;
          const response = await axios.get(requestUrl);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
  
    }

}


export default ServiceRepository;
