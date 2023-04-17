export interface PatientStateCreateDto{
  dateExamState: Date; //ovo je Date
  timeExamState: Date; //ovo je Time
  temperature: number;
  systolicPressure: number;
  diastolicPressure: number;
  pulse: number;
  therapy: string;
  description: string;
  hospitalizationId: number;
}
