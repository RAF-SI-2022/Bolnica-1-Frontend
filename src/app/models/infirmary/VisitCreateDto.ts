export interface VisitCreateDto{
  visitorName: string;
  visitorSurname: string;
  visitorJmbg: string;
  visitTime: Date; //ovo je timestamp
  note: string;
  hospitalizationId: number;
}
