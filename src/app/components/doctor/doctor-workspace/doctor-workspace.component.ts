import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {FormBuilder} from "@angular/forms";
import {ExaminationService} from "../../../services/examination-service/examination.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Page} from "../../../models/models";

@Component({
  selector: 'app-doctor-workspace',
  templateUrl: './doctor-workspace.component.html',
  styleUrls: ['./doctor-workspace.component.css']
})
export class DoctorWorkspaceComponent implements OnInit {

  public patients: Patient[] = [];
  patientPage: Page<Patient> = new Page<Patient>()
  total = 0

  isPopupVisible = false;
  /*
  //popup se pojavljujem kliktajem na red
  selectedPerson: any;

  onTableRowClicked(event: any) {
    if (event.target.tagName === 'TD') {
      this.selectedPerson = event.target.parentElement.cells[0].textContent;
      this.isPopupVisible = true;
    }
  }
*/

  constructor(private patientService: PatientService, private formBuilder: FormBuilder, examinationService: ExaminationService,  private router: Router) {}

  showPopup(event: any) {
    const row = event.target.closest('.table-row');
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  confirmPregled() {
    //otvori stranicu /doctor-workspace-one-patient
    //za selektovanog pacijenta
    this.router.navigate(['doctor-workspace-one']);

  }


  ngOnInit(): void {
    this.patientService.getAllPatients('', '', '', '', 0, 5).subscribe((response) => {
      this.patientPage = response
      this.patients = this.patientPage.content
      this.total = this.patientPage.totalElements

    })

  }

  getPatients(){
    this.patientService.getAllPatients('', '', '', '', 0, 5).subscribe((response) => {
      this.patientPage = response
      this.patients = this.patientPage.content
      this.total = this.patientPage.totalElements

    })
  }

  // onRowClick(lbp: string) {
  //   this.router.navigate(['doctor-workspace-one']);
  // }



}
