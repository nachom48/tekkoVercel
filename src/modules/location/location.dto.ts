import { ClientDTO } from "../client/dto/client.dto";
import { SupplierDTO } from "../supplier/dtos/supplier.dto";


export class LocationDTO  {
    name?: string;
    street?: string;
    zipCode?: string;
    state?: string;
    city?: string;
    number?: string;
    apartment?: string;
    reference?: string;
    latitud?: string;
    longitud?: string;
    country?: string;
    client?: ClientDTO;
    supplier?: SupplierDTO;

}
