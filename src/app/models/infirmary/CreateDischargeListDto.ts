export interface CreateDischargeListDto {
  followingDiagnosis: string;
  anamnesis: string;
  analysis: string;
  courseOfDisease: string;
  summary: string;
  therapy: string;
  lbzPrescribing:string;
  lbzDepartment:string;
  creation: Date; // ovo je timestamp
  hospitalizationId:number;
}
