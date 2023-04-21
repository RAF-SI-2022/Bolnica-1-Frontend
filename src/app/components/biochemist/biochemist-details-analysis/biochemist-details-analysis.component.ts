import {Component, OnInit} from '@angular/core';
import {HospitalShort, Page, Zaposleni} from "../../../models/models";
import {AnalysisParameter} from "../../../models/laboratory/AnalysisParameter";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'app-biochemist-details-analysis',
  templateUrl: './biochemist-details-analysis.component.html',
  styleUrls: ['./biochemist-details-analysis.component.css']
})
export class BiochemistDetailsAnalysisComponent implements OnInit{

  analysisParams: AnalysisParameter[] = [];
  analysisParamsPage: Page<AnalysisParameter> = new Page<AnalysisParameter>();
  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  lbz: string = '';
  employeeName: string = '';
  biochemist: boolean = false;
  biochemistSpec: boolean = false;

  result: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  workOrderId = '';
  lbp = '';
  patientName = '';
  patientSurname = '';


  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private laboratoryServis:LaboratoryService, private router: Router, private formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // this.productId = +params.get('id');
      // this.category = params.get('category');
    });
    console.log("detailed analysis component");
    //dodaj u app routing module
    this.workOrderId = <string>this.route.snapshot.paramMap.get('id');

    this.lbz = this.authService.getLBZ();
    this.userService.getEmployee(this.lbz).subscribe((response) => {
      this.employeeName = response.name;
    })


    this.laboratoryServis.findAnalysisParametersResults1(Number(this.workOrderId)).subscribe((response) => {
      this.analysisParamsPage = response;
      this.analysisParams = this.analysisParamsPage.content
      this.total = this.analysisParamsPage.totalElements
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

  saveChanges(workOrderId: number, paramId: number, result: string): void {
    this.laboratoryServis.updateAnalysisParameters(workOrderId, paramId, result).subscribe((response) => {

      this.errorMessage = '';
      this.successMessage = 'Promena je uspesno sacuvana!'
    }, error => {
      console.log("Error " + error.status);
      if(error.status == 409){
        this.errorMessage = 'Promena nije sacuvana!';
      }
    })
  }

}
