import {ExaminationStatus} from "../laboratory-enums/ExaminationStatus";

export interface ScheduledLabExamination {
  id: number;
  departmentId: number;
  lbp:string;
  scheduledDate: Date;
  examinationStatus: ExaminationStatus.ZAKAZANO;
  note: string;
  lbz: string;
}
