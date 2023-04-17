import {LabAnalysis} from "./LabAnalysis";
import {Parameter} from "./Parameter";

export interface ParameterAnalysisResultWithDetails {
  id: number;
  result: string;
  dateTime: Date; // ovde je timestamp
  lbzBiochemist: string;
  labAnalysis: LabAnalysis;
  parameter: Parameter;
}
