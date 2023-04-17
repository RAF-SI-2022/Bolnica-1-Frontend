export interface PatientStateDto{
  id: number;
  dateExamState: Date; // ovo je Date
  timeExamState: Date; // ovo je Time
  temperature: number;
  systolicPressure: number;
  diastolicPressure: number;
  pulse: number;
  therapy: string;
  description: string;
  lbz: string;
  hospitalizationId: number;

}
