import AssistantDTO from "../../assistant/dto/assistant.dto";
import DeliveryDTO from "../../delivery/dto/delivery.dto";
import { LocationDTO } from "../../location/location.dto";
import { ServiceDTO } from "../../service/dto/service.dto";
import TimeSheetDTO from "../../timeSheet/dto/timeSheet.dto";
import { ZoneDTO } from "../../zone/dto/zone.dto";
import Gender from "../enums/gender.enum";


export class SupplierDTO  {
    id?:string;
    photoUrl?: string;
    phone?: string;
    address?: LocationDTO[];
    deliveries?: DeliveryDTO[];
    backgroundUrl?: string;
    assistants?: AssistantDTO[];
    services?: ServiceDTO[];
    selfDescription?: string;
    estimatedFee?: string;
    frontId?: string;
    backId?: string;
    gender?:Gender
    birthDate?:Date
    zones?: ZoneDTO[];
    timeSheets?:TimeSheetDTO[]

}
