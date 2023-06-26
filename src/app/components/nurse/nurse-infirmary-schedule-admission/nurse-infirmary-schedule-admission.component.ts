import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {AuthService} from "../../../services/auth.service";
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {PrescriptionDto} from "../../../models/infirmary/PrescriptionDto";
import {Page} from "../../../models/models";
import {PrescriptionStatus} from "../../../models/laboratory-enums/PrescriptionStatus";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-nurse-infirmary-schedule-admission',
  templateUrl: './nurse-infirmary-schedule-admission.component.html',
  styleUrls: ['./nurse-infirmary-schedule-admission.component.css']
})
export class NurseInfirmaryScheduleAdmissionComponent implements OnInit {

  currentHospitalization : HospitalizationDto;
  departmentIdNumber: number = 0;
  departmentPbo: string = '';

  selectedPrescription: PrescriptionDto = new PrescriptionDto();
  prescriptionBoolean: boolean = false;

  prescriptionList: PrescriptionDto[] = [];
  prescriptionPage: Page<PrescriptionDto> = new Page<PrescriptionDto>();

  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  lbz: string = ''
  pbo: string = '';

  form: FormGroup;
  patients: Patient[] = []
  initialFormValues: any;


  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackbarServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private infirmaryService: InfirmaryService,
              private authService: AuthService,
              private patientService: PatientService) {

    this.currentHospitalization = history.state.hospitalization;

    const now = new Date();

    this.form = this.formBuilder.group({
      lbp: ['', [Validators.required]],
      note: ['', [Validators.required]],
      dateExamState: [now.toISOString().slice(0,10), [Validators.required]],
    });

  }

  ngOnInit(): void {
    // this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.departmentIdNumber = parseInt(this.authService.getDepartmentId());
    this.departmentPbo = this.authService.getPBO();
    this.lbz = this.authService.getLBZ();
    this.populatePatients();
    this.initialFormValues = this.form.getRawValue();

  }

  scheduleAppointment() {

    const sendData = this.form.value;
    console.log(sendData)

    sendData.lbp = sendData.lbp.split("-")[0].toString().trim();
    console.log("sending lbp: " + sendData.lpb)


    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      return;
    }

    if (!this.prescriptionBoolean) {
      this.snackBar.openErrorSnackBar("Izaberite uput!");
      return;
    }


    this.infirmaryService.createScheduledAppointment(sendData.dateExamState,
      sendData.note, this.selectedPrescription.id)
      .subscribe((response) => {
        this.snackBar.openSuccessSnackBar("Uspesno zakan prijem!")

        // TODO AKO JE IZABRAN UPUT, ONDA AZURIRATI DA JE REALIZOVAN?
        this.form.reset();
        this.prescriptionBoolean = false;
        this.prescriptionList = [];
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
        this.populatePatients()

        this.prescriptionBoolean = false
        this.form.get('dateExamState')?.reset();
        form.classList.remove('was-validated');
      }, error => {
        console.log("Error " + error.status);
        if (error.status == 409) {
          this.snackBar.openErrorSnackBar("Greska!")
        }
      })

  }

  getPrescription(): void {

    this.prescriptionBoolean = false
    this.prescriptionList = []
    this.total = 0

    let hasPatientWithLbp = this.patients.some(patient => patient.lbp === this.form.value.lbp.split(":")[0].trim());

    if (!hasPatientWithLbp) {
      this.snackBar.openWarningSnackBar("Pacijent je ili vec hospitalizovan ili nije u sistemu!")
      return;
    }

    const sendData = this.form.value;

    console.log(sendData)
    sendData.lbp = sendData.lbp.split(":")[0].toString().trim();
    console.log("sending lbp: " + sendData.lpb)

    if (this.page == 0)
      this.page = 1;

    this.infirmaryService.findPrescriptionsWithFilter(sendData.lbp, this.departmentIdNumber,
      PrescriptionStatus.NEREALIZOVAN, this.page - 1,
      this.PAGE_SIZE).subscribe(
      res => {
        this.prescriptionPage = res
        this.prescriptionList = this.prescriptionPage.content

        this.total = this.prescriptionPage.totalElements
        if (this.prescriptionList.length == 0) {
          this.snackBar.openWarningSnackBar("Nema uputa!")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      }
    )
  }

  choosePrescription(prescription: PrescriptionDto): void{
    this.selectedPrescription = prescription
    this.prescriptionBoolean = true
    console.log("izabran uput:"+ this.selectedPrescription.id)
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getPrescription();
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

  selectSuggestion(patient: Patient){
    this.form.value.lbp = `${patient.lbp} : ${patient.name} (${patient.surname})`;
    this.filteredPatients = [];
  }


  // populatePatients() {
  //   // if (this.page == 0)
  //   //   this.page = 1;
  //
  //   this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
  //     this.patients = res.content;
  //     console.log("IMA NAS " + res.content.length)
  //   }, err => {
  //     console.log("GRESKA " + err.message)
  //   })
  // }

  populatePatients() {
    this.patientService.getAllPatients("", "", "", "", 0, 100).subscribe(res => {
      this.patients = res.content;

      this.filterHospitalization(this.patients).subscribe(filteredPatients => {
        console.log("IMA NAS " + filteredPatients.length);
        this.patients = filteredPatients;
      }, err => {
        console.log("GRESKA " + err.message);
      });
    }, err => {
      console.log("GRESKA " + err.message);
    });
  }

  filterHospitalization(patients: Patient[]): Observable<Patient[]> {
    const observables: Observable<boolean>[] = [];

    patients.forEach(patient => {
      const observable = this.infirmaryService.getHospitalizationsWithFilter("", "", "", this.departmentIdNumber, patient.lbp, 0, 9999)
        .pipe(
          map(res => res.content.length === 0),
          catchError(err => {
            console.log("Error: " + err.message);
            return of(false); // Return false in case of an error
          })
        );

      observables.push(observable);
    });

    return forkJoin(observables).pipe(
      map((results: boolean[]) => {
        return patients.filter((patient, index) => results[index]);
      })
    );
  }



}
