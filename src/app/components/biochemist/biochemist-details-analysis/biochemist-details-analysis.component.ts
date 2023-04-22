import {Component, OnInit} from '@angular/core';
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user-service/user.service";
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {PatientService} from "../../../services/patient-service/patient.service";
import {LabWorkOrderWithAnalysis} from "../../../models/laboratory/LabWorkOrderWithAnalysis";
import {ParameterAnalysisResultWithDetails} from "../../../models/laboratory/ParameterAnalysisResultWithDetails";
import {OrderStatus} from "../../../models/laboratory-enums/OrderStatus";
import {LabWorkOrderDto} from "../../../models/laboratory/LabWorkOrderDto";

@Component({
  selector: 'app-biochemist-details-analysis',
  templateUrl: './biochemist-details-analysis.component.html',
  styleUrls: ['./biochemist-details-analysis.component.css']
})
export class BiochemistDetailsAnalysisComponent implements OnInit{

  currentLabWorkOrder: LabWorkOrderNew;

  labWorkOrderWithAnalysis: LabWorkOrderWithAnalysis = new LabWorkOrderWithAnalysis();
  parameterAnalysisResults: ParameterAnalysisResultWithDetails[]= [];

  obradjen: boolean = false;

  lbz: string = '';

  biochemist: boolean = false;
  biochemistSpec: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  workOrderId: number = 0;
  lbp: string = '';
  patientName: string = '';
  patientSurname:string = '';

  biochemistLbzVerified: string = ''
  biochemistName: string = ''
  biochemistSurname: string = ''


  constructor(private route: ActivatedRoute, private userService: UserService,
              private authService: AuthService, private laboratoryService:LaboratoryService,
              private router: Router, private formBuilder: FormBuilder,
              private patientService: PatientService){

    this.currentLabWorkOrder = history.state.labWorkOrder;

  }

  ngOnInit(): void {

    this.workOrderId =parseInt( <string>this.route.snapshot.paramMap.get('id'));
    this.lbz = this.authService.getLBZ();

    // OTKOMENTARISATI KAD PRORADI STRANICA

    /*
    this.lbp = this.currentLabWorkOrder.lbp
    this.biochemistLbzVerified = this.currentLabWorkOrder.biochemistLbz

    if(this.currentLabWorkOrder.status.toString() == OrderStatus.OBRADJEN.toString()){
      this.obradjen = true
    }

    this.getPatient();
    this.getBiochemistVerified();*/

    this.getLabWorkOrderWithAnalysis();

  }

  getBiochemistVerified(): void{
    this.userService.getEmployee(this.biochemistLbzVerified).subscribe((response) => {
      this.biochemistName = response.name;
      this.biochemistSurname = response.surname;
    })
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

  }

  getPatient(): void{
    this.patientService.getPatientByLbp(this.lbp).subscribe((response) => {
      this.patientName = response.name;
      this.patientSurname = response.surname;
    })

    console.log("Ime: " + this.patientName)
    console.log("Prezime: " + this.patientSurname)
  }


  saveChanges(paramId: number, result: string): void {

    console.log("result before service "+ result);
    console.log("id parametra "+ paramId);

    this.laboratoryService.updateAnalysisParameters(this.workOrderId, paramId, result)
      .subscribe((response) => {
      this.errorMessage = '';
      this.successMessage = 'Promena je uspesno sacuvana!'
    }, error => {
      console.log("Error " + error.status);
      if(error.status == 409){
        this.errorMessage = 'Promena nije sacuvana!';
      }
    })
  }

  verifyWorkOrder(): void{
      this.laboratoryService.verifyWorkOrder(this.workOrderId).subscribe(res=>{
        this.successMessage = res.message
        console.log(res.message)
      }, error => {
        console.log(error.message)
      })
  }


  checkMedBiohemicar(): boolean {
    this.userService.checkRole('ROLE_MED_BIOHEMICAR').subscribe(hasRole => {
      if (hasRole) {
        this.biochemist = true;
      }
      else this.biochemist = false;
    });
    return this.biochemist;
  }

  checkSpecMedBiohemije(): boolean {
    this.userService.checkRole('ROLE_SPEC_MED_BIOHEMIJE').subscribe(hasRole => {
      if (hasRole) {
        this.biochemistSpec = true;
      }
      else this.biochemistSpec = false;
    });
    return this.biochemistSpec;
  }

}
