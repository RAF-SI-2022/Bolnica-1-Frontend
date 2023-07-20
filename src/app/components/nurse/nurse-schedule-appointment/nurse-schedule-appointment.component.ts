import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, CellClickEventArgs, EventClickArgs, EventSettingsModel, PopupOpenEventArgs, ScheduleComponent, View } from '@syncfusion/ej2-angular-schedule';
import { L10n } from "@syncfusion/ej2-base";
import { PatientService } from "../../../services/patient-service/patient.service";
import { UserService } from "../../../services/user-service/user.service";
import { ExaminationService } from "../../../services/examination-service/examination.service";
import { Patient } from "../../../models/patient/Patient";
import { Page } from "../../../models/models";
import { DoctorDepartmentDto } from "../../../models/DoctorDepartmentDto";
import { ScheduleExam } from "../../../models/patient/ScheduleExam";
import * as moment from 'moment';
import { PatientArrival } from "../../../models/laboratory-enums/PatientArrival";
import { event } from 'cypress/types/jquery';
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { first, update } from 'cypress/types/lodash';
import { interval } from 'rxjs';
import {AuthService} from "../../../services/auth.service";
import {ShiftScheduleDto} from "../../../models/shifts/ShiftScheduleDto";


L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Sacuvaj',
      'cancelButton': 'Otkazi',
      'deleteButton': 'Remove',
      'newEvent': 'Pregled',
    }
  }
});

@Component({
  selector: 'app-nurse-schedule-appointment',
  //template: '<ejs-schedule height="700" width="1200" [currentView]="setView"></ejs-schedule>',
  templateUrl: './nurse-schedule-appointment.component.html',
  styleUrls: ['./nurse-schedule-appointment.component.css']
})
export class NurseScheduleAppointmentComponent implements OnInit {

  @ViewChild('scheduleObj', { static: false }) scheduleObj: ScheduleComponent | undefined;

  public setView: View = 'Month';

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

  shiftScheduleDtoList: ShiftScheduleDto[] = [];
  shiftScheduleDtoPage: Page<ShiftScheduleDto> = new Page<ShiftScheduleDto>();

  sizeShift: number = 99999;
  pageShift: number = 0;
  totalShift: number = 0;

  subject: string = '';
  note: string = '';
  patient: string = '';
  selectedDoctor: string = '';

  selectedDoctorBoolean: boolean = false;

  selectedDateTime: Date = new Date();
  lbz: string = '';
  lbp: string = '';
  doctors: DoctorDepartmentDto[] = [];
  patientList: Patient[] = []
  nurseDepartmentPbo: string = '';
  responseExams: ScheduleExam[] = [];

  page = 0
  pageSize = 999999 //infinity
  total = 0
  patientPage: Page<Patient> = new Page<Patient>()

  editMenu: boolean = false;
  firstTimeErrorCheck = true;
  constructor(private patientService: PatientService,
              private snackBar: SnackbarServiceService,
              private userService: UserService,
              private examinationService: ExaminationService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ').toString()
    this.nurseDepartmentPbo = this.authService.getPBO();
    //nterval(5000).subscribe(() => {
      this.updateData();
//    });
  }

  updateData(){
    this.addEventsData();
    this.getPatientList();
    this.getNurseDepartment();
  }
  getNurseDepartment(): void {

    // this.userService.getEmployee(this.lbz).subscribe(res => { },
    //   err => {
    //     if (err.status == 302) { // found!
    //       this.nurseDepartmentPbo = err.error.department.pbo;
    //       console.log("department " + this.nurseDepartmentPbo)
    //
    //       this.getDoctors()
    //     }
    //   })

    this.getDoctors();
  }

  getDoctors(): void {
    this.examinationService.getDoctorsByDepartment(this.nurseDepartmentPbo).subscribe(res => {
      this.doctors = res
      console.log(this.doctors)
    })
  }

  getPatientList() {
    this.patientService.getAllPatients("", "", "", "", this.page, this.pageSize).subscribe((response) => {
      this.patientPage = response
      this.patientList = this.patientPage.content
      this.total = this.patientPage.totalElements
    })
  }




