export interface DiagnosisCode {
  code: string;
  description: string;
  latinDescription: string;
}
export class DiagnosisCodeDto {
  code: string = '';
  description: string = '';
  latinDescription: string = '';
}
