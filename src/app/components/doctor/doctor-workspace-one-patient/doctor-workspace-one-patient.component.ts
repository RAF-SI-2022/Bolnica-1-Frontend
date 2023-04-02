import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../models/patient/Patient";
import {Anamnesis, AnamnesisDto} from "../../../models/patient/Anamnesis";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../services/patient-service/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DiagnosisCodeDto} from "../../../models/patient/DiagnosisCode";
import {TreatmentResult} from "../../../models/patient-enums/TreatmentResult";
import {UserService} from "../../../services/user-service/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-doctor-workspace-one-patient',
  templateUrl: './doctor-workspace-one-patient.component.html',
  styleUrls: ['./doctor-workspace-one-patient.component.css']
})
export class DoctorWorkspaceOnePatientComponent implements OnInit {

    show: boolean = false;

    addReport:  FormGroup;
    //treba da se uzme selektovani pacijent
    patient: Patient = new Patient();
    anamneza: Anamnesis = new AnamnesisDto();
    diagnosisCode: DiagnosisCodeDto = new DiagnosisCodeDto();
    lbz: string = '';
    lbp: string = '';
    doctorSpecPov = false;

    isPopupVisible = false;

    constructor(private authService: AuthService, private userService:UserService, private patientService: PatientService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
    }

    showPopup(event: any): void {
        this.isPopupVisible = true;
    }

    hidePopup(): void {
        this.isPopupVisible = false;
    }

    //cuvanje izvestaja
    confirmSacuvaj(): void {
        if(!this.validateFields){
            return;
        }

        const examinationHistoryCreteDto = this.addReport.value
        this.anamneza.currDisease = examinationHistoryCreteDto.currDisease;
        this.anamneza.patientOpinion = examinationHistoryCreteDto.patientOpinion;
        this.anamneza.familyAnamnesis = examinationHistoryCreteDto.familyAnamnesis;
        this.anamneza.personalAnamnesis = examinationHistoryCreteDto.personalAnamnesis;
        this.anamneza.currDisease = examinationHistoryCreteDto.currDisease;
        this.patientService.createExaminationHistory(this.lbp, new Date(),this.lbz, examinationHistoryCreteDto.confidential,examinationHistoryCreteDto.objectiveFinding,
        examinationHistoryCreteDto.advice, examinationHistoryCreteDto.therapy, this.diagnosisCode, this.anamneza);
    }

    //postavljanje dijagnoze - MedicalHistoryCreateDto
    saveDiagnosis(): void {
      const diagnosis = this.addReport.value;

        if(!this.validateFields){
            return;
        }

        this.diagnosisCode.code = diagnosis.selectedCode;

        if(this.diagnosisCode.code == 'A15.3'){
          this.diagnosisCode.description = 'Tuberkuloza pluća, potvrđena neoznačenim metodam';
          this.diagnosisCode.latinDescription = 'Tuberculosis pulmonum, methodis non specificatis confirmata'
        }
        if(this.diagnosisCode.code == 'D50'){
          this.diagnosisCode.description = 'Anemija uzrokovana nedostatkom gvožđa';
          this.diagnosisCode.latinDescription = 'Anaemia sideropenica'
        }
        if(this.diagnosisCode.code == 'I10'){
          this.diagnosisCode.description = 'Povišen krvni pritisak, nepoznatog porekla';
          this.diagnosisCode.latinDescription = 'Hypertensio arterialis essentialis (primaria)';
        }
        if(this.diagnosisCode.code == 'I35.0'){
          this.diagnosisCode.description = 'Suženje aortnog zaliska';
          this.diagnosisCode.latinDescription = 'Stenosis valvulae aortae non rheumatica';
        }
        if(this.diagnosisCode.code == 'J11'){
          this.diagnosisCode.description = 'Grip, virus nedokazan';
          this.diagnosisCode.latinDescription = 'Influenza, virus non identificatum';
        }
        if(this.diagnosisCode.code == 'J12.9'){
          this.diagnosisCode.description = 'Zapaljenje pluća uzrokovano virusom, neoznačeno';
          this.diagnosisCode.latinDescription = 'Pneumonia viralis, non specificata';
        }
        if(this.diagnosisCode.code == 'K35'){
          this.diagnosisCode.description = 'Akutno zapaljenje slepog creva';
          this.diagnosisCode.latinDescription = 'Appendicitis acuta';
        }
        if(this.diagnosisCode.code == 'K70.3'){
          this.diagnosisCode.description = 'Ciroza jetre uzrokovana alkoholom';
          this.diagnosisCode.latinDescription = 'Cirrhosis hepatis alcoholica';
        }
        if(this.diagnosisCode.code == 'K71.0'){
          this.diagnosisCode.description = 'Toksička bolest jetre zbog zastoja žuči';
          this.diagnosisCode.latinDescription = 'Morbus hepatis toxicus cholestaticus';
        }

        this.patientService.createDiagnosis(this.lbp, diagnosis.confidential,
           diagnosis.treatmentResult, diagnosis.currStateDesc, this.diagnosisCode, diagnosis.exists);

    }

