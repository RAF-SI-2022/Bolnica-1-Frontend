import {Component, OnInit} from '@angular/core';
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {ActivatedRoute, Router} from "@angular/router";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {Observable} from "rxjs";
import {HttpStatusCode} from "@angular/common/http";
import {environmentInfirmary} from "../../../../environments/environment";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-nurse-infirmary-workspace-one',
  templateUrl: './nurse-infirmary-workspace-one.component.html',
  styleUrls: ['./nurse-infirmary-workspace-one.component.css']
})
export class NurseInfirmaryWorkspaceOneComponent implements OnInit {

  patientName: string = 'Ime';
  patientSurname: string = 'Prezime';
  patientDateOfBirth: Date = new Date();
  patientLbp: string = 'LBP';
  patientRoomNumber: number = 0;
  patientDateAdmission: Date = new Date();
  patientDischargeDate: Date = new Date();

  currentHospitalization: HospitalizationDto;

  covidBoolean: boolean = false;

  ventilatorBoolean : boolean = false;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private infirmaryService: InfirmaryService,
              private snackBar: SnackbarServiceService,
              private authService: AuthService) {

    this.currentHospitalization = history.state.hospitalization;
  }

  ngOnInit(): void {
    this.patientLbp = 'ema'

    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');

    this.patientName = this.currentHospitalization.name
    this.patientSurname = this.currentHospitalization.surname
    this.patientDateOfBirth = this.currentHospitalization.dateOfBirth
    this.patientRoomNumber = this.currentHospitalization.hospitalRoom.roomNumber
    this.patientDateAdmission = this.currentHospitalization.patientAdmission
    this.patientDischargeDate = this.currentHospitalization.dischargeDateAndTime

    this.covidBoolean = this.authService.isCovid();
    this.checkVentilator();


  }

  checkVentilator(): void{
    this.infirmaryService.isVentilator(this.currentHospitalization.id).subscribe(res=>{
      this.ventilatorBoolean = res
    }
    )
  }



  goToStateHistory(): void {
    const url = `/nurse-infirmary-state-history/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }

  goToVisitsHistory(): void {
    const url = `/nurse-infirmary-visits-history/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }


  goToRegisterVisit(): void {
    const url = `/nurse-infirmary-register-visit/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }

  public addOnVentilator(): void{
    this.infirmaryService.addOnVentilator(this.currentHospitalization.id)
      .subscribe(res=>{
        this.checkVentilator()
        this.snackBar.openSuccessSnackBar("Sacuvana izmena!")

      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      })
  }

  public removeFromVentilator(): void{
    this.infirmaryService.removeFromVentilator(this.currentHospitalization.id)
      .subscribe(res=>{
        this.checkVentilator()
        this.snackBar.openSuccessSnackBar("Sacuvana izmena!")

      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      })
  }





}
