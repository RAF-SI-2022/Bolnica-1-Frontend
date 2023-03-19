import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-doctor-workspace-one-patient',
  templateUrl: './doctor-workspace-one-patient.component.html',
  styleUrls: ['./doctor-workspace-one-patient.component.css']
})
export class DoctorWorkspaceOnePatientComponent implements OnInit {
  isPopupVisible = false;

  showPopup(event: any) {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  confirmSacuvaj() {
    //treba sacuvati izvestaj

  }

  ngOnInit(): void {
  }

}
