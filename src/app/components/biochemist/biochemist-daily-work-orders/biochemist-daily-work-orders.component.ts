import {Component, OnInit} from '@angular/core';
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page, Zaposleni} from "../../../models/models";
import {LabWorkOrderWithAnalysis} from "../../../models/laboratory/LabWorkOrderWithAnalysis";
// import {Page} from "ngx-pagination";
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";

@Component({
  selector: 'app-biochemist-daily-work-orders',
  templateUrl: './biochemist-daily-work-orders.component.html',
  styleUrls: ['./biochemist-daily-work-orders.component.css']
})
export class BiochemistDailyWorkOrdersComponent implements OnInit{

  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;
  workOrdersForm: FormGroup;
  workOrdersPage: Page<LabWorkOrder> = new Page<LabWorkOrder>();
  workOrderList: LabWorkOrder[] = [];

  workOrderId = '';

  constructor(private laboratoryServis:LaboratoryService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute){
    this.workOrdersForm = this.formBuilder.group({

    });
  }


  ngOnInit(): void {
    console.log("daily work orders component")
   // this.workOrderId = this.route.snapshot.paramMap.get('id') || '';

    //
    // this.laboratoryServis.findWorkOrders().subscribe((response) => {
    //   this.workOrders = response;
    // })

  }

  onRowClick(workOrderId: number): void {
    // const url = `/biochemist-details/${workOrderId}`;
    // this.router.navigateByUrl(url);
    //*******************************
    //const url = `/biochemist-details`;
   //this.router.navigateByUrl(url);
    this.router.navigate(['/biochemist-details']);

  }

  getWorkOrders(): void{
    // this.laboratoryServis.findWorkOrders(this.ime, this.prezime, this.selektovanaOrdinacija, this.selektovanaBolnica, this.deleted, this.page-1, this.PAGE_SIZE).subscribe((response) => {
    //   this.workOrdersPage = response;
    //   this.workOrderList = this.workOrdersPage.content;
    //   this.total = this.workOrdersPage.totalElements
    // });
  }


}
