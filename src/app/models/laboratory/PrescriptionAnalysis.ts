export interface PrescriptionAnalysis{
  analysisId: number;
  parametersIds: number[];

}

export class PrescriptionAnalysis{
  analysisId: number = 0;
  parametersIds: number[] = [];
}
