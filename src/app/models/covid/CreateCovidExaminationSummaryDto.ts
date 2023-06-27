export interface CreateCovidExaminationSummaryDto {
  examId: number,
  lbp: string,
  examDate: Date,
  lbz: string,
  symptoms: string,
  duration: string,
  bodyTemperature: string,
  bloodPressure: string,
  saturation: string,
  lungCondition: string,
  therapy: string
}
