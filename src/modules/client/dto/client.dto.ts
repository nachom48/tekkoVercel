import DeliveryDTO from "../../delivery/dto/delivery.dto";
import { LocationDTO } from "../../location/location.dto";


export class ClientDTO{
    photoUrl?: string;
    address?: LocationDTO[];
    deliveries?: DeliveryDTO[];
}