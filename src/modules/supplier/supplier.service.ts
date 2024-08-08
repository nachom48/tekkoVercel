import { SupplierDTO } from "./dtos/supplier.dto";
import { UpdateSupplierDTO } from "./dtos/update-supplier.dto";
import SupplierRepository from "./supplier.repository";


namespace SupplierService {
  export async function updateById(id:string,updateSupplier:UpdateSupplierDTO) {
    return await SupplierRepository.apiAccess.updateById(id,updateSupplier);
  }
  
}

export default SupplierService;
