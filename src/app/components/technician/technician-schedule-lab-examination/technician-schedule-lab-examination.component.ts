import { Component, OnInit } from '@angular/core';
import { ScheduledLabExamination } from "../../../models/laboratory/ScheduledLabExamination";
import { PatientService } from "../../../services/patient-service/patient.service";
import { Page } from "../../../models/models";
import { Patient } from "../../../models/patient/Patient";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Prescription } from "../../../models/laboratory/Prescription";
import { LaboratoryService } from "../../../services/laboratory-service/laboratory.service";
import { ExaminationStatus } from "../../../models/laboratory-enums/ExaminationStatus";
import { NgSelectModule } from '@ng-select/ng-select';
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-technician-schedule-lab-examination',
  templateUrl: './technician-schedule-lab-examination.component.html',
  styleUrls: ['./technician-schedule-lab-examination.component.css']
})
export class TechnicianScheduleLabExaminationComponent implements OnInit {

  // Pagination properites
  page = 0
  pageSize = 6
  totalSchedule = 0
  totalView = 0

  pageS = 0;
  pageSizeS = 5;
  totalScheduleS = 0;
  totalViewS = 0;

  patientPage: Page<Patient> = new Page<Patient>()
  rawLabaratoryPage: Page<Prescription> = new Page<Prescription>()
  scheduledLabExaminationPage: Page<ScheduledLabExamination> = new Page<ScheduledLabExamination>()

  patientList: Patient[] = []
  public selectedPatient: string = '';
  searchForm: FormGroup
  searchVisitForm: FormGroup
  countForm: FormGroup
  noteForm: FormGroup
  rawLabararatoryPrescriptions: Prescription[] = []
  scheduledLabExaminations: ScheduledLabExamination[] = []
  public numberOfScheduled: number = 0
  lbp: string = ''
  date: Date = new Date()
  dateSearch = new Date()
  note: string = ''
  errorMessage: string = ''
  successMessage: string = ''
  prescriptionPage: Page<Prescription> = new Page<Prescription>()
  prescriptionList: Prescription[] = []
  initialFormValuesSearch: any;
  initialFormValuesCount: any;
  initialFormValuesSNote: any;
  initialFormValuesSearchVisit: any;




