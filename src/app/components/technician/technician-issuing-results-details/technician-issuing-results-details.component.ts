import { Component } from '@angular/core';
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {LabWorkOrderWithAnalysis} from "../../../models/laboratory/LabWorkOrderWithAnalysis";
import {ParameterAnalysisResultWithDetails} from "../../../models/laboratory/ParameterAnalysisResultWithDetails";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user-service/user.service";
import {AuthService} from "../../../services/auth.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {FormBuilder} from "@angular/forms";
import {PatientService} from "../../../services/patient-service/patient.service";

@Component({
  selector: 'app-technician-issuing-results-details',
  templateUrl: './technician-issuing-results-details.component.html',
  styleUrls: ['./technician-issuing-results-details.component.css']
})
export class TechnicianIssuingResultsDetailsComponent {

  currentLabWorkOrder: LabWorkOrderNew;

  labWorkOrderWithAnalysis: LabWorkOrderWithAnalysis = new LabWorkOrderWithAnalysis();
  parameterAnalysisResults: ParameterAnalysisResultWithDetails[]= [];

  workOrderId: number = 0;


  constructor(private route: ActivatedRoute, private laboratoryService:LaboratoryService,
              private router: Router){
    this.currentLabWorkOrder = history.state.lab;
  }


  ngOnInit(): void {

    this.workOrderId =parseInt( <string>this.route.snapshot.paramMap.get('id'));

    console.log(this.workOrderId)
    this.getLabWorkOrderWithAnalysis();

  }

  getLabWorkOrderWithAnalysis(): void{

    this.laboratoryService.getLabWorkOrderWithAnalysis(this.workOrderId).subscribe(
      res=>{

      }, err => {
        if (err.status == 302) { // found!
          this.labWorkOrderWithAnalysis = err.error; // Message recieved on error -> err.error to get message
          this.parameterAnalysisResults = this.labWorkOrderWithAnalysis.parameterAnalysisResults
        }
      })

    console.log(this.labWorkOrderWithAnalysis)
    console.log(this.parameterAnalysisResults)

  }

  navigateBack():void{
    this.router.navigate(['/technician-issuing-results']);
  }

}
