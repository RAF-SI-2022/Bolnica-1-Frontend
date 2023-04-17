export interface VisitDto{
  id: number;
  visitorName: string;
  visitorSurname: string;
  visitorJmbg: string;
  lbzRegister: string;
  visitTime: Date; //ovo je timestamp
  note: string;
  hospitalizationId: number;
}