  constructor(private formBuilder: FormBuilder,
              private labaratoryService: LaboratoryService,
              private snackBar: SnackbarServiceService,
              private patientService: PatientService) {
    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });

    this.countForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      numberOfScheduled: ['', [Validators.required]],
    });

    this.noteForm = this.formBuilder.group({
      note: ''
    });

    const now = new Date()

    this.searchVisitForm = this.formBuilder.group({
      name: '',
      date: now.toISOString().slice(0,10)
    });
  }


  ngOnInit(): void {
    //nterval(5000).subscribe(() => {
      this.updateData();
//    });
    // this.listScheduledEexaminations()
    this.initialFormValuesSearch = this.searchForm.getRawValue();
    this.initialFormValuesSNote = this.noteForm.getRawValue();
    this.initialFormValuesCount = this.countForm.getRawValue();
    this.initialFormValuesSearchVisit = this.searchVisitForm.getRawValue();


  }

  updateData(){
    this.getPatientList()
  }

  getPatientList() {

    this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
      this.patientList = res.content;
      console.log("IMA NAS " + res.content.length)
    }, err => {
      console.log("GRESKA " + err.message)
    })
  }

  countPatientByDay() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    this.labaratoryService.listScheduledExaminationsByDay(this.countForm.get('date')?.value).subscribe((response) => {
      this.numberOfScheduled = response
      this.snackBar.openWarningSnackBar("Izracunato")

      // this.countForm.reset();
      //
      // // Update form controls with initial values
      // Object.keys(this.countForm.controls).forEach((controlName) => {
      //   const control = this.countForm.get(controlName);
      //   const initialValue = this.initialFormValuesCount[controlName];
      //   // @ts-ignore
      //   control.setValue(initialValue);
      //   // @ts-ignore
      //   control.markAsPristine();
      //   // @ts-ignore
      //   control.markAsUntouched(); // Dodajte ovu liniju
      //   // @ts-ignore
      //   control.updateValueAndValidity();
      //
      // });
      //
      // this.countForm.get('gender')?.reset();
      //
      // form.classList.remove('was-validated');
    }, err => {
      this.snackBar.openErrorSnackBar("Greska!")
    })
  }

  examinationCreate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    this.lbp = this.searchForm.get('name')?.value
    this.date = this.countForm.get('date')?.value
    this.note = this.noteForm.get('note')?.value
    console.log("date " + this.date)
    if(!this.validateEntries() || this.lbp.length == 0 || !this.date || this.date.toString().length == 0){
      this.snackBar.openErrorSnackBar("Popunite sva polja")
      return;
    }
    this.labaratoryService.createScheduledExamination(this.lbp, this.date, this.note).subscribe((response) => {
      // this.errorMessage = '';
      // this.successMessage = 'Uspesno dodat pregled!'
      this.snackBar.openSuccessSnackBar("Uspesno dodat pregled")
      this.searchForm.reset();
      this.countForm.reset();
      this.noteForm.reset();
      Object.keys(this.searchForm.controls).forEach((controlName) => {
        const control = this.searchForm.get(controlName);
        const initialValue = this.initialFormValuesSearch[controlName];
        // @ts-ignore
        control.setValue(initialValue);
        // @ts-ignore
        control.markAsPristine();
        // @ts-ignore
        control.markAsUntouched(); // Dodajte ovu liniju
        // @ts-ignore
        control.updateValueAndValidity();

      });
      Object.keys(this.countForm.controls).forEach((controlName) => {
        const control = this.countForm.get(controlName);
        const initialValue = this.initialFormValuesCount[controlName];
        // @ts-ignore
        control.setValue(initialValue);
        // @ts-ignore
        control.markAsPristine();
        // @ts-ignore
        control.markAsUntouched(); // Dodajte ovu liniju
        // @ts-ignore
        control.updateValueAndValidity();

      });
      Object.keys(this.noteForm.controls).forEach((controlName) => {
        const control = this.noteForm.get(controlName);
        const initialValue = this.initialFormValuesSNote[controlName];
        // @ts-ignore
        control.setValue(initialValue);
        // @ts-ignore
        control.markAsPristine();
        // @ts-ignore
        control.markAsUntouched(); // Dodajte ovu liniju
        // @ts-ignore
        control.updateValueAndValidity();

      });
      form.classList.remove('was-validated');


      this.rawLabararatoryPrescriptions = []
      this.totalSchedule = 0

    }, error => {
      console.log("Error " + error.status);
      if (error.status == 409) {
        // this.errorMessage = 'greska';
        this.snackBar.openErrorSnackBar("Greska!")
      }

    })
  }

  validateEntries() : boolean {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');

    if(form.checkValidity() === false){
      return false;
    }

    return true;
  }
  //nerealizovani uputi
  findExaminations() {
    console.log("Page " + this.page + " - " + this.pageS)
    this.lbp = this.searchForm.get('name')?.value

    if (this.page == 0)
      this.page = 1;

    // @ts-ignore
    this.labaratoryService.getdPrescriptionsForPatientNotRealized(this.lbp, this.page - 1, this.pageSize)
      .subscribe((response) => {
        this.rawLabaratoryPage = response
        this.rawLabararatoryPrescriptions = this.rawLabaratoryPage.content
        this.totalSchedule = this.rawLabaratoryPage.totalElements
        if(this.rawLabararatoryPrescriptions.length == 0){
          this.snackBar.openWarningSnackBar("Nema nerealizovanih uputa")
        }
      }, err =>{
        this.snackBar.openErrorSnackBar("Greska")
      })
  }

  //todo da dodaju na beku @RequestParam za datum i pacijenta
  listScheduledExaminations() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    if (this.pageS == 0) {
      this.pageS = 1
    }
    console.log(this.page + " " + this.pageSize + " - " + this.pageS + " " + this.pageSizeS)

