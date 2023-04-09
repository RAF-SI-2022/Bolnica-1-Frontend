import {LabWorkOrder} from "./LabWorkOrder";
import {AnalysisParameter} from "./AnalysisParameter";

export interface UpdateParameterAnalysisResultMessage {
  workOrderDto: LabWorkOrder;
  analysisParameterDto: AnalysisParameter;
  result: string;
  dateTime: Date; // ovde je timestamp
  biochemistLbz: string;
}
