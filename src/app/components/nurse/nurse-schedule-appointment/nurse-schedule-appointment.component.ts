import {Component, OnInit} from '@angular/core';

//import {View} from '@syncfusion/ej2-angular-schedule';
import {NgxPaginationModule} from "ngx-pagination";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let $: any;
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-nurse-schedule-appointment',
  //template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './nurse-schedule-appointment.component.html',
  styleUrls: ['./nurse-schedule-appointment.component.css']
})
export class NurseScheduleAppointmentComponent implements OnInit{

  calendarOptions: CalendarOptions ={
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    //dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2020-11-05' },
      { title: 'event 2', date: '2020-06-30' }
    ]
  };

  /*
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
*/

  //public setView: View = 'Month';



  ngOnInit(): void {
  }


}
