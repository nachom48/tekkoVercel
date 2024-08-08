import DeliveryDTO from "../../delivery/dto/delivery.dto";
import { SupplierDTO } from "../../supplier/dtos/supplier.dto";
import { ServiceType } from "../enums/serviceType.enum";

export class ServiceDTO {
    id?:string;
    licenceUrl?: string[];
    pricePerHour?: number;
    observations?: string;
    type?: ServiceType;
    deliveries?: DeliveryDTO[];
    supplier?: SupplierDTO;
}
