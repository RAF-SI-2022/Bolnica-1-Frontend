import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-doctor-workspace',
  templateUrl: './doctor-workspace.component.html',
  styleUrls: ['./doctor-workspace.component.css']
})
export class DoctorWorkspaceComponent implements OnInit {
  isPopupVisible = false;
  selectedPerson: any;

  onTableRowClicked(event: any) {
    if (event.target.tagName === 'TD') {
      this.selectedPerson = event.target.parentElement.cells[0].textContent;
      this.isPopupVisible = true;
    }
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  confirmPregled() {
    //otvori stranicu /doctor-workspace-one-patient
    //za selektovanog pacijenta
  }


  ngOnInit(): void {
  }


}