/*        this.lbp = this.searchVisitForm.get('name')?.value
        this.dateSearch = this.searchVisitForm.get('date')?.value
        if(this.searchVisitForm.get('date')?.value){
          this.dateSearch = new Date()
        }
        this.labaratoryService.listScheduledExaminationsByLbp(this.lbp, this.dateSearch, this.page-1, this.pageSize).subscribe((response) => {
            this.scheduledLabExaminationPage = response
            this.scheduledLabExaminations = this.scheduledLabExaminationPage.content
            this.totalView = this.scheduledLabExaminationPage.totalElements
        })*/

    this.lbp = this.searchVisitForm.get('name')?.value
    this.dateSearch = this.searchVisitForm.get('date')?.value


    if (this.searchVisitForm.get('date')?.value == '') {
      this.dateSearch = new Date()
    }

/*    //todo fali ruta na beku za otkazivanje pregleda
    cancelExamination(idPregleda: number){

      this.labaratoryService.changeExaminationStatus(idPregleda, ExaminationStatus.OTKAZANO).
      subscribe((response) => {
        this.findExaminations
        alert("Uspesno otkazano")

      }); */
    if(this.lbp.length == 0){
      this.snackBar.openErrorSnackBar("Izaberite pacijenta")
      return;
    }

    this.labaratoryService.listScheduledExaminationsByLbp(this.lbp, this.dateSearch, this.pageS - 1, this.pageSizeS).subscribe((response) => {
      this.scheduledLabExaminationPage = response
      this.scheduledLabExaminations = this.scheduledLabExaminationPage.content
      this.totalViewS = this.scheduledLabExaminationPage.totalElements
      if(this.scheduledLabExaminations.length == 0){
        this.snackBar.openWarningSnackBar("Nema pregleda")
      }
      this.searchVisitForm.reset();
      Object.keys(this.searchVisitForm.controls).forEach((controlName) => {
        const control = this.searchVisitForm.get(controlName);
        const initialValue = this.initialFormValuesSearchVisit[controlName];
        // @ts-ignore
        control.setValue(initialValue);
        // @ts-ignore
        control.markAsPristine();
        // @ts-ignore
        control.markAsUntouched(); // Dodajte ovu liniju
        // @ts-ignore
        control.updateValueAndValidity();
      });
      this.searchVisitForm.get('date')?.reset();
      form.classList.remove('was-validated');

    }, err => {
      console.log("udje")
      console.log(err.error)
      console.log(err.status)
      this.snackBar.openErrorSnackBar("Greska")
    })

  }


  cancelExamination(id: number) {
    console.log("id pregleda za otkazivanje " + id)

    this.labaratoryService.changeExaminationStatus(id, ExaminationStatus.OTKAZANO).
    subscribe((response) => {
      this.listScheduledExaminations()
      this.snackBar.openSuccessSnackBar("Uspesno otkazano!")
    });


  }

  checkStatus(exam: ScheduledLabExamination): boolean {
    if (exam.examinationStatus == ExaminationStatus.ZAKAZANO) {
      return true

    }
    return false
  }

 /* onTableDataChange(event: any): void {
    this.page = event;
    //ili ????? ger Examination
    this.getPatientList();
  }*/


    onTableDataChange(event: any): void {
        console.log("Classic called")
        this.page = event;
        this.findExaminations();
    }

  onTableDataChangeSecond(event: any): void {
    console.log("Classic called 2nd")
    this.pageS = event;
    this.listScheduledExaminations();
  }


  onSearch(searchText: string) {
    this.patientList = this.patientList.filter(patient => patient.lbp.toLowerCase().includes(searchText.toLowerCase()));
  }


}
