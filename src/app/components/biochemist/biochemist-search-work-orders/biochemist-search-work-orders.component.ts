import { Component, OnInit } from '@angular/core';
import { LabWorkOrder } from "../../../models/laboratory/LabWorkOrder";
import { LaboratoryService } from "../../../services/laboratory-service/laboratory.service";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user-service/user.service";
import { PatientService } from "../../../services/patient-service/patient.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderStatus } from "../../../models/laboratory-enums/OrderStatus";
import { AnalysisParameter } from "../../../models/laboratory/AnalysisParameter";
import { Page } from "../../../models/models";
import { LabWorkOrderNew } from "../../../models/laboratory/LabWorkOrderNew";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { Patient } from 'src/app/models/patient/Patient';

@Component({
  selector: 'app-biochemist-search-work-orders',
  templateUrl: './biochemist-search-work-orders.component.html',
  styleUrls: ['./biochemist-search-work-orders.component.css']
})
export class BiochemistSearchWorkOrdersComponent implements OnInit {

  workOrdersList: LabWorkOrderNew[] = [];
  workOrdersPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>();

  selectedPatientBoolean: boolean = false;

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

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    this.form = this.formBuilder.group({
      lbp: ['', [Validators.required]],
      dateFrom: [startOfYear.toISOString().slice(0,10), [Validators.required]],
      dateTo: [now.toISOString().slice(0,10), [Validators.required]],
      selectedStatus: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    // this.lbz = this.authService.getLBZ();
    // console.log("lbz: " + this.lbz);
    this.populatePatients()
    this.getWorkOrders()
  }


  getWorkOrders(): void {

    // if(!this.selectedPatientBoolean){
    //   this.snackBar.openWarningSnackBar("Niste izabrali pacijenta");
    //   return;
    // }

    if (this.page == 0)
      this.page = 1;



    const sendData = this.form.value;
    console.log(sendData)
    console.log(sendData.selectedStatus.toString())

    if(sendData.lbp!='') this.page = 1;

    this.dateFrom.setHours(0, 0, 0, 0)
    this.dateTo.setHours(23, 59, 59, 999)
    if(sendData.lbp != '') sendData.lbp = sendData.lbp.split(":")[0].toString().trim();
    console.log("SALJEMM " + sendData.lpb)

    this.laboratoryService.findWorkOrders(sendData.lbp, sendData.dateFrom, sendData.dateTo,
      sendData.selectedStatus.toString(), this.page -1, this.PAGE_SIZE)
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
    this.form.value.lbp = `${patient.lbp} : ${patient.name} (${patient.surname})`;
    this.filteredPatients = [];
    this.selectedPatientBoolean = true;
  }


  populatePatients() {
    this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
      this.patients = res.content;
      console.log("IMA NAS " + res.content.length)
    }, err => {
      console.log("GRESKA " + err.message)
    })
  }
}
