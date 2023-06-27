import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CovidExamDto} from "../../../../models/covid/CovidExamDto";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {AuthService} from "../../../../services/auth.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {Page} from "../../../../models/models";
import {DoctorDepartmentDto} from "../../../../models/DoctorDepartmentDto";
import {ExaminationService} from "../../../../services/examination-service/examination.service";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import {CovidExaminationType} from "../../../../models/covid-enums/CovidExaminationType";
import { Patient } from 'src/app/models/patient/Patient';
import { PatientService } from 'src/app/services/patient-service/patient.service';

@Component({
  selector: 'app-nurse-covid-ambulance',
  templateUrl: './nurse-covid-ambulance.component.html',
  styleUrls: ['./nurse-covid-ambulance.component.css']
})
export class NurseCovidAmbulanceComponent  implements OnInit {

  form: FormGroup;

  page: number = 0
  size: number = 99999999 //infinity
  total: number = 0
  covidExamsPage: Page<CovidExamDto> = new Page<CovidExamDto>()
  covidExams: CovidExamDto[] = []
  initialFormValues: any;


  nurseDepartmentPbo: string = '';
  doctors: DoctorDepartmentDto[] = [];

  patients: Patient[] = []
  lbp = '';

  covidExaminationTypes = Object.values(CovidExaminationType).filter(value => typeof value === 'string');

  constructor(private router: Router,
        private patientService: PatientService,
              private formBuilder: FormBuilder,
              private covidService: CovidServiceService,
              private authService: AuthService,
              private snackBar: SnackbarServiceService,
              private examinationService: ExaminationService) {

    this.form = this.formBuilder.group({
      textLBP: ['', [Validators.required]],
      examType: ['', [Validators.required]],
      doctorLbz: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.nurseDepartmentPbo = this.authService.getPBO();
    this.initialFormValues = this.form.getRawValue();

    this.getCovidExams();
    this.getDoctors();
    this.populatePatients();
  }

  populatePatients() {
    this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
    this.patients = res.content;
    console.log("IMA NAS " + res.content.length)
    }, err => {
    console.log("GRESKA " + err.message)
    })
}

selectSuggestion(patient: Patient){
    this.lbp = `${patient.lbp} : ${patient.name} (${patient.surname})`;
    this.filteredPatients = [];
}

  getDoctors(): void {
    this.examinationService.getDoctorsByDepartment(this.nurseDepartmentPbo).subscribe(res => {
      this.doctors = res
    })
  }

  filteredPatients: Patient[] = [];
    filterPatientLbp(searchText: string){
      if (this.patients && this.patients.length > 0 && searchText.length > 0) {
        this.filteredPatients = this.patients.filter(
          (patientt) =>
            (patientt.lbp?.toString().toLowerCase().includes(searchText.toLowerCase()) || '') ||
            (patientt.name?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
            (patientt.surname?.toLowerCase().includes(searchText.toLowerCase()) || '')
        );
      } else {
        this.filteredPatients = [];
      }
      console.log("Imam nas " + this.filteredPatients.length)
    }

  getCovidExams(): void {
    this.covidService.getCovidExaminationForNurse(this.page, this.size).subscribe(
      res => {
        this.covidExamsPage = res
        this.covidExams = this.covidExamsPage.content

        this.total = this.covidExamsPage.totalElements
        if (this.covidExams.length == 0) {
          this.snackBar.openWarningSnackBar("Nema pregleda!")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska!")
      }
    )
  }

  addExamination(): void {

    if (this.form.invalid) {
      this.snackBar.openWarningSnackBar("Popunite sva polja!");
      return;
    }

    const sendData = this.form.value;

    let tmpLbp = sendData.textLBP.split(":")[0].trim();

    this.examinationService.createExamination(new Date(), sendData.doctorLbz, tmpLbp, "covid").subscribe(
        res => {
            //         this.getCovidExams();
                    this.snackBar.openSuccessSnackBar("Uspesno sacuvano!");
                    this.form.reset();
                    // Update form controls with initial values
                    Object.keys(this.form.controls).forEach((controlName) => {
                      const control = this.form.get(controlName);
                      const initialValue = this.initialFormValues[controlName];
                      // @ts-ignore
                      control.setValue(initialValue);
                      // @ts-ignore
                      control.markAsPristine();
                      // @ts-ignore
                      control.markAsUntouched(); // Dodajte ovu liniju
                      // @ts-ignore
                      control.updateValueAndValidity();
            
                    });
            
                  }, err => {
                    this.snackBar.openErrorSnackBar("Greska!")
                  }
    );
    
//     this.covidService.createCovidExam(new Date(), PatientArrival.CEKA, sendData.examType,
//       sendData.doctorLbz, tmpLbp).subscribe(
//       res => {
// //         this.getCovidExams();
//         this.snackBar.openSuccessSnackBar("Uspesno sacuvano!");
//         this.form.reset();
//         // Update form controls with initial values
//         Object.keys(this.form.controls).forEach((controlName) => {
//           const control = this.form.get(controlName);
//           const initialValue = this.initialFormValues[controlName];
//           // @ts-ignore
//           control.setValue(initialValue);
//           // @ts-ignore
//           control.markAsPristine();
//           // @ts-ignore
//           control.markAsUntouched(); // Dodajte ovu liniju
//           // @ts-ignore
//           control.updateValueAndValidity();

//         });

//       }, err => {
//         this.snackBar.openErrorSnackBar("Greska!")
//       }
//     )
  }

}
