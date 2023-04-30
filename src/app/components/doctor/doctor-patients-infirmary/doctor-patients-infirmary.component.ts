import {Component, OnInit} from '@angular/core';
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {Page} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {AuthService} from "../../../services/auth.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {Router} from "@angular/router";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";

@Component({
  selector: 'app-doctor-patients-infirmary',
  templateUrl: './doctor-patients-infirmary.component.html',
  styleUrls: ['./doctor-patients-infirmary.component.css']
})
export class DoctorPatientsInfirmaryComponent implements OnInit {

  workOrdersList: LabWorkOrderNew[] = [];
  workOrdersPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>();

  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  exactDate: Date = new Date();

  form: FormGroup;
  patients: Patient[] = []

  constructor(private patientService: PatientService, private authService: AuthService,
              private laboratoryService: LaboratoryService, private router: Router, private snackBar: SnackbarServiceService,
              private formBuilder: FormBuilder,) {

    this.form = this.formBuilder.group({
      lbp: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
      selectedStatus: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    // this.lbz = this.authService.getLBZ();
    // console.log("lbz: " + this.lbz);
    //this.populatePatients()
  }


  getWorkOrders(): void {
    const sendData = this.form.value;
    console.log(sendData)
    console.log(sendData.selectedStatus.toString())

    this.dateFrom.setHours(0, 0, 0, 0)
    this.dateTo.setHours(23, 59, 59, 999)
    sendData.lbp = sendData.lbp.split("-")[0].toString().trim();
    console.log("SALJEMM " + sendData.lpb)
    this.laboratoryService.findWorkOrders(sendData.lbp, this.dateFrom, this.dateTo,
      sendData.selectedStatus.toString(), this.page, this.PAGE_SIZE)
      .subscribe(res => {
        this.workOrdersPage = res
        this.workOrdersList = this.workOrdersPage.content
        this.total = this.workOrdersPage.totalElements
        if(this.workOrdersList.length == 0){
          this.snackBar.openWarningSnackBar("Nema radnih naloga")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      })
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getWorkOrders();
  }


  showDetails(lab: LabWorkOrderNew): void {
    console.log("Id radnog naloga za detalje: " + lab.id)
    const url = `/biochemist-details/${lab.id}`;

    this.router.navigateByUrl(url, { state: { lab } });
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

  onRowClick(): void {

    const url = `/doctor-infirmary-workspace`;

    this.router.navigateByUrl(url);
  }
}
