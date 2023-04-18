import {LabAnalysis} from "./LabAnalysis";
import {Parameter} from "./Parameter";

export class ParameterAnalysisResultWithDetails {
  id: number = 0;
  result: string = '';
  dateTime: Date= new Date(); // ovde je timestamp
  lbzBiochemist: string= '';
  labAnalysis: LabAnalysis = new LabAnalysis();
  parameter: Parameter = new Parameter();
}
