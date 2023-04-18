import {Component, OnInit} from '@angular/core';
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user-service/user.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-biochemist-search-work-orders',
  templateUrl: './biochemist-search-work-orders.component.html',
  styleUrls: ['./biochemist-search-work-orders.component.css']
})
export class BiochemistSearchWorkOrdersComponent implements OnInit{

  constructor(private laboratoryServis:LaboratoryService, private router: Router) {

  }

  ngOnInit(): void {
    console.log("search work orders component")

  }

  onRowClick(): void {
    const url = `/biochemist-details`;
    this.router.navigateByUrl(url);

  }

}
