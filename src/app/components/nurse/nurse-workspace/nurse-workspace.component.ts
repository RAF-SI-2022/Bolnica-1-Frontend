import {Component, OnInit} from '@angular/core';
import {ExaminationService} from "../../../services/examination-service/examination.service";
import {PatientService} from "../../../services/patient-service/patient.service";

@Component({
  selector: 'app-nurse-workspace',
  templateUrl: './nurse-workspace.component.html',
  styleUrls: ['./nurse-workspace.component.css']
})
export class NurseWorkspaceComponent implements OnInit {
  activeStatus: string = ''
  constructor(examinationService: ExaminationService, patientService: PatientService) {
  }

  ngOnInit(): void {
  }

  promeniStatus(status: string){
    if(status == "Ceka"){
      this.activeStatus = "Ceka"
    }
    if(status == "Trenutno"){
      this.activeStatus = "Trenutno"
    }
    if(status == "Otkazano"){
      this.activeStatus = "Otkazano"
    }
    if(status == "Zavrseno"){
      this.activeStatus = "Zavrseno"
    }
  }
}
