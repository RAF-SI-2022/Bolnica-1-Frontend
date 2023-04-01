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

    ngOnInit(): void {}

    showPopup(event: any): void {
        this.isPopupVisible = true;
    }

    hidePopup(): void {
        this.isPopupVisible = false;
    }

    confirmUput(): void {
        //za slanje uputa
    }
}
