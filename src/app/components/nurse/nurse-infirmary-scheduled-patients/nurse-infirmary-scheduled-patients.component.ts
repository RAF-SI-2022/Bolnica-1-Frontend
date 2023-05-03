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

@Component({
  selector: 'app-nurse-infirmary-scheduled-patients',
  templateUrl: './nurse-infirmary-scheduled-patients.component.html',
  styleUrls: ['./nurse-infirmary-scheduled-patients.component.css']
})
export class NurseInfirmaryScheduledPatientsComponent implements OnInit {

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

    this.form = this.formBuilder.group({
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
    console.log("sending lbp: " + sendData.lpb)


    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    this.infirmaryService.findScheduledAppointmentWithFilter(sendData.lbp,
      this.departmentIdNumber, yesterday, tomorrow, this.page,
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

  registerAdmission(admission: ScheduledAppointmentDto): void {
    this.infirmaryService.setScheduledAppointmentStatus(admission.id, AdmissionStatus.REALIZOVAN)
      .subscribe((response) => {
        this.snackBar.openSuccessSnackBar("Uspesno realizovan prijem!")

        const url = `/nurse-infirmary-patient-admission`;
        this.router.navigateByUrl(url, { state: { admission } });

      }, error => {
        console.log("Error " + error.status);
        if (error.status == 409) {
          this.snackBar.openErrorSnackBar("Greska!")
        }
      })
  }

}
