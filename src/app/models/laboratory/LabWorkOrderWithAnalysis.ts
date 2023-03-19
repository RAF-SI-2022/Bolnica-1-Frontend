import {OrderStatus} from "../laboratory-enums/OrderStatus";
import {
  ParameterAnalysisResultWithDetails,
} from "./ParameterAnalysisResultWithDetails";

export interface LabWorkOrderWithAnalysis {
  id: number;
  prescriptionId: number;
  lbp: string;
  creationDateTime: Date; // ovde je timestamp
  status: OrderStatus;
  technicianLbz: string;
  biochemistLbz: string;
  parameterAnalysisResults: ParameterAnalysisResultWithDetails[];

}
