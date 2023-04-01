import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../models/patient/Patient";
import {Anamnesis, AnamnesisDto} from "../../../models/patient/Anamnesis";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service/user.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {Zaposleni} from "../../../models/models";
import {ActivatedRoute, Router} from "@angular/router";
import {DiagnosisCode, DiagnosisCodeDto} from "../../../models/patient/DiagnosisCode";

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

    constructor(private patientService: PatientService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
        //treba sacuvati izvestaj
        const examinationHistoryCreteDto = this.addReport.value
        this.anamneza.currDisease = examinationHistoryCreteDto.currDisease;
        this.anamneza.patientOpinion = examinationHistoryCreteDto.patientOpinion;
        this.anamneza.familyAnamnesis = examinationHistoryCreteDto.familyAnamnesis;
        this.anamneza.personalAnamnesis = examinationHistoryCreteDto.personalAnamnesis;
        this.anamneza.currDisease = examinationHistoryCreteDto.currDisease;
        this.patientService.createExaminationHistory(this.lbp, new Date(),'lbz', examinationHistoryCreteDto.confidential,examinationHistoryCreteDto.objectiveFinding,
        examinationHistoryCreteDto.advice, examinationHistoryCreteDto.therapy, new DiagnosisCodeDto(), this.anamneza);
    }

    //postavljanje dijagnoze - MedicalHistoryCreateDto
    saveDiagnosis(): void {
        if(!this.validateFields){
            return;
        }

        const diagnosis = this.addReport.value;
        this.patientService.createDiagnosis( this.lbp, diagnosis.confidential, 
            diagnosis.treatmentResult, diagnosis.currStateDesc, new DiagnosisCodeDto(), diagnosis.exists);
    }

    //predlaganje terapije - ExaminationHistoryCreateDto
    saveTherapy(): void {
        if(!this.validateFields){
            return;
        }

        const therapy = this.addReport.value;
        this.anamneza.currDisease = therapy.currDisease;
        this.anamneza.patientOpinion = therapy.patientOpinion;
        this.anamneza.familyAnamnesis = therapy.familyAnamnesis;
        this.anamneza.personalAnamnesis = therapy.personalAnamnesis;
        this.anamneza.currDisease = therapy.currDisease;

        this.diagnosisCode.code = 'code';
        this.diagnosisCode.description = 'description';
        this.diagnosisCode.latinDescription = 'latin description';

        console.log(this.anamneza.currDisease);
        console.log(this.anamneza.patientOpinion);
        console.log(this.anamneza.familyAnamnesis);
        console.log(this.anamneza.personalAnamnesis);
        console.log(this.anamneza.currDisease);

        console.log(therapy.objectiveFinding);
        console.log(therapy.advice);
        console.log(therapy.therapy);

        this.patientService.createExaminationHistory(this.lbp, new Date(), 'lbz', false, therapy.objectiveFinding, therapy.advice, therapy.therapy, this.diagnosisCode, this.anamneza);
        console.log("proslo")
    }


    goToMedicalRecord(): void {
        this.router.navigate(['']);
    }

    //  showDropdown() {
    //   document.getElementById('welcomeDiv').style.display = "block";
    // }

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

    provera(): void {
        console.log("!!!!!!!!!!");
    }

    provera1(): void {
        console.log("111111111111111");
    }
}
