export interface CovidExaminationHistoryCreateDto{
  examDate: Date;
  lbz: string;
  medicalRecordId: number;

  lbp: string;
  symptoms: string;
  duration: string;
  bodyTemperature: number;
  bloodPressure: number;
  saturation: number;
  lungCondition: string;
  therapy: string;
}
