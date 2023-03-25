export interface Anamnesis {
  mainProblems: string;
  currDisease: string;
  personalAnamnesis: string;
  familyAnamnesis: string;
  patientOpinion: string;
}

export class Anamnesis {
  mainProblems: string = '';
  currDisease: string = '';
  personalAnamnesis: string = '';
  familyAnamnesis: string = '';
  patientOpinion: string = '';
}
