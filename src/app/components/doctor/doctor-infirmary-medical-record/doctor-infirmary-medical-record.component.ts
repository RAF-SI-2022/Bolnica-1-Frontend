import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../../models/patient/Patient";
import {Anamnesis, AnamnesisDto} from "../../../models/patient/Anamnesis";
import {DiagnosisCodeDto} from "../../../models/patient/DiagnosisCode";
import {ExamForPatient} from "../../../models/patient/ExamForPatient";
import {GeneralMedicalData} from "../../../models/patient/GeneralMedicalData";
import {Vaccination} from "../../../models/patient/Vaccination";
import {Allergy} from "../../../models/patient/Allergy";
import {AuthService} from "../../../services/auth.service";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {UserService} from "../../../services/user-service/user.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {ExaminationService} from "../../../services/examination-service/examination.service";
import {PatientArrival} from "../../../models/laboratory-enums/PatientArrival";
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";

@Component({
  selector: 'app-doctor-infirmary-medical-record',
  templateUrl: './doctor-infirmary-medical-record.component.html',
  styleUrls: ['./doctor-infirmary-medical-record.component.css']
})
export class DoctorInfirmaryMedicalRecordComponent implements OnInit {

  currentHospitalization : HospitalizationDto;

  show: boolean = false;

  addReport: FormGroup;
  //treba da se uzme selektovani pacijent
  patient: Patient = new Patient();
  anamneza: Anamnesis = new AnamnesisDto();
  diagnosisCode: DiagnosisCodeDto = new DiagnosisCodeDto();
  lbz: string = '';
  lbp: string = '';
  doctorSpecPov = false;
  // currentPatient: ExamForPatient;
  patientName: string = 'Ime'
  patientSurname: string = 'Prezime'
  patientdateOfBirth: Date = new Date();
  generalMedical: GeneralMedicalData;
  vaccinationsList: Vaccination[] = [];
  allergiesList: Allergy[] = [];
  // currentExamForPatient: ExamForPatient;

  zavrseno: boolean = false;


  isPopupVisible = false;
  errorMessage: string = "";

