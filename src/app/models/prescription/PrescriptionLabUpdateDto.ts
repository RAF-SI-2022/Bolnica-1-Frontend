import {PrescriptionAnalysisDto} from "./PrescriptionAnalysisDto";

export class PrescriptionLabUpdateDto{
  id: number =0;
  departmentFromId: number = 0;
  departmentToId: number = 0;

  creationDateTime: Date = new Date(); // ovde je timestamp
  comment: string = "";
  prescriptionAnalysisDtos: PrescriptionAnalysisDto[] = [];
}
