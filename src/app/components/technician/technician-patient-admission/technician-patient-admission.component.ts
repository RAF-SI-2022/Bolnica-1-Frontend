import { Component, OnInit } from '@angular/core';
import { Page } from "../../../models/models";
import { ScheduledLabExamination } from "../../../models/laboratory/ScheduledLabExamination";
import { LaboratoryService } from "../../../services/laboratory-service/laboratory.service";
import { UserService } from "../../../services/user-service/user.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ExaminationStatus } from "../../../models/laboratory-enums/ExaminationStatus";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';

@Component({
  selector: 'app-technician-patient-admission',
  templateUrl: './technician-patient-admission.component.html',
  styleUrls: ['./technician-patient-admission.component.css']
})


export class TechnicianPatientAdmissionComponent implements OnInit {

  searchForm: FormGroup;
  scheduledLabExaminationPage: Page<ScheduledLabExamination> = new Page<ScheduledLabExamination>();
  scheduledLabExaminationList: ScheduledLabExamination[] = [];
  page = 0;
  PAGE_SIZE = 5
  total = 0;
  lbp = '';
  rolaVisiLabTeh = false;
  rolaLabTeh = false;

  constructor(private laboratoryService: LaboratoryService, private userService: UserService, private snackBar: SnackbarServiceService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      lbp: '',
    });
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.laboratoryService.listScheduledEexaminations(this.page, this.PAGE_SIZE)
      .subscribe((response) => {
        //console.log("RESPONSEEE " + response.content)
        this.scheduledLabExaminationPage = response
        this.scheduledLabExaminationList = this.scheduledLabExaminationPage.content
        this.total = this.scheduledLabExaminationPage.totalElements
      })
  }

  getListScheduledEexaminations(): void {
    if (this.page == 0)
      this.page = 1;

    this.laboratoryService.listScheduledExaminationsByLbp(this.lbp, new Date(), this.page - 1, this.PAGE_SIZE).subscribe((response) => {
      this.scheduledLabExaminationPage = response
      this.scheduledLabExaminationList = this.scheduledLabExaminationPage.content
      this.total = this.scheduledLabExaminationPage.totalElements
    });
  }
  cancellation(id: number) {

    this.laboratoryService.changeExaminationStatus(id, ExaminationStatus.OTKAZANO).
      subscribe((response) => {
        this.getAll()
        alert("Uspesno otkazano")
        this.snackBar.openSuccessSnackBar("Uspesno otkazano!")
      });
  }

  registerPatient(lbp: string) {
    this.laboratoryService.registerPatient(lbp).
      subscribe((response) => {
        console.log("DODAT PACIJENT USPESNO! ")
        this.snackBar.openSuccessSnackBar("Uspesno dodat pacijent!")
      });

  }

  done(id: number, lbp: string) {
    this.laboratoryService.changeExaminationStatus(id, ExaminationStatus.ZAVRSENO).
      subscribe((response) => {
        this.getAll()
        this.registerPatient(lbp)
        alert("Uspesno Zavrseno")
        this.snackBar.openSuccessSnackBar("Uspesno zavrseno!")
      });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getListScheduledEexaminations();
  }


}
