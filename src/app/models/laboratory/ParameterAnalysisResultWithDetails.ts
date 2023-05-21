import {LabAnalysis} from "./LabAnalysis";
import {Parameter} from "./Parameter";
import {LabAnalysisDto} from "./LabAnalysisDto";
import {ParameterDto} from "./ParameterDto";

export class ParameterAnalysisResultWithDetails {
  id: number = 0;
  result: string = '';
  dateTime: Date= new Date(); // ovde je timestamp
  lbzBiochemist: string= '';
  labAnalysis: LabAnalysisDto = new LabAnalysisDto();
  parameter: ParameterDto = new ParameterDto();
}
