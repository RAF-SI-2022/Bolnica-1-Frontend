import {Component, OnInit} from '@angular/core';
import {ScheduledAppointmentDto} from "../../../models/infirmary/ScheduledAppointmentDto";
import {Page} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {AuthService} from "../../../services/auth.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {Router} from "@angular/router";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {AdmissionStatus} from "../../../models/infirmary-enums/AdmissionStatus";
import {PrescriptionDto} from "../../../models/infirmary/PrescriptionDto";
import {HospitalRoomDto} from "../../../models/infirmary/HospitalRoomDto";
import {DoctorDepartmentDto} from "../../../models/DoctorDepartmentDto";
import {ExaminationService} from "../../../services/examination-service/examination.service";
import {PrescriptionStatus} from "../../../models/laboratory-enums/PrescriptionStatus";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-nurse-infirmary-patient-admission',
  templateUrl: './nurse-infirmary-patient-admission.component.html',
  styleUrls: ['./nurse-infirmary-patient-admission.component.css']
})
export class NurseInfirmaryPatientAdmissionComponent implements OnInit {

  currentAdmission : ScheduledAppointmentDto;

  patientLbp: string = ''
  lbpBoolean: boolean = false;
  initialFormValues: any;
  // selectedPrescription: PrescriptionDto = new PrescriptionDto();
  selectedPrescriptionId: number = 0;
  prescriptionBoolean: boolean = false;

  selectedRoomId: number = 0;
  selectedRoomNumber: number = 0;
  roomBoolean: boolean = false;

  prescriptionList: PrescriptionDto[] = [];
  prescriptionPage: Page<PrescriptionDto> = new Page<PrescriptionDto>();

  roomsList: HospitalRoomDto[] = [];
  roomsPage: Page<HospitalRoomDto> = new Page<HospitalRoomDto>();

  admissionList: ScheduledAppointmentDto[] = [];
  admissionPage: Page<ScheduledAppointmentDto> = new Page<ScheduledAppointmentDto>();

  PAGE_SIZE: number = 5;
  page: number = 0;
  pageR: number = 0;
  total: number = 0;
  totalRoom: number = 0;

  departmentIdNumber: number = 0;
  departmentPbo: string = '';

  form: FormGroup;
  patients: Patient[] = []

