import { SupplierDTO } from "../../supplier/dtos/supplier.dto";
import CoordinateDTO from "./coordinate.dto";


export class ZoneDTO {
  id?:string;
  name?: string;
  coordinates?: CoordinateDTO[];
  center?: CoordinateDTO;
  description?: string;
  suppliers?:SupplierDTO[]

}