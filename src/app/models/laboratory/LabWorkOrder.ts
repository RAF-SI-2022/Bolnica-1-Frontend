import {Prescription} from "./Prescription";
import {OrderStatus} from "../laboratory-enums/OrderStatus";
import {ParameterAnalysisResult} from "./ParameterAnalysisResult";

export class LabWorkOrder {
  //dodat id
  id: number = 0;
  prescription: Prescription = new Prescription();
  lbp: number = 0;
  creationDateTime: Date = new Date(); // ovde je timestamp
  status: OrderStatus = OrderStatus.NEOBRADJEN;
  technicianLbz: string = '';
  biochemistLbz: string = '';
  //parameterAnalysisResults: ParameterAnalysisResult[] = [];
}
