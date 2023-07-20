import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user-service/user.service";
import { PatientService } from "../../../services/patient-service/patient.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LaboratoryService } from "../../../services/laboratory-service/laboratory.service";
import { Page } from "../../../models/models";
import { LabWorkOrderNew } from "../../../models/laboratory/LabWorkOrderNew";
import { OrderStatus } from "../../../models/laboratory-enums/OrderStatus";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { Patient } from 'src/app/models/patient/Patient';

@Component({
  selector: 'app-technician-issuing-results',
  templateUrl: './technician-issuing-results.component.html',
  styleUrls: ['./technician-issuing-results.component.css']
})
export class TechnicianIssuingResultsComponent implements OnInit {

  form: FormGroup;
  page = 0;
  pageSize = 5;
  labWorkOrderPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>();
  labWorkOrderList: LabWorkOrderNew[] = [];
  total = 0;

  obradjen: OrderStatus = OrderStatus.OBRADJEN;

  constructor(private laboratoryServis: LaboratoryService, private snackBar: SnackbarServiceService, private authService: AuthService, private userService: UserService, private patientService: PatientService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    const now = new Date();
    const before = new Date(0);

    this.form = this.formBuilder.group({
      lbp: ['', [Validators.required]],
      from: [now.toISOString().slice(0,10), [Validators.required]],
      to: [now.toISOString().slice(0,10), [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.populatePatients()
    this.findWorkOrders()
  }

  findWorkOrders() {
    const workOrder = this.form.value;
    console.log(workOrder.lbp+":before trimming")
    // workOrder.lbp = workOrder.lbp.split("-")[0];
    // workOrder.lbp = workOrder.lbp.trim().split("-")[0];
    workOrder.lbp = workOrder.lbp.replace(/ /g, "_").split(":")[0];
    workOrder.lbp = workOrder.lbp.split("_")[0];
    if (!this.validateFields) {
      return;
    }


    console.log("usao u findWorkOrders u tsu:"+ workOrder.lbp)
    this.laboratoryServis.findWorkOrders(workOrder.lbp, workOrder.from, workOrder.to, '', this.page, this.pageSize).subscribe((response) => {
      this.labWorkOrderPage = response;
      this.labWorkOrderList = this.labWorkOrderPage.content;
      this.total = this.labWorkOrderPage.totalElements
      if(this.labWorkOrderList.length == 0){
        this.snackBar.openWarningSnackBar("Nema radnih naloga")
      }
    }, err => {
      this.snackBar.openErrorSnackBar("Greska")
    });
  }

  validateFields(): boolean {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      return false;
    }
    return true;
  }


  navigateToDetails(lab: LabWorkOrderNew): void {
    console.log("Id radnog naloga za detalje: " + lab.id)
    const url = `/technician-issuing-results-details/${lab.id}`;
    this.router.navigateByUrl(url, { state: { lab } });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.findWorkOrders();
  }

  patients: Patient[] = []
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


  populatePatients() {
    this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
      this.patients = res.content;
      console.log("IMA NAS " + res.content.length)
    }, err => {
      console.log("GRESKA " + err.message)
    })
  }
}
