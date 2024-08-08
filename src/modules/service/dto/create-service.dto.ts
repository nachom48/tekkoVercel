import CreateAttachDTO from "../../attach/createAttach.dto";
import { ServiceType } from "../enums/serviceType.enum";


export class CreateServiceDto {
    attachImages?: CreateAttachDTO[];
    types?: ServiceType[];
}
