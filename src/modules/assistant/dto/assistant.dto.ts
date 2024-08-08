import { SupplierDTO } from "../../supplier/dtos/supplier.dto";


export default class AssistantDTO {
    photoUrl?: string;
    phone?: string;
    backgroundUrl?: string;
    supplier?:SupplierDTO;
}