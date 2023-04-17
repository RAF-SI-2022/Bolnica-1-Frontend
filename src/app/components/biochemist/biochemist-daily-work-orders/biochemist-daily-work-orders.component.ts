import {Component, OnInit} from '@angular/core';
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-biochemist-daily-work-orders',
  templateUrl: './biochemist-daily-work-orders.component.html',
  styleUrls: ['./biochemist-daily-work-orders.component.css']
})
export class BiochemistDailyWorkOrdersComponent implements OnInit{

  constructor(private laboratoryServis:LaboratoryService, private router: Router) {

  }


  ngOnInit(): void {
    console.log("daily work orders component")

  }

  onRowClick(): void {
    const url = `/biochemist-details`;
    this.router.navigateByUrl(url);

  }
}
