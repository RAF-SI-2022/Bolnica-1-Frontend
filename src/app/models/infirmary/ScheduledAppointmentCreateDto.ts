export interface ScheduledAppointmentCreateDto{
  patientAdmission: Date; // ovo je Timestamp
  note: string;
  prescriptionId: number;
}
