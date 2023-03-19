import {Prescription} from "./Prescription";
import {OrderStatus} from "../laboratory-enums/OrderStatus";
import {ParameterAnalysisResult} from "./ParameterAnalysisResult";

export interface LabWorkOrder {
  prescription: Prescription;
  lbp: number;
  creationDateTime: Date; // ovde je timestamp
  status: OrderStatus;
  technicianLbz: string;
  biochemistLbz: string;
  parameterAnalysisResults: ParameterAnalysisResult[];
}
