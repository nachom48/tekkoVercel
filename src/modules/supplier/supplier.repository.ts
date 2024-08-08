import axios from "axios";
import { UpdateSupplierDTO } from "./dtos/update-supplier.dto";
import { SupplierDTO } from "./dtos/supplier.dto";

namespace SupplierRepository {
  export const apiAccess = {
    async updateById(id: string, updateSupplier: UpdateSupplierDTO) {
      try {
        const response = await axios.patch(`/api/supplier/${id}`, updateSupplier);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

}
}


export default SupplierRepository;
