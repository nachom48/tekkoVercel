import { UserRole } from "../../../../shared/enumerations/userRole.enum";
import { ClientDTO } from "../../../client/dto/client.dto";
import { SupplierDTO } from "../../../supplier/dtos/supplier.dto";



export default class UpdateUserDTO {

    id?: string;

    login?: string;

    firstName?: string;

    lastName?: string;

    email?: string;

    activated?: boolean;

    password?: string;

    verificationCode?: number;

    imageUrl?: string;

    role?: UserRole;

    client?: ClientDTO;

    supplier?: SupplierDTO;

}