    //predlaganje terapije - ExaminationHistoryCreateDto
    saveTherapy(): void {
      const therapy = this.addReport.value;

        if(!this.validateFields){
            return;
        }

      this.diagnosisCode.code = therapy.selectedCode;

      if(this.diagnosisCode.code == 'A15.3'){
        this.diagnosisCode.description = 'Tuberkuloza pluća, potvrđena neoznačenim metodam';
        this.diagnosisCode.latinDescription = 'Tuberculosis pulmonum, methodis non specificatis confirmata'
      }
      if(this.diagnosisCode.code == 'D50'){
        this.diagnosisCode.description = 'Anemija uzrokovana nedostatkom gvožđa';
        this.diagnosisCode.latinDescription = 'Anaemia sideropenica'
      }
      if(this.diagnosisCode.code == 'I10'){
        this.diagnosisCode.description = 'Povišen krvni pritisak, nepoznatog porekla';
        this.diagnosisCode.latinDescription = 'Hypertensio arterialis essentialis (primaria)';
      }
      if(this.diagnosisCode.code == 'I35.0'){
        this.diagnosisCode.description = 'Suženje aortnog zaliska';
        this.diagnosisCode.latinDescription = 'Stenosis valvulae aortae non rheumatica';
      }
      if(this.diagnosisCode.code == 'J11'){
        this.diagnosisCode.description = 'Grip, virus nedokazan';
        this.diagnosisCode.latinDescription = 'Influenza, virus non identificatum';
      }
      if(this.diagnosisCode.code == 'J12.9'){
        this.diagnosisCode.description = 'Zapaljenje pluća uzrokovano virusom, neoznačeno';
        this.diagnosisCode.latinDescription = 'Pneumonia viralis, non specificata';
      }
      if(this.diagnosisCode.code == 'K35'){
        this.diagnosisCode.description = 'Akutno zapaljenje slepog creva';
        this.diagnosisCode.latinDescription = 'Appendicitis acuta';
      }
      if(this.diagnosisCode.code == 'K70.3'){
        this.diagnosisCode.description = 'Ciroza jetre uzrokovana alkoholom';
        this.diagnosisCode.latinDescription = 'Cirrhosis hepatis alcoholica';
      }
      if(this.diagnosisCode.code == 'K71.0'){
        this.diagnosisCode.description = 'Toksička bolest jetre zbog zastoja žuči';
        this.diagnosisCode.latinDescription = 'Morbus hepatis toxicus cholestaticus';
      }

        this.anamneza.currDisease = therapy.currDisease;
        this.anamneza.patientOpinion = therapy.patientOpinion;
        this.anamneza.familyAnamnesis = therapy.familyAnamnesis;
        this.anamneza.personalAnamnesis = therapy.personalAnamnesis;
        this.anamneza.currDisease = therapy.currDisease;


        this.patientService.createExaminationHistory(this.lbp, new Date(), this.lbz, therapy.confidential, therapy.objectiveFinding, therapy.advice, therapy.suggestedTherapies, this.diagnosisCode, this.anamneza);
        console.log("proslo")
    }


    goToMedicalRecord(): void {
        this.router.navigate(['']);
    }


    showElements(): void {
        this.show = true;
    }

    validateFields(): boolean {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        form.classList.add('was-validated');
        if(form.checkValidity() === false){
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



}
