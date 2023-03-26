import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../models/patient/Patient";
import {Anamnesis} from "../../../models/patient/Anamnesis";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service/user.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {Zaposleni} from "../../../models/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-workspace-one-patient',
  templateUrl: './doctor-workspace-one-patient.component.html',
  styleUrls: ['./doctor-workspace-one-patient.component.css']
})
export class DoctorWorkspaceOnePatientComponent implements OnInit {

  addReport:  FormGroup;
  //treba da se uzme selektovani pacijent
  patient: Patient = new Patient();
  anamnesis: Anamnesis = new Anamnesis();
  //polja za anamnezu
  // mainProblems: string = '';
  // currDisease: string = '';
  // personalAnamnesis: string = '';
  // familyAnamnesis: string = '';
  // patientOpinion: string = '';
  //polja
  // objectiveFinding: string = '';
  // selectedCode: string = '';
  // uToku: string = '';
  // existingDiagnosis: boolean = false;
  // suggestedTherapies: string = '';
  // advice: string = '';

  isPopupVisible = false;

  constructor(private patientService: PatientService, private formBuilder: FormBuilder, private router: Router) {
    this.addReport = this.formBuilder.group({
      mainProblems: ['', [Validators.required]],
      currDisease: ['', [Validators.required]],
      personalAnamnesis: ['', [Validators.required]],
      familyAnamnesis: ['', [Validators.required]],
      patientOpinion: ['', [Validators.required]],
      objectiveFinding: ['', [Validators.required]],
      selectedCode: ['', [Validators.required]],
      uToku: ['', [Validators.required]],
      existingDiagnosis: ['', [Validators.required]],
      suggestedTherapies: ['', [Validators.required]],
      advice: ['', [Validators.required]]
    });
  }

  showPopup(event: any) {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }


  confirmSacuvaj() {
    //treba sacuvati izvestaj
    const report = this.addReport.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if(form.checkValidity() === false){
      return;
    }
    form.classList.add('was-validated');
    //vidi koja je to metoda u servisu
  }

  ngOnInit(): void {
    // this.lbz = <string>this.route.snapshot.paramMap.get('lbz');
    // this.getUser(this.lbz);
  }

  goToMedicalRecord() {
    //this.userService.setZaposleni(zaposleni)
    //promeni rutu kad je dodaju
    this.router.navigate(['/admin-add-employee/']);
  }


  //  showDropdown() {
  //   document.getElementById('welcomeDiv').style.display = "block";
  // }


}