  selectedDoctor: string = '';
  doctors: DoctorDepartmentDto[] = [];

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private laboratoryService: LaboratoryService,
              private router: Router,
              private snackBar: SnackbarServiceService,
              private formBuilder: FormBuilder,
              private infirmaryService:InfirmaryService,
              private examinationService: ExaminationService) {

    this.currentAdmission = history.state.admission;

    if (history.state.admission != null) {
      this.patientLbp = this.currentAdmission.lbp
      this.lbpBoolean = true
      this.selectedPrescriptionId = this.currentAdmission.prescriptionId;
      this.prescriptionBoolean = true
    }

    this.form = this.formBuilder.group({
      lbp: [this.patientLbp, [Validators.required]],
      note: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.departmentIdNumber = parseInt(this.authService.getDepartmentId());
    this.departmentPbo = this.authService.getPBO();
    this.initialFormValues = this.form.getRawValue();
    console.log("pbo " + this.departmentPbo)
    this.populatePatients()
    // this.getPrescription()
    this.getRooms()
    this.getDoctors()

  }


  getPrescription(): void {
    let hasPatientWithLbp = this.patients.some(patient => patient.lbp === this.form.value.lbp.split(":")[0].trim());

    if (!hasPatientWithLbp) {
      this.snackBar.openWarningSnackBar("Pacijent je ili vec hospitalizovan ili nije u sistemu!")
      return;
    }

    this.prescriptionBoolean = false
    this.roomBoolean = false

    this.prescriptionList = []
    this.total = 0



    const sendData = this.form.value;

    if (this.patientLbp == '') {
      console.log(sendData)

      sendData.lbp = sendData.lbp.split(":")[0].toString().trim();
      console.log("sending lbp: " + sendData.lpb)
    }

    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

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

  getPrescriptionPagination(): void {

    const sendData = this.form.value;

    if (this.patientLbp == '') {
      console.log(sendData)

      sendData.lbp = sendData.lbp.split(":")[0].toString().trim();
      console.log("sending lbp: " + sendData.lpb)
    }

    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

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


  // bilo je pre da ide od 1 do 100 ali onda vraca prazno
  // ako ide od 0 do 100 onda vrati ono sto je u bazi
  getRooms(): void{
    if (this.pageR == 0)
      this.pageR = 1;

    this.infirmaryService.getHospitalRoomsByDepartmentId(this.departmentIdNumber,
      this.pageR - 1,this.PAGE_SIZE).subscribe(
      res => {
        this.roomsPage = res
        this.roomsList = this.roomsPage.content
        this.totalRoom = this.roomsPage.totalElements
        console.log("TOTAL JE " + this.total)
        if (this.roomsList.length == 0) {
          this.snackBar.openWarningSnackBar("Nema slobodnih soba!")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      }
    )

  }


  addHospitalization(): void{

    const sendData = this.form.value;
    console.log("discharge list date:"+ sendData.dischargeDateAndTime);

    console.log("doctor lbz:" + this.selectedDoctor)

    if(this.selectedDoctor.length == 0){
      this.snackBar.openWarningSnackBar("Izaberite doktora")
      return;
    }

    if (!this.prescriptionBoolean) {
      this.snackBar.openErrorSnackBar("Izaberite uput!");
      return;
    }


    if (this.patientLbp == '') {
      console.log(sendData)

      sendData.lbp = sendData.lbp.split(":")[0].toString().trim();
      console.log("sending lbp: " + sendData.lpb)
    }

    // TODO DISCHARGE DATE AND TIME??? DA LI ostaviti DA MOZE DA SE IZABERE NA FRONTU
    //  ili obrisati sa beka

    this.infirmaryService.createHospitalization(this.selectedDoctor, new Date(),
      this.selectedRoomId, this.selectedPrescriptionId, sendData.note)
      .subscribe((response) => {
        this.snackBar.openSuccessSnackBar("Uspesno registrovan prijem!")

        this.prescriptionBoolean = false;
        this.roomBoolean = false;


        // Reset form values and mark them as untouched
        this.form.reset();
        this.form.markAsUntouched();
        this.form.markAsPristine();

        // Reset form variables
        this.patientLbp = '';
        this.lbpBoolean = false;
        this.selectedPrescriptionId = 0;

        // Reset history state
        history.state.admission = null;

        this.populatePatients()

        this.prescriptionList = []
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
        console.log("USAOOOO *****")
        // TODO AKO JE IZABRAN UPUT, ONDA AZURIRATI DA JE REALIZOVAN?

        if(this.currentAdmission != null) this.registerAdmission(this.currentAdmission)


      }, error => {
        console.log("Error " + error.status);
        if (error.status == 409) {
          this.snackBar.openErrorSnackBar("Prijem nije registrovan!")
        }
      })

  }


  getDoctors(): void {
    this.examinationService.getDoctorsByDepartment(this.departmentPbo).subscribe(res => {
      this.doctors = res
      console.log(this.doctors)
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
    console.log("{" + searchText + "} Imam nas " + this.filteredPatients.length)
  }

  selectSuggestion(patient: Patient){
    this.form.value.lbp = `${patient.lbp} : ${patient.name} (${patient.surname})`;
    this.filteredPatients = [];
  }


  // populatePatients() {
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


  registerAdmission(admission: ScheduledAppointmentDto): void {
    this.infirmaryService.setScheduledAppointmentStatus(admission.id, AdmissionStatus.REALIZOVAN)
      .subscribe((response) => {
        this.snackBar.openSuccessSnackBar("Prijem realizovan!")
      }, error => {
        console.log("Error " + error.status);
        if (error.status == 409) {
          this.snackBar.openErrorSnackBar("Greska!")
        }
      })
  }

  choosePrescription(prescription: PrescriptionDto): void{
    this.selectedPrescriptionId = prescription.id
    console.log("izabran uput:"+ this.selectedPrescriptionId)
    // this.selectedPrescription = prescription
    this.prescriptionBoolean = true
  }

  chooseRoom(room: HospitalRoomDto): void{
    this.selectedRoomId = room.id
    this.selectedRoomNumber = room.roomNumber
    this.roomBoolean = true
  }

  onTableDataChangeRoom(event: any): void {
    this.pageR = event;
    this.getRooms();
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getPrescriptionPagination();
  }

  onDoctorSelected(selectedDoctor: string) {
    this.selectedDoctor = selectedDoctor
    console.log("ema:"+selectedDoctor);
  }


}
