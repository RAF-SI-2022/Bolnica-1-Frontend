import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service/user.service";
import {ActivatedRoute} from "@angular/router";
import {AdminPromeniZaposlenog, UlogeZaposlenog} from "../../../models/models";
import {PatientService} from "../../../services/patient-service/patient.service";
import {PatientUpdateClass} from "../../../models/patient/PatientUpdate";

@Component({
  selector: 'app-nurse-edit-patient',
  templateUrl: './nurse-edit-patient.component.html',
  styleUrls: ['./nurse-edit-patient.component.css']
})
export class NurseEditPatientComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  patientUpdate: PatientUpdateClass;
  editGroup: FormGroup;
  deleted: Boolean = false

  lbp: string = "d63b6394-5eb0-4229-9caf-212daa4dec44"

  ngOnInit(): void {
    // this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
    //stavi za pacijent
    this.getPatient(this.lbp);
    console.log(this.lbp)
    //da li ovo treba
    // this.getUserPermissions(this.lbz);
  }

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private route: ActivatedRoute) {
    this.editGroup = this.formBuilder.group({
      jmbg: ['', [Validators.required]],
      name: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      surname: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      dateAndTimeOfDeath: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      placeOfLiving: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      guardianJmbg: ['', [Validators.required]],
      guardianNameAndSurname: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      numOfChildren: ['', [Validators.required]],
      expertiseDegree: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      familyStatus: ['', [Validators.required]],
    })
    this.patientUpdate = new PatientUpdateClass();
  }

  getPatient(LBP: string): void {
    console.log("usao u getPatient u ts")
    this.patientService.getPatientByLbp(LBP).subscribe(result => {
      this.patientUpdate = result;
    }, err => {
      console.log()
      console.log(this.patientUpdate.name)
      if (err.status == 302) { // found!
        this.patientUpdate = err.error; // citanje poruka je sa err.errors TO JE BODY-PORUKA
        this.editGroup.get('gender')?.setValue(this.patientUpdate.gender.toLowerCase() === 'female');
        console.log("sss " +  this.editGroup.get('gender')?.value);
      }
    })
  }

  editPatient() {
    console.log("usao u edit patient u ts")
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
    }

    // console.log(this.editGroup.get('deleted')?.value )
    this.patientService.updatePatient(this.lbp, this.editGroup.get('jmbg')?.value, this.editGroup.get('name')?.value,
      this.editGroup.get('parentName')?.value, this.editGroup.get('surname')?.value, this.editGroup.get('gender')?.value,
      this.editGroup.get('dateOfBirth')?.value,
      this.editGroup.get('dateAndTimeOfDeath')?.value, this.editGroup.get('birthPlace')?.value, this.editGroup.get('placeOfLiving')?.value,
      this.editGroup.get('citizenship')?.value, this.editGroup.get('phone')?.value, this.editGroup.get('email')?.value , this.editGroup.get('guardianJmbg')?.value,
      this.editGroup.get('guardianNameAndSurname')?.value, this.editGroup.get('maritalStatus')?.value, this.editGroup.get('numOfChildren')?.value,
      this.editGroup.get('expertiseDegree')?.value, this.editGroup.get('profession')?.value,
      this.editGroup.get('familyStatus')?.value, this.editGroup.get('deleted')?.value).subscribe((response) => {
      this.showSuccessMessage()
      console.log(response)
    }, error => {
      this.errorMessage = '';
    })
  }

  showSuccessMessage() {
    this.errorMessage = '';
    this.successMessage = 'Uspesno sacuvan pacijent!'
    setTimeout(() => {
      this.successMessage = ''
    }, 3000);
  }

  showErrorMessage() {
    this.errorMessage = 'Greska';
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000);
  }


}
