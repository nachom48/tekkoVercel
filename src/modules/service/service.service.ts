import ServiceRepository from "./service.repository";


namespace ServiceService {
  export async function getAll() {
    return await ServiceRepository.apiAccess.getAll();
  }
  
}

export default ServiceService;
