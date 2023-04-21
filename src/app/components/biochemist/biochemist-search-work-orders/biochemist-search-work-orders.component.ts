import {Component, OnInit} from '@angular/core';
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user-service/user.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderStatus} from "../../../models/laboratory-enums/OrderStatus";
import {AnalysisParameter} from "../../../models/laboratory/AnalysisParameter";
import {Page} from "../../../models/models";
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";

@Component({
  selector: 'app-biochemist-search-work-orders',
  templateUrl: './biochemist-search-work-orders.component.html',
  styleUrls: ['./biochemist-search-work-orders.component.css']
})
export class BiochemistSearchWorkOrdersComponent implements OnInit{

  workOrdersList: LabWorkOrderNew[] = [];
  workOrdersPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>();
  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  lbz: string = '';

 // lbp: string = '';
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  exactDate: Date = new Date();
  selectedStatus: OrderStatus = 0;

  patientName: string = '';
  patientSurname: string = '';

  form: FormGroup;

  constructor(private patientService: PatientService, private authService: AuthService, private laboratoryServis:LaboratoryService, private router: Router, private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      lbp: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
      selectedStatus: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    const lbp = this.form.value.lbp;
    this.lbz = this.authService.getLBZ();
    this.patientService.getPatientByLbp(lbp).subscribe((response) => {
      this.patientName = response.name;
      this.patientSurname = response.surname;
    })
    console.log("Ime: " + this.patientName)
    console.log("Prezime: " + this.patientSurname)
    console.log("search work orders component")
  }

  onRowClick(): void {
    const url = `/biochemist-details`;
    this.router.navigateByUrl(url);
  }

  findWorkOrders(): void{
    const lbp = this.form.value.lbp;
    console.log(lbp)
    console.log(this.dateFrom)
    console.log(this.dateTo)
    console.log(this.selectedStatus)
    this.laboratoryServis.findWorkOrders(lbp, this.dateFrom, this.dateTo, this.selectedStatus,0, 1)
      .subscribe((response) => {
        this.workOrdersPage = response
        this.workOrdersList = this.workOrdersPage.content
        this.total = this.workOrdersPage.totalElements
      })


  }

}