  public addEventsData(): void {

    this.shiftScheduleDtoList = []

    const today = new Date();
    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

    this.userService.getShiftScheduleCalendar(this.selectedDoctor, today,
      sevenDaysLater, this.pageShift, this.sizeShift).subscribe(res=>{
      this.shiftScheduleDtoPage= res
      this.shiftScheduleDtoList = this.shiftScheduleDtoPage.content
      this.total = this.shiftScheduleDtoPage.totalElements
      if(this.shiftScheduleDtoList.length == 0){
        this.snackBar.openWarningSnackBar("Nema smena")
      }
    })


    this.examinationService.getScheduledExaminationByDoctor(
      this.selectedDoctor
    ).subscribe(res => {

      this.scheduleObj?.deleteEvent(this.scheduleObj?.eventsData)
      this.responseExams = res;
      console.log("DOBIO SAM " + res.length)

      if(this.responseExams.length == 0){
        this.snackBar.openWarningSnackBar("Nema zakazanih pregleda")
      }
      this.responseExams.forEach(event => {
        console.log("Evo za " + event.dateAndTime + " " + event.lbp)
        // this.scheduleObj?.appendTo('#schedule');
        if (event.patientArrival.toString() !== 'OTKAZANO') {


          console.log("arrival " + event.dateAndTime)
          console.log("enum " + PatientArrival.OTKAZANO.valueOf())


          const eventData = {
            Id: (<Record<string, any>>this.eventSettings.dataSource)['length'] + 1,
            Subject: event.lbp,
            StartTime: event.dateAndTime,
            EndTime: moment(event.dateAndTime).add(30, 'minutes').toDate(),
            Note: this.note,
            Patient: event.lbp,
            ExamId: event.id
          };

          console.log("ODODA sam " + this.note)
          this.scheduleObj?.addEvent(eventData);
          this.scheduleObj?.refresh();
          console.log(event)

        }
      });
      this.doctorSearched = true;

    }, err => {
      if(!this.firstTimeErrorCheck){
        this.snackBar.openErrorSnackBar("Greska!")
      }
      this.firstTimeErrorCheck = false;
    });

  }


  public onSave(): void {
    const eventData = {
      Id: (<Record<string, any>>this.eventSettings.dataSource)['length'] + 1,
      Subject: this.lbp,
      StartTime: this.selectedDateTime,
      EndTime: new Date(this.selectedDateTime.getTime() + (30 * 60 * 1000)),
      Note: this.note,
      Patient: this.patient
    };

    console.log("selektovan datum je " + this.selectedDateTime + " " + eventData.StartTime)

    this.examinationService.createExamination(this.selectedDateTime, this.selectedDoctor, this.patient, this.note).subscribe(res => {
      console.log(res)
      // this.scheduleObj?.addEvent(eventData);
      //  this.scheduleObj?.refresh();

      this.scheduleObj?.closeEditor();
      this.snackBar.openSuccessSnackBar("Uspesno!")
      this.addEventsData()

    }, err => {
      this.snackBar.openErrorSnackBar("Greska!")
    })

    // console.log(eventData.StartTime)
    // console.log(eventData.EndTime)
    // console.log(eventData.Id)


  }

  public onCancel(): void {
    this.scheduleObj?.closeEditor();
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
      args.cancel = true;
      if(this.selectedDoctor.length == 0 || !this.doctorSearched){
        this.snackBar.openWarningSnackBar("Izaberite doktora")
        return;
      }
      if(this.selectedDateTime < new Date()){
        this.snackBar.openWarningSnackBar("Izaberite skoriji datum i vreme")
        return;
      }

      const timeString = this.getTimeAsString(this.selectedDateTime);
      console.log("timeString+"+timeString)

      this.userService.isWorking(this.selectedDoctor, this.selectedDateTime,
        timeString).subscribe(res=>{
          let working = res
          if (!working){
            this.snackBar.openErrorSnackBar("Doktor ne radi u ovoj smeni!")
            return;
          } else{

            let data = args.data as { [key: string]: Object };
            if (!this.updateEJSView()) {
              this.scheduleObj?.openEditor(data, 'Add');
              this.editMenu = false;
            }
            else {
              this.scheduleObj?.openEditor(this.eventsOnCellClick[0], 'Add');
              this.editMenu = true;
            }



          }

      })


    }
    if (args.type === 'Editor') {
      setTimeout(() => {
        const saveButton = args.element.querySelector('.e-event-save') as HTMLElement;
        const cancelButton = args.element.querySelector('.e-event-cancel') as HTMLElement;

        if (saveButton) {
          saveButton.style.display = 'none';
        }
        if (cancelButton) {
          cancelButton.style.display = 'none';
        }
      });

    }
  }
  eventsOnCellClick: Record<string, any>[] = [];
  onCellClick(args: CellClickEventArgs): void {
    this.selectedDateTime = args.startTime;
    this.eventsOnCellClick = this.scheduleObj!.getEvents(args.startTime, args.endTime);
  }

  updateEJSView(): boolean {
    if (this.eventsOnCellClick.length == 0) {
      return false;
    } else {
      const eventData = this.eventsOnCellClick[0];
      this.patient = eventData['Patient']
      this.note = eventData['Note']
      this.selectedDateTime = eventData['StartTime']
      return true;
    }

  }
  onDelete(): void {

    const eventData = this.eventsOnCellClick[0];
    const id = eventData['ExamId']
    console.log("id za brisanje " + id);

    this.examinationService.deleteExamination(id).subscribe(
      res => {
        this.addEventsData();
        this.snackBar.openSuccessSnackBar("Uspesno obrisan pregled!")
      },
      err => {
        this.snackBar.openErrorSnackBar("Greska prilikom brisanja!")
      }
    );

  }

  public onEventClick(args: EventClickArgs): void {
    this.eventsOnCellClick[0] = args.event
    this.editMenu = true;
  }

  doctorSearched = false;
  doctorChange(){
    this.doctorSearched = false;
  }

  getTimeAsString(date: Date): string {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
