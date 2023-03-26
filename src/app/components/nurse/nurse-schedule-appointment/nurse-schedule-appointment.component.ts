import {Component, OnInit} from '@angular/core';

import {View} from '@syncfusion/ej2-angular-schedule';
import {NgxPaginationModule} from "ngx-pagination";
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
