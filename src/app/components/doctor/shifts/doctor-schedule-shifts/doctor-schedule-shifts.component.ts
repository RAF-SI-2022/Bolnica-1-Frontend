import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PatientService} from "../../../../services/patient-service/patient.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {UserService} from "../../../../services/user-service/user.service";
import {ExaminationService} from "../../../../services/examination-service/examination.service";
import {AuthService} from "../../../../services/auth.service";
import {DoctorDepartmentDto} from "../../../../models/DoctorDepartmentDto";
import {ShiftDto} from "../../../../models/shifts/ShiftDto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalizationDto} from "../../../../models/infirmary/HospitalizationDto";
import {Page} from "../../../../models/models";
import {ShiftScheduleDto} from "../../../../models/shifts/ShiftScheduleDto";

@Component({
  selector: 'app-doctor-schedule-shifts',
  templateUrl: './doctor-schedule-shifts.component.html',
  styleUrls: ['./doctor-schedule-shifts.component.css']
})
export class DoctorScheduleShiftsComponent implements OnInit{

  shiftScheduleDtoList: ShiftScheduleDto[] = [];
  shiftScheduleDtoPage: Page<ShiftScheduleDto> = new Page<ShiftScheduleDto>();

  size: number = 5;
  page: number = 0;
  total: number = 0;

  formSearch: FormGroup;

  form: FormGroup;
  formNurse: FormGroup;

  lbz: string = '';
  pbo: string = '';
  doctors: DoctorDepartmentDto[] = [];
  nurses: DoctorDepartmentDto[] = [];
  employees: DoctorDepartmentDto[] = [];
  shifts: ShiftDto[] = [];

  selectedDoctor: string = '';

  //ShiftScheduleDto

  constructor(private patientService: PatientService,
              private snackBar: SnackbarServiceService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private examinationService: ExaminationService,
              private authService: AuthService,
              private changeDetectorRef: ChangeDetectorRef,) {

    const now = new Date();

    this.form = this.formBuilder.group({
      lbz: ['', [Validators.required]],
      shiftId: [0, [Validators.required]],
      date: [now.toISOString().slice(0,10), [Validators.required]]
    });

    this.formNurse = this.formBuilder.group({
      lbzNurse: ['', [Validators.required]],
      shiftIdNurse: [0, [Validators.required]],
      dateNurse: [now.toISOString().slice(0,10), [Validators.required]]
    });


    this.formSearch = this.formBuilder.group({
      doctorLbz: ['', [Validators.required]],
      startDate: [now.toISOString().slice(0,10), [Validators.required]],
      endDate: [now.toISOString().slice(0,10), [Validators.required]]
    });

  }


  ngOnInit(): void {
    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ').toString()
    this.pbo = this.authService.getPBO();
    this.getDoctors();
    this.getNurses();
    this.getShifts();
    this.searchShifts();
    this.combineEmployees();

  }

  getDoctors(): void {
    this.examinationService.getDoctorsByDepartment(this.pbo).subscribe(res => {
      this.doctors = res
      console.log(this.doctors)
    })
  }

  getNurses(): void {
    this.examinationService.getNursesByDepartment(this.pbo).subscribe(res => {
      this.nurses = res
      console.log(this.nurses)
    })
  }

  combineEmployees(): void {
    this.employees = this.doctors.concat(this.nurses);
  }

  getShifts() {
    // Call your service to get all shifts
    this.userService.getAllShift().subscribe(res => {
      this.shifts = res.shifts;
    });
  }

  addShiftToDoctor(){
    const shift = this.form.value;
    console.log(shift.lbz)
    this.addShiftScheduleDoctor(shift.lbz, shift.shiftId, shift.date)
  }

  addShiftToNurse(){
    const shift = this.formNurse.value;
    console.log(shift.lbz)
    this.addShiftScheduleNurse(shift.lbzNurse, shift.shiftIdNurse, shift.dateNurse)
  }

  addShiftScheduleDoctor(lbz: string, shiftId: number, date: Date) {

    this.userService.addShiftSchedule(lbz, shiftId, date)
      .subscribe(res => {
        this.form.reset();
        this.selectedDoctor = '';
        this.snackBar.openSuccessSnackBar("Uspesno sacuvano!")
      }, error => {
        console.log("Error " + error.status);
        this.snackBar.openErrorSnackBar("Nije sacuvano!")

      });
  }

  addShiftScheduleNurse(lbz: string, shiftId: number, date: Date) {

    this.userService.addShiftSchedule(lbz, shiftId, date)
      .subscribe(res => {
        console.log("uspeo")
        this.formNurse.reset();
        this.snackBar.openSuccessSnackBar("Uspesno sacuvano!")
      }, error => {
        console.log("Error " + error.status);
        this.snackBar.openErrorSnackBar("Nije sacuvano!")

      });
  }

  removeShiftSchedule(id: number) {
    this.userService.removeShiftSchedule(id)
      .subscribe(res => {
        console.log("uspeo")

        this.snackBar.openSuccessSnackBar("Uspesno uklonjeno!")
      }, error => {
        console.log("Error " + error.status);
        this.snackBar.openErrorSnackBar("Nije uklonjeno!")

      });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.searchShifts();
  }


  searchShifts(): void {

    if (this.page == 0)
      this.page = 1;

    const sendData = this.formSearch.value;

    if(sendData.lbp != '') {
      this.userService.getShiftSchedule(sendData.doctorLbz, sendData.startDate,
        sendData.endDate, this.page, this.size).subscribe(res=>{
          this.shiftScheduleDtoPage= res
          this.shiftScheduleDtoList = this.shiftScheduleDtoPage.content
          this.total = this.shiftScheduleDtoPage.totalElements
          this.changeDetectorRef.detectChanges();
          if(this.shiftScheduleDtoList.length == 0){
            this.snackBar.openWarningSnackBar("Nema smena")
          }
      })
    }else{
      this.userService.getAllShiftSchedule( sendData.startDate,
        sendData.endDate, this.page, this.size).subscribe(res=>{
        this.shiftScheduleDtoPage= res
        this.shiftScheduleDtoList = this.shiftScheduleDtoPage.content
        this.total = this.shiftScheduleDtoPage.totalElements
        this.changeDetectorRef.detectChanges();
        if(this.shiftScheduleDtoList.length == 0){
          this.snackBar.openWarningSnackBar("Nema smena")
        }
      })
    }


  }




}
