import {Component, OnInit} from '@angular/core';

import {View} from '@syncfusion/ej2-angular-schedule';
import{L10n} from "@syncfusion/ej2-base";
import {NgxPaginationModule} from "ngx-pagination";

L10n.load({
  'en-US':{
    'schedule':{
      'saveButton' :'Sacuvaj',
      'cancelButton':'Otkazi',
      'deleteButton':'Remove',
      'newEvent':'Dodaj pregled',
    }
  }
});

@Component({
  selector: 'app-nurse-schedule-appointment',
  //template: '<ejs-schedule height="700" width="1200" [currentView]="setView"></ejs-schedule>',
  templateUrl: './nurse-schedule-appointment.component.html',
  styleUrls: ['./nurse-schedule-appointment.component.css']
})
export class NurseScheduleAppointmentComponent implements OnInit{

  public setView: View= 'Month';

  ngOnInit(): void {
  }


}
