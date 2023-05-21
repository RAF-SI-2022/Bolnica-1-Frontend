import {OrderStatus} from "../laboratory-enums/OrderStatus";
import {ParameterAnalysisResultWithDetails,} from "./ParameterAnalysisResultWithDetails";

export class LabWorkOrderWithAnalysis {
  id: number = 0;
  prescriptionId: number = 0;
  lbp: string = '';
  creationDateTime: Date= new Date(); // ovde je timestamp
  status: OrderStatus = OrderStatus.NEOBRADJEN;
  technicianLbz: string= '';
  biochemistLbz: string = '';
  parameterAnalysisResults: ParameterAnalysisResultWithDetails[]= [];

}