  constructor(private authService: AuthService,
              private snackBar: SnackbarServiceService,
              private userService: UserService,
              private patientService: PatientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              private examinationService:ExaminationService,
              private infirmaryService:InfirmaryService) {

    this.generalMedical = {
      id: 0,
      bloodType: '',
      rh: '',
      vaccinationDtos: [],
      allergyDtos: []
    };

    // this.currentExamForPatient = history.state.examForPatient;

    this.currentHospitalization = history.state.hospitalization;

    this.checkDoctorSpecPov();
    this.addReport = this.formBuilder.group({
      mainProblems: ['', [Validators.required]],
      currDisease: ['', [Validators.required]],
      personalAnamnesis: ['', [Validators.required]],
      familyAnamnesis: ['', [Validators.required]],
      patientOpinion: ['', [Validators.required]],
      objectiveFinding: ['', [Validators.required]],
      selectedCode: ['', [Validators.required]],
      treatmentResult: ['', [Validators.required]],
      currStateDesc: ['', [Validators.required]],
      exists: '',
      suggestedTherapies: ['', [Validators.required]],
      advice: ['', [Validators.required]],
      confidential: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.lbz = this.authService.getLBZ();

    this.patientName = this.currentHospitalization.name
    this.patientSurname = this.currentHospitalization.surname
    this.patientdateOfBirth = this.currentHospitalization.dateOfBirth
    //nterval(5000).subscribe(() => {
    this.updateData();
//    });
  }

  updateData(){
    // this.getGeneralMedicalData(this.lbp);
    this.restoreFormData();
  }
  showPopup(event: any): void {
    console.log("IDE OP")
    this.isPopupVisible = true;
  }

  hidePopup(): void {
    this.isPopupVisible = false;
  }

  gotoone(): void {
    const url = `/doctor-infirmary-workspace/${this.lbp}`;
    this.router.navigateByUrl(url);
  }

  //cuvanje izvestaja
  // confirmSacuvaj(): void {
  //   if (!this.validateFields) {
  //     return;
  //   }
  //   const examinationHistoryCreteDto = this.addReport.value
  //   this.anamneza.currDisease = examinationHistoryCreteDto.currDisease;
  //   this.anamneza.patientOpinion = examinationHistoryCreteDto.patientOpinion;
  //   this.anamneza.familyAnamnesis = examinationHistoryCreteDto.familyAnamnesis;
  //   this.anamneza.personalAnamnesis = examinationHistoryCreteDto.personalAnamnesis;
  //   this.anamneza.currDisease = examinationHistoryCreteDto.currDisease;
  //
  //   this.infirmaryService.createExaminationHistory(this.lbp, new Date(), this.lbz,
  //     examinationHistoryCreteDto.confidential, examinationHistoryCreteDto.objectiveFinding,
  //     examinationHistoryCreteDto.advice, examinationHistoryCreteDto.therapy, this.diagnosisCode, this.anamneza).subscribe(result => {
  //       this.zavrseno = true;
  //       this.snackBar.openSuccessSnackBar("Uspesno sacuvano!")
  //     },err => {
  //       this,this.snackBar.openErrorSnackBar("Nije sacuvano!")
  //   })
  // }


  //postavljanje dijagnoze - MedicalHistoryCreateDto
  saveDiagnosis(): boolean {
    const diagnosis = this.addReport.value;
    console.log("DIJAGNOZA " + diagnosis.currStateDesc)
    if (!this.validateFields || diagnosis.currStateDesc.length == 0 || diagnosis.treatmentResult == null
      || diagnosis.treatmentResult.length == 0 || diagnosis.selectedCode == null || diagnosis.selectedCode.length == 0) {
      this.snackBar.openErrorSnackBar("Popunite dijagnozu")
      return false;
    }

    this.diagnosisCode.code = diagnosis.selectedCode;

    if (this.diagnosisCode.code == 'A15.3') {
      this.diagnosisCode.description = 'Tuberkuloza pluća, potvrđena neoznačenim metodam';
      this.diagnosisCode.latinDescription = 'Tuberculosis pulmonum, methodis non specificatis confirmata'
    }
    if (this.diagnosisCode.code == 'D50') {
      this.diagnosisCode.description = 'Anemija uzrokovana nedostatkom gvožđa';
      this.diagnosisCode.latinDescription = 'Anaemia sideropenica'
    }
    if (this.diagnosisCode.code == 'I10') {
      this.diagnosisCode.description = 'Povišen krvni pritisak, nepoznatog porekla';
      this.diagnosisCode.latinDescription = 'Hypertensio arterialis essentialis (primaria)';
    }
    if (this.diagnosisCode.code == 'I35.0') {
      this.diagnosisCode.description = 'Suženje aortnog zaliska';
      this.diagnosisCode.latinDescription = 'Stenosis valvulae aortae non rheumatica';
    }
    if (this.diagnosisCode.code == 'J11') {
      this.diagnosisCode.description = 'Grip, virus nedokazan';
      this.diagnosisCode.latinDescription = 'Influenza, virus non identificatum';
    }
    if (this.diagnosisCode.code == 'J12.9') {
      this.diagnosisCode.description = 'Zapaljenje pluća uzrokovano virusom, neoznačeno';
      this.diagnosisCode.latinDescription = 'Pneumonia viralis, non specificata';
    }
    if (this.diagnosisCode.code == 'K35') {
      this.diagnosisCode.description = 'Akutno zapaljenje slepog creva';
      this.diagnosisCode.latinDescription = 'Appendicitis acuta';
    }
    if (this.diagnosisCode.code == 'K70.3') {
      this.diagnosisCode.description = 'Ciroza jetre uzrokovana alkoholom';
      this.diagnosisCode.latinDescription = 'Cirrhosis hepatis alcoholica';
    }
    if (this.diagnosisCode.code == 'K71.0') {
      this.diagnosisCode.description = 'Toksička bolest jetre zbog zastoja žuči';
      this.diagnosisCode.latinDescription = 'Morbus hepatis toxicus cholestaticus';
    }

    this.patientService.createDiagnosis(this.lbp, diagnosis.confidential,
      diagnosis.treatmentResult, diagnosis.currStateDesc, this.diagnosisCode, diagnosis.exists).subscribe((response) => {
      this.snackBar.openSuccessSnackBar("Uspesno sacuvano!")
    }, error => {
      console.log("Error " + error.status);
      if (error.status == 409) {
        // this.errorMessage = 'greska';
        this.snackBar.openErrorSnackBar("Nije sacuvano!")
      }
    });
    return true;

  }
  addReportt() {
    if(!this.saveDiagnosis())
      return;
    this.saveTherapy();
    this.disableFields();
  }

  //predlaganje terapije - ExaminationHistoryCreateDto
  saveTherapy(): void {
    const therapy = this.addReport.value;

    if (!this.validateFields) {
      return;
    }

    this.diagnosisCode.code = therapy.selectedCode;

    if (this.diagnosisCode.code == 'A15.3') {
      this.diagnosisCode.description = 'Tuberkuloza pluća, potvrđena neoznačenim metodam';
      this.diagnosisCode.latinDescription = 'Tuberculosis pulmonum, methodis non specificatis confirmata'
    }
    if (this.diagnosisCode.code == 'D50') {
      this.diagnosisCode.description = 'Anemija uzrokovana nedostatkom gvožđa';
      this.diagnosisCode.latinDescription = 'Anaemia sideropenica'
    }
    if (this.diagnosisCode.code == 'I10') {
      this.diagnosisCode.description = 'Povišen krvni pritisak, nepoznatog porekla';
      this.diagnosisCode.latinDescription = 'Hypertensio arterialis essentialis (primaria)';
    }
    if (this.diagnosisCode.code == 'I35.0') {
      this.diagnosisCode.description = 'Suženje aortnog zaliska';
      this.diagnosisCode.latinDescription = 'Stenosis valvulae aortae non rheumatica';
    }
    if (this.diagnosisCode.code == 'J11') {
      this.diagnosisCode.description = 'Grip, virus nedokazan';
      this.diagnosisCode.latinDescription = 'Influenza, virus non identificatum';
    }
    if (this.diagnosisCode.code == 'J12.9') {
      this.diagnosisCode.description = 'Zapaljenje pluća uzrokovano virusom, neoznačeno';
      this.diagnosisCode.latinDescription = 'Pneumonia viralis, non specificata';
    }
    if (this.diagnosisCode.code == 'K35') {
      this.diagnosisCode.description = 'Akutno zapaljenje slepog creva';
      this.diagnosisCode.latinDescription = 'Appendicitis acuta';
    }
    if (this.diagnosisCode.code == 'K70.3') {
      this.diagnosisCode.description = 'Ciroza jetre uzrokovana alkoholom';
      this.diagnosisCode.latinDescription = 'Cirrhosis hepatis alcoholica';
    }
    if (this.diagnosisCode.code == 'K71.0') {
      this.diagnosisCode.description = 'Toksička bolest jetre zbog zastoja žuči';
      this.diagnosisCode.latinDescription = 'Morbus hepatis toxicus cholestaticus';
    }

    this.anamneza.currDisease = therapy.currDisease;
    this.anamneza.patientOpinion = therapy.patientOpinion;
    this.anamneza.familyAnamnesis = therapy.familyAnamnesis;
    this.anamneza.personalAnamnesis = therapy.personalAnamnesis;
    this.anamneza.currDisease = therapy.currDisease;


    this.infirmaryService.createExaminationHistory(this.lbp, new Date(), this.lbz, therapy.confidential, therapy.objectiveFinding, therapy.advice, therapy.suggestedTherapies, this.diagnosisCode, this.anamneza).subscribe((response) => {

      // console.log("id workspace one " + this.currentPatient.id)
      //
      // this.examinationService.updatePatientStatus(this.currentPatient.id, PatientArrival.ZAVRSENO).subscribe(res=>{
      //   this.zavrseno = true;
      //   console.log("zavrseno " + this.zavrseno)
      // })

      console.log("infirmary")

      this,this.snackBar.openSuccessSnackBar("Uspesno sacuvano!")
    }, error => {
      console.log("Error " + error.status);
      if (error.status == 409) {
        // this.errorMessage = 'greska';
        this.snackBar.openErrorSnackBar("Nije sacuvano!")
      }
    });

    console.log("proslo")
  }


  showElements(): void {
    this.show = true;
  }

  validateFields(): boolean {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      return false;
    }
    return true;
  }

  checkDoctorSpecPov(): boolean {
    this.userService.checkRole('ROLE_DR_SPEC_POV').subscribe(hasRole => {
      if (hasRole) {
        this.doctorSpecPov = true;
      }
      else this.doctorSpecPov = false;
    });
    return this.doctorSpecPov;
  }

  // getGeneralMedicalData(lbp: string): void {
  //   this.patientService.getGeneralMedicalDataByLbp(this.lbp).subscribe(result => {
  //
  //     if (!result) {
  //       this.generalMedical.vaccinationDtos = []
  //       this.generalMedical.allergyDtos = []
  //
  //     } else {
  //       this.generalMedical = result
  //       this.vaccinationsList = result.vaccinationDtos
  //       this.allergiesList = result.allergyDtos
  //     }
  //   })
  // }


  saveFormData() {
    this.sharedService.formData = { ...this.addReport.value };
    this.sharedService.lbp = this.lbp;
  }

  restoreFormData() {
    if (this.sharedService.formData && this.sharedService.lbp == this.lbp) {
      this.addReport.patchValue(this.sharedService.formData);
    }
  }

  disableFields() {
    this.addReport.disable();
  }
}

