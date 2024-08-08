import ZoneRepository from "./zone.repository";


namespace ZoneService {
  export async function getAll() {
    return await ZoneRepository.apiAccess.getAll();
  }
  
}

export default ZoneService;
