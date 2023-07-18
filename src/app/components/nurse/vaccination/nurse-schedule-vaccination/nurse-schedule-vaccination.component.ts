import {Component, OnInit, ViewChild} from '@angular/core';
import {
  CellClickEventArgs,
  EventClickArgs,
  EventSettingsModel,
  PopupOpenEventArgs,
  ScheduleComponent,
  View
} from '@syncfusion/ej2-angular-schedule';
import {L10n} from "@syncfusion/ej2-base";
import {Patient} from "../../../../models/patient/Patient";
import {ScheduleExam} from "../../../../models/patient/ScheduleExam";
import {Page} from "../../../../models/models";
import {PatientService} from "../../../../services/patient-service/patient.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {UserService} from "../../../../services/user-service/user.service";
import {ExaminationService} from "../../../../services/examination-service/examination.service";
import {AuthService} from "../../../../services/auth.service";
import {PatientArrival} from "../../../../models/laboratory-enums/PatientArrival";
import * as moment from 'moment';
import {Vaccination} from "../../../../models/patient/Vaccination";
import {ScheduledVaccinationDto} from "../../../../models/vaccination/ScheduledVaccinationDto";

L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Sacuvaj',
      'cancelButton': 'Otkazi',
      'deleteButton': 'Remove',
      'newEvent': 'Vakcinacija',
    }
  }
});
@Component({
  selector: 'app-nurse-schedule-vaccination',
  templateUrl: './nurse-schedule-vaccination.component.html',
  styleUrls: ['./nurse-schedule-vaccination.component.css']
})
export class NurseScheduleVaccinationComponent implements OnInit {

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

  subject: string = '';
  note: string = '';
  patient: string = '';
  vaccine: string = '';

  selectedDateTime: Date = new Date();
  lbz: string = '';
  lbp: string = '';

  patientList: Patient[] = []
  nurseDepartmentPbo: string = '';
  responseExams: ScheduleExam[] = [];

  scheduledVaccinationList: ScheduledVaccinationDto[] = [];
  scheduledVaccinationDtoPage: Page<ScheduledVaccinationDto> = new Page<ScheduledVaccinationDto>();


  page = 0
  size = 999999 //infinity
  total = 0
  patientPage: Page<Patient> = new Page<Patient>()

  editMenu: boolean = false;
  firstTimeErrorCheck = true;

  covidBoolean: boolean = false;

  vaccines: Vaccination[] = []

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
    this.checkCovid();
    this.getPatientList();
    this.getVaccine();

  }


  getPatientList() {
    this.patientService.getAllPatients("", "", "", "",
      this.page, this.size).subscribe((response) => {
      this.patientPage = response
      this.patientList = this.patientPage.content
      this.total = this.patientPage.totalElements
    })
  }

  getVaccine(): void {
    this.patientService.getVaccine(this.covidBoolean).subscribe(result => {
      this.vaccines = result;
      console.log(this.vaccines)
    }, err => { });
  }

  checkCovid() {
    let lbz = localStorage.getItem('LBZ');
    this.userService.findDepartmentByLbz(lbz!).subscribe(
      res => {
        this.userService.getDepartmentDto(res).subscribe(
          res2 =>{
            if(res2.name == "Covid"){
              this.covidBoolean = true;
            }else{
              this.covidBoolean = false;
            }
          }
        );
      }
    );
  }


  public addEventsData(): void {


    this.patientService.findScheduledVaccinationsWithFilter(
      this.page,
      this.size,
      new Date(),
      new Date(),
      '-1',
      this.lbz,
      this.covidBoolean,
      'SVEJEDNO'

    ).subscribe(res=>{

      this.scheduleObj?.deleteEvent(this.scheduleObj?.eventsData)

      this.scheduledVaccinationDtoPage = res;
      this.scheduledVaccinationList = this.scheduledVaccinationDtoPage.content;
      this.total = this.scheduledVaccinationDtoPage.totalElements
      if (this.scheduledVaccinationList.length == 0) {
        this.snackBar.openWarningSnackBar("Nema zakazanih vakcinacija")
      }


      this.scheduledVaccinationList.forEach(event => {
        console.log("Evo za " + event.dateAndTime + " " + event.patient.lbp)
        // this.scheduleObj?.appendTo('#schedule');
        if (event.arrivalStatus.toString() !== 'OTKAZANO') {


          console.log("arrival " + event.dateAndTime)
          console.log("enum " + PatientArrival.OTKAZANO.valueOf())


          const eventData = {
            Id: (<Record<string, any>>this.eventSettings.dataSource)['length'] + 1,
            Subject: event.patient.lbp,
            StartTime: event.dateAndTime,
            EndTime: moment(event.dateAndTime).add(15, 'minutes').toDate(),
            Patient: event.patient,
            Vaccination: event.vaccination,
            ExamId: event.id
          };

          this.scheduleObj?.addEvent(eventData);
          this.scheduleObj?.refresh();
          console.log(event)

        }
      });

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
      EndTime: new Date(this.selectedDateTime.getTime() + (15 * 60 * 1000)),
      Note: this.note,
      Patient: this.patient,
      Vaccination: this.vaccine
    };

    console.log("selektovan datum je " + this.selectedDateTime + " " + eventData.StartTime)

    this.patientService.scheduleVaccination(this.selectedDateTime,
      "", this.lbz, this.vaccine, this.patient).subscribe(res => {
      console.log(res)
      // this.scheduleObj?.addEvent(eventData);
      //  this.scheduleObj?.refresh();

      this.scheduleObj?.closeEditor();
      this.snackBar.openSuccessSnackBar("Uspesno!")
      this.addEventsData()

    }, err => {
      this.snackBar.openErrorSnackBar("Greska!")
    })

    console.log(eventData.StartTime)
    console.log(eventData.EndTime)
    console.log(eventData.Id)


  }

  public onCancel(): void {
    this.scheduleObj?.closeEditor();
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
      args.cancel = true;

      if(this.selectedDateTime < new Date()){
        this.snackBar.openWarningSnackBar("Izaberite skoriji datum i vreme")
        return;
      }
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

    this.patientService.updateScheduledVaccination(id, PatientArrival.OTKAZANO).subscribe(
      res => {
        this.addEventsData();
        this.snackBar.openSuccessSnackBar("Uspesno obrisana vakcinacija!")
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

}
