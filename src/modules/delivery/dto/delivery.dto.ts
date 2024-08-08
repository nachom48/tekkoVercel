import { ClientDTO } from "../../client/dto/client.dto";
import { ServiceDTO } from "../../service/dto/service.dto";
import { SupplierDTO } from "../../supplier/dtos/supplier.dto";
import { DeliveryStatus } from "../enums/deliveryStatus.enum";


export default class DeliveryDTO {
    status?: DeliveryStatus;
    startDate?: Date;
    finishDate?: Date;
    price?: number;
    client?: ClientDTO;
    observations?: string;
    attached?: string[];
    supplier?: SupplierDTO;
    service?: ServiceDTO;
}
