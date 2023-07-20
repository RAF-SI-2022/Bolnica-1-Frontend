import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Patient} from "../../../../models/patient/Patient";
import {Anamnesis, AnamnesisDto} from "../../../../models/patient/Anamnesis";
import {DiagnosisCodeDto} from "../../../../models/patient/DiagnosisCode";
import {GeneralMedicalData} from "../../../../models/patient/GeneralMedicalData";
import {Vaccination} from "../../../../models/patient/Vaccination";
import {Allergy} from "../../../../models/patient/Allergy";
import {AuthService} from "../../../../services/auth.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {UserService} from "../../../../services/user-service/user.service";
import {PatientService} from "../../../../services/patient-service/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";
import {ExaminationService} from "../../../../services/examination-service/examination.service";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import {ScheduledVaccinationDto} from "../../../../models/vaccination/ScheduledVaccinationDto";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-nurse-vaccination-admission',
  templateUrl: './nurse-vaccination-admission.component.html',
  styleUrls: ['./nurse-vaccination-admission.component.css']
})
export class NurseVaccinationAdmissionComponent implements OnInit{

  show: boolean = false;

  currentVaccineAdmission: ScheduledVaccinationDto;

  idScheduledVaccination : number = 0;


  //treba da se uzme selektovani pacijent
  patient: Patient = new Patient();

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

  vaccinationName: string = '';

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
              private changeDetectorRef: ChangeDetectorRef,) {
    this.generalMedical = {
      id: 0,
      bloodType: '',
      rh: '',
      vaccinationDtos: [],
      allergyDtos: []
    };

    this.currentVaccineAdmission = history.state.vaccine;

  }

  ngOnInit(): void {
    let id = <string>this.route.snapshot.paramMap.get('lbp');
    this.idScheduledVaccination = parseInt(id)

    this.vaccinationName = this.currentVaccineAdmission.vaccination.name

    this.lbz = this.authService.getLBZ();
    this.lbp = this.currentVaccineAdmission.patient.lbp

    this.patientName = this.currentVaccineAdmission.patient.name
    this.patientSurname = this.currentVaccineAdmission.patient.surname
    this.patientdateOfBirth = this.currentVaccineAdmission.patient.dateOfBirth

    if(this.currentVaccineAdmission.arrivalStatus.toString() == PatientArrival.ZAVRSENO){
      this.zavrseno = true;
    }
    //nterval(5000).subscribe(() => {
    this.updateData();
//    });
  }

  updateData(){
    this.getGeneralMedicalData(this.lbp);

  }

  gotoone(): void {
    const url = `/nurse-daily-vaccination`;
    this.router.navigateByUrl(url);
  }

  // moze i this.idScheduledVaccination

  finishVaccination(): void {
    this.patientService.addVacine(
      this.lbp, this.currentVaccineAdmission.vaccination.name, new Date()
    ).pipe(
      switchMap(() => {
        return this.patientService.updateScheduledVaccination(
          this.currentVaccineAdmission.id, PatientArrival.ZAVRSENO
        );
      })
    ).subscribe(
      res => {
        console.log("lbp: " + this.lbp + "; vaccination:" + this.currentVaccineAdmission.vaccination.name);

        this.updateData();
        this.zavrseno = true;
        this.snackBar.openSuccessSnackBar("Uspesno sacuvano!");
      },
      err => {
        this.snackBar.openErrorSnackBar("Nije sacuvano!");
      }
    );
  }


  getGeneralMedicalData(lbp: string): void {
    this.patientService.getGeneralMedicalDataByLbp(this.lbp).subscribe(result => {

      if (!result) {
        this.generalMedical.vaccinationDtos = []
        this.generalMedical.allergyDtos = []

      } else {
        this.generalMedical = result
        this.vaccinationsList = result.vaccinationDtos
        this.allergiesList = result.allergyDtos
        console.log("alergije: "+ this.allergiesList)
        console.log("vakcine: "+ this.vaccinationsList)

      }

      this.changeDetectorRef.detectChanges();

    })
  }



}
