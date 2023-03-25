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
/*
 ...
  // Add Event Form
  addEventForm: FormGroup;
  submitted = false;
  //Add user form actions
  get f() { return this.addEventForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid and reset the validations
    this.addEventForm.get('title').setValidators([Validators.required]);
    this.addEventForm.get('title').updateValueAndValidity();
    if (this.addEventForm.invalid) {
      return;
    }
  }

  constructor(private formBuilder: FormBuilder){}
  title = 'angularadmintemplates';
  calendarOptions: CalendarOptions;
  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: [
        { title: 'event 1', date: '2020-11-05' },
        { title: 'event 2', date: '2020-06-30' }
      ]
    };

    //Add User form validations
    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required]]
    });

  }

//Show Modal with Forn on dayClick Event
  handleDateClick(arg) {
    $("#myModal").modal("show");
    $(".modal-title, .eventstarttitle").text("");
    $(".modal-title").text("Add Event at : "+arg.dateStr);
    $(".eventstarttitle").text(arg.dateStr);


  }

//Hide Modal PopUp and clear the form validations
  hideForm(){
    this.addEventForm.patchValue({ title : ""});
    this.addEventForm.get('title').clearValidators();
    this.addEventForm.get('title').updateValueAndValidity();
  }
 */
  
  ngOnInit(): void {
  }


}
