import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminPromeniZaposlenog, DeparmentShort} from "../../../models/models";
import {UserService} from "../../../services/user-service/user.service";
// import {PatientUpdate} from "../../../models/patient/PatientUpdate";
import {PatientService} from "../../../services/patient-service/patient.service";
import {Timestamp} from "rxjs";
import * as uuid from 'uuid';
import {CountryCode} from "../../../models/patient-enums/CountryCode";
import {FamilyStatus} from "../../../models/patient-enums/FamilyStatus";
import {MaritalStatus} from "../../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../../models/patient-enums/ExpertiseDegree";


@Component({
  selector: 'app-nurse-add-patient',
  templateUrl: './nurse-add-patient.component.html',
  styleUrls: ['./nurse-add-patient.component.css']
})
export class NurseAddPatientComponent implements OnInit{
  countryCodes = Object.values(CountryCode).filter(value => typeof value === 'string');
  familyStatus = Object.values(FamilyStatus).filter(value => typeof value === 'string');
  maritalStatus = Object.values(MaritalStatus).filter(value => typeof value === 'string');
  expertiseDegree =  Object.values(ExpertiseDegree).filter(value => typeof value === 'string');
  addGroup: FormGroup;
  errorMessage: string = ''
  successMessage: string = ''

  constructor(private patientService: PatientService, private formBuilder: FormBuilder) {

    this.addGroup = this.formBuilder.group({
      jmbg: ['', [Validators.required]],
      name: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      dateAndTimeOfDeath: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      //fali adresa
      placeOfLiving:  ['', [Validators.required]],
      // citizenship: ['', [Validators.required]],
      selectedCountry: [CountryCode.SRB, [Validators.required]],
      phone:  ['', [Validators.required]],
      email: ['', [Validators.required]],
      guardianJmbg: ['', [Validators.required]],
      guardianNameAndSurname:  ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      numOfChildren:  ['', [Validators.required]],
      expertiseDegree: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      familyStatus: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {

  }

  addPatient(){
    console.log("usao u addPatient iz ts")
    const patient = this.addGroup.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    form.classList.add('was-validated');
    if(form.checkValidity() === false){
      return;
    }

    form.classList.add('was-validated');

    let gender = patient.gender
    let genderValue =  gender ? 'ZENSKO' : 'MUSKO'

    console.log("patient name: " + patient.name)
    console.log("patient surname:" + patient.surname)
    console.log("patient jmbg: " + patient.jmbg)
    console.log("patient lbp" + patient.lbp)
    console.log("patient parentName" + patient.parentName)
    console.log("patient gender" + genderValue)
    console.log("patient birth place" + patient.birthPlace)
    console.log("patient place of living" + patient.placeOfLiving)
    //console.log("patient citizenship" + patient.citizenship)
    console.log("patient selected country "+ patient.selectedCountry)
    console.log("patient phone "+patient.phone)
    console.log("patient email "+ patient.email)
    console.log("patient guardianJmbg " + patient.guardianJmbg)
    console.log("patient guardian name and surname " + patient.guardianNameAndSurname)
    console.log("patient marital status "+ patient.maritalStatus)
    console.log("patient num of children " + patient.numOfChildren)
    console.log("patient expertise degree " + patient.expertiseDegree)
    console.log("patient profession " + patient.profession)
    console.log("patient family status " + patient.familyStatus)

    console.log("patient date of birth" + patient.dateOfBirth)
    console.log("patient date and time of death" + patient.dateAndTimeOfDeath)

    this.patientService.registerPatient(patient.jmbg, patient.name,patient.parentName, patient.surname, genderValue, patient.dateOfBirth, patient.dateAndTimeOfDeath,
      patient.birthPlace, patient.placeOfLiving, patient.selectedCountry, patient.phone, patient.email, patient.guardianJmbg, patient.guardianNameAndSurname, patient.maritalStatus, patient.numOfChildren, patient.expertiseDegree, patient.profession, patient.familyStatus,new Date() ).subscribe((response) => {

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

