import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PatientService} from "../../../services/patient-service/patient.service";
import {Patient} from "../../../models/patient/Patient";
import {Page, Zaposleni} from "../../../models/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-search-patients',
  templateUrl: './nurse-search-patients.component.html',
  styleUrls: ['./nurse-search-patients.component.css']
})
export class NurseSearchPatientsComponent implements OnInit {
  deleted: boolean = false;
  searchForm: FormGroup
  public name: string = ''
  public surname: string = ''
  public jmbg: string = ''
  public lbp: string = ''
  patientPage: Page<Patient> = new Page<Patient>()
  patientList: Patient[] = []
  routerUpper: Router
  page = 0
  pageSize = 5
  total = 0


  constructor(private patientService: PatientService, private formBuilder: FormBuilder, private router: Router) {
    this.routerUpper = router
    this.searchForm = this.formBuilder.group({
      name: '',
      surname: '',
      jmbg: '',
      lbp: ''
    })
  }

  ngOnInit(): void {
    this.patientService.getAllPatients(this.lbp, this.jmbg, this.name, this.surname, this.page, this.pageSize).subscribe((response) => {
      this.patientPage = response
      this.patientList = this.patientPage.content
      this.total = this.patientPage.totalElements

    })
  }

  deletePatient(LBP: string) {
    if (confirm("Da li ste sigurni da zelite da obrisite pacijenta " + LBP + "?")) {
      this.patientService.deletePatient(
        LBP
      ).subscribe(
        response => {
          this.getPatientList()
        }
      )
    }
  }

  updatePatient(patient: Patient) {
    //this.userService.setZaposleni(zaposleni)
    //console.log(patient.lbp)
    this.router.navigate(['/nurse-edit-patient/', patient.lbp]);
  }

  getPatientList(){
    // if(this.page == 0){
    //   this.page = 1
    // }
    this.patientService.getAllPatients(this.lbp, this.jmbg, this.name, this.surname, this.page, this.pageSize).subscribe((response) => {
      this.patientPage = response
      this.patientList = this.patientPage.content
      this.total = this.patientPage.totalElements

    })
  }


  onTableDataChange(event: any): void {
    this.page = event;
    this.getPatientList();
  }
}
