import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-doctor-create-referral',
  templateUrl: './doctor-create-referral.component.html',
  styleUrls: ['./doctor-create-referral.component.css']
})
export class DoctorCreateReferralComponent implements OnInit{
/*
  selectedOption: string;

  onOptionSelected(value: string) {
    this.selectedOption = value;
  }
*/
  isPopupVisible = false;

  showPopup(event: any) {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }
  confirmUput() {
    //za slanje uputa

  }
  ngOnInit(): void {
  }


}
