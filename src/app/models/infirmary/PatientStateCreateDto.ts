import {Time} from "@angular/common";

export interface PatientStateCreateDto{
  dateExamState: Date; //ovo je Date
  timeExamState: string; //ovo je Time
  temperature: number;
  systolicPressure: number;
  diastolicPressure: number;
  pulse: number;
  therapy: string;
  description: string;
  hospitalizationId: number;
}
