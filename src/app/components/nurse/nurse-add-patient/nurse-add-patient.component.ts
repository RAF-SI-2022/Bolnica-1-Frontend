import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminPromeniZaposlenog, DeparmentShort} from "../../../models/models";
import {UserService} from "../../../services/user-service/user.service";
import {PatientUpdate} from "../../../models/patient/PatientUpdate";

@Component({
  selector: 'app-nurse-add-patient',
  templateUrl: './nurse-add-patient.component.html',
  styleUrls: ['./nurse-add-patient.component.css']
})
export class NurseAddPatientComponent implements OnInit{

  addGroup: FormGroup;
  permissions: string[] = [];



  departments: DeparmentShort[] = [];
  errorMessage: string = ''
  successMessage: string = ''



  emailErrorMessage: string = '';

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

    this.addGroup = this.formBuilder.group({
      jmbg: ['', [Validators.required]],
      lbp: ['', [Validators.required]],
      name: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      dateAndTimeOfDeath: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      //fali adresa
      placeOfLiving:  '',
      // citizenship: ['', [Validators.required]],
      phone:  '',
      email:  '',
      guardianJmbg:  '',
      guardianNameAndSurname:  '',
      // maritalStatus: ['', [Validators.required]],
      numOfChildren:  '',
      // expertiseDegree: ['', [Validators.required]],
      profession:  ''
      // familyStatus: ['', [Validators.required]],

    });

  }


  ngOnInit(): void {

  }


  addPatient(){

    //da li treba patient ili patientCreate
    const patient = this.addGroup.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if(form.checkValidity() === false){
      return;
    }

    form.classList.add('was-validated');


    let gender = patient.gender
    let genderValue =  gender ? 'female' : 'male'
    this.userService.addEmployee(patient.name, patient.surname, patient.parentName, genderValue, patient.jmbg, patient.dateOfBirth, patient.birthPlace,
      patient.placeOfLiving, patient.phone, patient.email, patient.guardianJmbg, patient.guardianNameAndSurname, patient.numOfChildren).subscribe((response) => {

      this.errorMessage = '';
      this.successMessage = 'Uspesno dodat pacijent!'
    }, error => {
      console.log("Error " + error.status);
      if(error.status == 409){
        this.errorMessage = 'greska';
      }
    })

  }

}

