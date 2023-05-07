import {Component, OnInit} from '@angular/core';
import {Page} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {AuthService} from "../../../services/auth.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {Router} from "@angular/router";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {ScheduledAppointmentDto} from "../../../models/infirmary/ScheduledAppointmentDto";
import {AdmissionStatus} from "../../../models/infirmary-enums/AdmissionStatus";

@Component({
  selector: 'app-nurse-infirmary-search-admission',
  templateUrl: './nurse-infirmary-search-admission.component.html',
  styleUrls: ['./nurse-infirmary-search-admission.component.css']
})
export class NurseInfirmarySearchAdmissionComponent implements OnInit {

  admissionList: ScheduledAppointmentDto[] = [];
  admissionPage: Page<ScheduledAppointmentDto> = new Page<ScheduledAppointmentDto>();

  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  departmentIdNumber: number = 0;

  form: FormGroup;
  patients: Patient[] = []

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private laboratoryService: LaboratoryService,
              private router: Router,
              private snackBar: SnackbarServiceService,
              private formBuilder: FormBuilder,
              private infirmaryService:InfirmaryService) {

    const now = new Date();
    const before = new Date(0);

    this.form = this.formBuilder.group({
      dateFrom: [before.toISOString().slice(0,10), [Validators.required]],
      dateTo: [now.toISOString().slice(0,10), [Validators.required]],
      lbp: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.departmentIdNumber = parseInt(this.authService.getDepartmentId());
    this.populatePatients()
  }


  getScheduledAdmissions(): void {

    const sendData = this.form.value;
    console.log(sendData)

    sendData.lbp = sendData.lbp.split("-")[0].toString().trim();

    console.log("sending lbp: " + sendData.lbp)

    this.infirmaryService.findScheduledAppointmentWithFilter(sendData.lbp,
      this.departmentIdNumber,sendData.dateFrom, sendData.dateTo, this.page,
      this.PAGE_SIZE).subscribe(
      res => {
        this.admissionPage = res
        this.admissionList = this.admissionPage.content

        this.total = this.admissionPage.totalElements
        if (this.admissionList.length == 0) {
          this.snackBar.openWarningSnackBar("Nema zakazanih prijema!")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      }
    )
  }


  onTableDataChange(event: any): void {
    this.page = event;
    this.getScheduledAdmissions();
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
    this.form.value.lbp = `${patient.lbp} - ${patient.name} (${patient.surname})`;
    this.filteredPatients = [];
  }


  populatePatients() {
    this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
      this.patients = res.content;
      console.log("IMA NAS " + res.content.length)
    }, err => {
      console.log("GRESKA " + err.message)
    })
  }


  cancelAdmission(admission: ScheduledAppointmentDto): void {
    this.infirmaryService.setScheduledAppointmentStatus(admission.id, AdmissionStatus.OTKAZAN)
      .subscribe((response) => {
        this.snackBar.openSuccessSnackBar("Uspesno otkazan prijem!")
        this.getScheduledAdmissions();

      }, error => {
        console.log("Error " + error.status);
        if (error.status == 409) {
          this.snackBar.openErrorSnackBar("Greska!")
        }
      })
  }

}
