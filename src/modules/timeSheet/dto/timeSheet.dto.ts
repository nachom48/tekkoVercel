import { SupplierDTO } from "../../supplier/dtos/supplier.dto";
import { Weekday } from "../../supplier/enums/weekDay.enum";


export default class TimeSheetDTO{
    day?: Weekday;
    dayAvailable?: boolean;
    timeFrom?: number;
    timeTo?: number;
    supplier?: SupplierDTO; 

}




