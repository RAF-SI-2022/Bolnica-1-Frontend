import {AdmissionStatus} from "../infirmary-enums/AdmissionStatus";

export interface ScheduledAppointmentDto{
  id: number;
  patientAdmission: Date; // ovo je timestamp
  admissionStatus: AdmissionStatus;
  note: string;
  lbzScheduler: string;
  prescriptionId: number;
}
