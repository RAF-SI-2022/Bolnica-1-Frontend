import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ActionEventArgs,
  EventSettingsModel,
  PopupOpenEventArgs,
  ScheduleComponent,
  View
} from '@syncfusion/ej2-angular-schedule';
import{L10n} from "@syncfusion/ej2-base";
import {NgxPaginationModule} from "ngx-pagination";
import {PatientService} from "../../../services/patient-service/patient.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service/user.service";
import {ExaminationService} from "../../../services/examination-service/examination.service";


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

  @ViewChild('scheduleObj', { static: false }) scheduleObj: ScheduleComponent | undefined;

  public setView: View= 'Month';

  // public eventData: EventSettingsModel = {
  //
  //   dataSource: [{
  //
  //     Id: 1,
  //
  //     Subject: 'Board Meeting',
  //
  //     StartTime: new Date(2023, 4, 2, 15, 0),
  //
  //     EndTime: new Date(2023, 4, 2, 15, 30)
  //
  //   },
  //
  //     {
  //
  //       Id: 2,
  //
  //       Subject: 'Training session on JSP',
  //
  //       StartTime: new Date(2023, 4, 3, 9, 0),
  //
  //       EndTime: new Date(2023, 4, 3, 9, 30)
  //
  //     },
  //
  //     {
  //
  //       Id: 3,
  //
  //       Subject: 'Sprint Planning with Team members',
  //
  //       StartTime: new Date(2023, 4, 4, 10, 0),
  //
  //       EndTime: new Date(2023, 4, 4, 11, 0)
  //
  //     }]
  //
  // }

  public eventSettings: EventSettingsModel = {
    dataSource: [],
    fields: {
      id: 'Id',
      subject: {
        name: 'Subject',
        validation: { required: true }
      },
      startTime: {
        name: 'StartTime',
        validation: { required: true }
      },
      endTime: {
        name: 'EndTime',
        validation: { required: true }
      }
    }
  };

  subject: string = '';
  reason: string = '';
  patient: string = '';
  doctor: string = '';
  selectedDateTime: Date = new Date();
  lbz: string = '';

  constructor(private patientService: PatientService, private userService: UserService, private examinationService: ExaminationService) {

  }

  ngOnInit(): void {
    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ').toString()
    this.addEventsData();
  }


  public addEventsData(): void {

    let events: Record<string, any>[] = [
      { Id: 1,
        Subject: 'a',
        StartTime: new Date(2023, 4, 4, 9, 0),
        EndTime: new Date(2023, 4, 4, 9, 30) },
      { Id: 2,
        Subject: 'b',
        StartTime: new Date(2023, 4, 5, 15, 0),
        EndTime: new Date(2023, 4, 5, 15, 30) },
      { Id: 3,
        Subject: 'c',
        StartTime: new Date(2023, 4, 6, 9, 30),
        EndTime: new Date(2023, 4, 6, 10, 0) },
      { Id: 4,
        Subject: 'd',
        StartTime: new Date(2023, 4, 7, 11, 0),
        EndTime: new Date(2023, 4, 7, 13, 0) }
    ];

    this.eventSettings.dataSource = events;

    this.eventSettings.dataSource.forEach(event => {
      // this.scheduleObj?.appendTo('#schedule');
      this.scheduleObj?.addEvent(event);
      this.scheduleObj?.refresh();
      console.log(event)
    });

    this.examinationService.getScheduledExaminations(
      this.lbz, new Date()
    ).subscribe( res =>{
      this.eventSettings.dataSource = res;
    });

  }




  public onSave(): void {

    const eventData = {
      Id: (<Record<string, any>>this.eventSettings.dataSource)['length'] + 1,
      Subject: this.subject,
      StartTime: this.selectedDateTime,
      EndTime: new Date(this.selectedDateTime.getTime() + (30 * 60 * 1000)),
      Reason: this.reason,
      Patient: this.patient
    };

    // console.log(eventData.StartTime)
    // console.log(eventData.EndTime)
    // console.log(eventData.Id)

    this.scheduleObj?.addEvent(eventData);
    this.scheduleObj?.refresh();
    this.scheduleObj?.closeEditor();

  }

  public onCancel(): void {
    this.scheduleObj?.closeEditor();
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {

    if (args.type === 'Editor') {
      console.log("jeste editor")

      // const moreDetailsBtn: HTMLElement = args.element.querySelector('.e-more-details') as HTMLElement;
      // if (moreDetailsBtn) {
      //   moreDetailsBtn.click();
      //   args.cancel = true;
      // }
    }
  }


}
