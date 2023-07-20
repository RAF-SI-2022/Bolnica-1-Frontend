import {Component, OnInit} from '@angular/core';
import {ShiftScheduleDto} from "../../../models/shifts/ShiftScheduleDto";
import {Page} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShiftDto} from "../../../models/shifts/ShiftDto";
import {PatientService} from "../../../services/patient-service/patient.service";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'app-technician-my-shifts',
  templateUrl: './technician-my-shifts.component.html',
  styleUrls: ['./technician-my-shifts.component.css']
})
export class TechnicianMyShiftsComponent implements OnInit{

  shiftScheduleDtoList: ShiftScheduleDto[] = [];
  shiftScheduleDtoPage: Page<ShiftScheduleDto> = new Page<ShiftScheduleDto>();

  size: number = 5;
  page: number = 0;
  total: number = 0;

  formSearch: FormGroup;
  lbz: string = '';
  shifts: ShiftDto[] = [];


  constructor(private patientService: PatientService,
              private snackBar: SnackbarServiceService,
              private userService: UserService,
              private formBuilder: FormBuilder) {

    const now = new Date();
    const sevenDaysLater = new Date(now);
    sevenDaysLater.setDate(now.getDate() + 7);

    this.formSearch = this.formBuilder.group({
      startDate: [now.toISOString().slice(0,10), [Validators.required]],
      endDate: [sevenDaysLater.toISOString().slice(0,10), [Validators.required]]
    });

  }

  ngOnInit(): void {
    // @ts-ignore
    this.lbz = localStorage.getItem('LBZ').toString()
    this.searchShifts();
    this.getShifts();
  }

  getShifts() {
    // Call your service to get all shifts
    this.userService.getAllShift().subscribe(res => {
      this.shifts = res.shifts;
    });
  }


  searchShifts(): void {

    if (this.page == 0)
      this.page = 1;

    const sendData = this.formSearch.value;


    this.userService.getShiftSchedule(this.lbz, sendData.startDate,
      sendData.endDate, this.page-1, this.size).subscribe(res=>{
      this.shiftScheduleDtoPage= res
      this.shiftScheduleDtoList = this.shiftScheduleDtoPage.content
      this.total = this.shiftScheduleDtoPage.totalElements
      if(this.shiftScheduleDtoList.length == 0){
        this.snackBar.openWarningSnackBar("Nema smena")
      }
    })

  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.searchShifts();
  }

}
