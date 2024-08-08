import { CreateSupplierDTO } from "../../supplier/dtos/create-supplier.dto";


export class CreateUserDTO {
  email?: string ;
  password?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  supplier?: CreateSupplierDTO;
}
