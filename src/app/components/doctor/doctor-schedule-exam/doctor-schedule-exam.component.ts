import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {AuthService} from "../../../services/auth.service";
import {ExaminationService} from "../../../services/examination-service/examination.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {UserService} from "../../../services/user-service/user.service";
import {L10n} from "@syncfusion/ej2-base";
import {
  CellClickEventArgs, EventClickArgs,
  EventSettingsModel,
  PopupOpenEventArgs,
  ScheduleComponent,
  View
} from "@syncfusion/ej2-angular-schedule";
import {DoctorDepartmentDto} from "../../../models/DoctorDepartmentDto";
import {Patient} from "../../../models/patient/Patient";
import {ScheduleExam} from "../../../models/patient/ScheduleExam";
import {DeparmentShort, Page} from "../../../models/models";
import {PatientArrival} from "../../../models/laboratory-enums/PatientArrival";
import * as moment from "moment";
import {ExamPatientDoctorDto} from "../../../models/ExamPatientDoctorDto";
import {ExamForPatientDto} from "../../../models/ExamForPatientDto";
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
  selector: 'app-doctor-schedule-exam',
  templateUrl: './doctor-schedule-exam.component.html',
  styleUrls: ['./doctor-schedule-exam.component.css']
})
export class DoctorScheduleExamComponent implements OnInit {

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
  selectedDoctor: string = '';
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

  patientLbp: string = 'lbp neki'
  // lbz: string = ''
  pbo: string = '';

  departments: DeparmentShort[] = [];

  selectedDepartment: string = '';

  departmentSelectedBoolean: boolean = false;

  examsForLbp: ExamForPatientDto[] = [];

  shiftScheduleDtoList: ShiftScheduleDto[] = [];
  shiftScheduleDtoPage: Page<ShiftScheduleDto> = new Page<ShiftScheduleDto>();

  sizeShift: number = 99999;
  pageShift: number = 0;
  totalShift: number = 0;

  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackbarServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private infirmaryService: InfirmaryService,
              private examinationService: ExaminationService,
              private patientService: PatientService,
              private userService: UserService,
              private authService: AuthService) {


  }

  ngOnInit(): void {
    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.lbz = this.authService.getLBZ();
    this.pbo = this.authService.getPBO();

    console.log("lbp:"+ this.patientLbp + " lbz:" + this.lbz + " pbo:"+ this.pbo);

    this.updateData();

  }

  gotoone(): void {
    const url = `/doctor-workspace-one/${this.lbp}`;
    this.router.navigateByUrl(url);
  }

  updateData(){
    this.getExamsByLbp();
    this.addEventsData();
    // this.getPatientList();
    this.getDepartments();
    // this.getNurseDepartment();
  }

  getExamsByLbp(): void{
    this.examinationService.getExamsByLbp(this.patientLbp).subscribe(
      res=>{
        this.examsForLbp = res.exams
        // Sort the exams by examDate in ascending order
        this.examsForLbp.sort((a, b) => a.examDate.getTime() - b.examDate.getTime());

      }
    )
  }


  // TODO get doctors with selected pbo

  // getNurseDepartment(): void {
  //
  //   this.userService.getEmployee(this.lbz).subscribe(res => { },
  //     err => {
  //       if (err.status == 302) { // found!
  //         this.nurseDepartmentPbo = err.error.department.pbo;
  //         console.log("department " + this.nurseDepartmentPbo)
  //
  //         this.getDoctors()
  //       }
  //     })
  // }

  getDoctors(): void {
    this.examinationService.getDoctorsByDepartment(this.selectedDepartment).subscribe(res => {
      this.doctors = res
      console.log(this.doctors)
      this.departmentSelectedBoolean = true
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
      this.doctorSearched = true;
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
      Subject: this.patientLbp,
      StartTime: this.selectedDateTime,
      EndTime: new Date(this.selectedDateTime.getTime() + (30 * 60 * 1000)),
      Note: this.note,
      Patient: this.patient
    };

    console.log("selektovan datum je " + this.selectedDateTime + " " + eventData.StartTime)

    this.examinationService.createExamination(this.selectedDateTime, this.selectedDoctor, this.patientLbp, this.note).subscribe(res => {
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
        timeString).subscribe(res=> {
          let working = res
          if (!working) {
            this.snackBar.openErrorSnackBar("Doktor ne radi u ovoj smeni!")
            return;
          } else {

            let data = args.data as { [key: string]: Object };
            if (!this.updateEJSView()) {
              this.scheduleObj?.openEditor(data, 'Add');
              this.editMenu = false;
            } else {
              this.scheduleObj?.openEditor(this.eventsOnCellClick[0], 'Add');
              this.editMenu = true;
            }
          }
        }
        )
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




  getDepartments(): void {
    this.userService.getDepartments().subscribe(res => {
      this.departments = res;
    });
  }

  onDepartmentSelected(event: any) {
    this.selectedDepartment = event.target.value; // Update the selectedDepartment property with the new value
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
