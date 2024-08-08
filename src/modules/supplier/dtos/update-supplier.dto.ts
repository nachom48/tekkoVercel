
import Gender from "../enums/gender.enum";
import { ZoneDTO } from "../../zone/dto/zone.dto";
import { LocationDTO } from "../../location/location.dto";
import CreateAttachDTO from "../../attach/createAttach.dto";
import { CreateServiceDto } from "../../service/dto/create-service.dto";
import CreateTimeSheetDTO from "../../timeSheet/dto/create-timeSheet.dto";

export class UpdateSupplierDTO {
    phone?: string;
    gender?: Gender;
    birthDate?: string;
    address?: LocationDTO[];
    backgroundUrl?: CreateAttachDTO;
    selfDescription?: string;
    services?: CreateServiceDto;
    estimatedFee?: string;
    frontId?: CreateAttachDTO;
    backId?: CreateAttachDTO;
    zones?:ZoneDTO[]
    timeSheets?:CreateTimeSheetDTO[]

}


