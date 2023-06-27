import {Component, OnInit} from '@angular/core';
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {PatientStateDto} from "../../../models/infirmary/PatientStateDto";
import {Page} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {AuthService} from "../../../services/auth.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {VisitDto} from "../../../models/infirmary/VisitDto";

@Component({
  selector: 'app-nurse-infirmary-visits-history',
  templateUrl: './nurse-infirmary-visits-history.component.html',
  styleUrls: ['./nurse-infirmary-visits-history.component.css']
})
export class NurseInfirmaryVisitsHistoryComponent implements OnInit {

  currentHospitalization : HospitalizationDto;
  patientLbp: string = 'lbp neki'

  lbz: string = ''
  departmentId: number = 0

  visitHistoryList: VisitDto[] = [];
  visitHistoryPage: Page<VisitDto> = new Page<VisitDto>();

  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private laboratoryService: LaboratoryService,
              private router: Router,
              private snackBar: SnackbarServiceService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private infirmaryService:InfirmaryService) {

    this.currentHospitalization = history.state.hospitalization;

  }

  ngOnInit(): void {
    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.lbz = this.authService.getLBZ();
    this.departmentId = parseInt(this.authService.getDepartmentId());
    this.getVisitsHistory();
  }

  getVisitsHistory(): void {

    const now = new Date();
    const before = new Date(0);

    if (this.page == 0)
      this.page = 1;

    this.infirmaryService.getVisitsWithFilter(this.departmentId, this.currentHospitalization.hospitalRoomId,
      this.currentHospitalization.id, before, now, this.page - 1, this.PAGE_SIZE)
      .subscribe(res => {
        this.visitHistoryPage = res
        this.visitHistoryList = this.visitHistoryPage.content
        this.total = this.visitHistoryPage.totalElements
        if(this.visitHistoryList.length == 0){
          this.snackBar.openWarningSnackBar("Ovaj pacijent nema posete")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      })
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getVisitsHistory();
  }

}
