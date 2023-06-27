export interface HospitalizationCreateDto {
  lbzDoctor: string;
  patientAdmission: Date; // ovo je timestamp
  hospitalRoomId: number;
  // dischargeDateAndTime: Date; // ovo je timestamp
  prescriptionId: number;
  note: string;
}
