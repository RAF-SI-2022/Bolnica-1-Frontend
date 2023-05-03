import {Component, OnInit} from '@angular/core';
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {ActivatedRoute, Router} from "@angular/router";

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

  currentHospitalization: HospitalizationDto;


  constructor(private router: Router,
              private route: ActivatedRoute) {

    this.currentHospitalization = history.state.hospitalization;
  }

  ngOnInit(): void {
    this.patientLbp = 'ema'

    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');

    this.patientName = this.currentHospitalization.name
    this.patientSurname = this.currentHospitalization.surname
    this.patientDateOfBirth = this.currentHospitalization.dateOfBirth
    this.patientRoomNumber = this.currentHospitalization.hospitalRoom.roomNumber

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



}
