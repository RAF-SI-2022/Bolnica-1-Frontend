import {AnalysisParameter} from "./AnalysisParameter";

export interface ParameterAnalysisResult {
  analysesParameters: AnalysisParameter[];
  result: string;
  dateTime: Date; // ovde je timestamp
  biochemistLbz: string;

}
