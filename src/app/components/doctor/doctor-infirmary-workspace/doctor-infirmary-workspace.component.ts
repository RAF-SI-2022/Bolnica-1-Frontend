import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";

@Component({
  selector: 'app-doctor-infirmary-workspace',
  templateUrl: './doctor-infirmary-workspace.component.html',
  styleUrls: ['./doctor-infirmary-workspace.component.css']
})
export class DoctorInfirmaryWorkspaceComponent implements OnInit {

  patientName: string = 'Ime';
  patientSurname: string = 'Prezime';
  patientDateOfBirth: Date = new Date();
  patientLbp: string = 'LBP';
  patientRoomNumber: number = 0;
  patientDateAdmission: Date = new Date();
  patientDischargeDate: Date = new Date();

  currentHospitalization: HospitalizationDto;

  dischargeShow: boolean = false;


  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.currentHospitalization = history.state.hospitalization;

  }

  ngOnInit(): void {
    //this.currentHospitalization = history.state.hospitalization;

    this.patientLbp = 'ema'

    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');

    this.patientName = this.currentHospitalization.name
    this.patientSurname = this.currentHospitalization.surname
    this.patientDateOfBirth = this.currentHospitalization.dateOfBirth
    this.patientRoomNumber = this.currentHospitalization.hospitalRoom.roomNumber
    this.patientDateAdmission = this.currentHospitalization.patientAdmission
    this.patientDischargeDate = this.currentHospitalization.dischargeDateAndTime

    this.dischargeShow = this.isDischargeDateAndTimeEmpty();
    console.log(this.dischargeShow)

  }


  isDischargeDateAndTimeEmpty(): boolean {
    return !this.currentHospitalization.dischargeDateAndTime;
  }

  goToMedicalRecord(): void {
    const url = `/doctor-infirmary-medical-record/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }


  goToUput(): void {
    const url = `/doctor-infirmary-create-referral/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }

  goToStateHistory(): void {
    const url = `/doctor-infirmary-state-history/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization }});
  }


  goToMedicalChart(): void {
    const url = `/doctor-medical-chart/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }


  goToDischargeList(): void {
    const url = `/doctor-infirmary-discharge-list/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }

  goToScheduleExam(): void {
    const url = `/doctor-schedule-exam/${this.patientLbp}`;
    this.router.navigateByUrl(url);
  }

}
