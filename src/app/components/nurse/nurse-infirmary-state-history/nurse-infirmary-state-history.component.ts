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

@Component({
  selector: 'app-nurse-infirmary-state-history',
  templateUrl: './nurse-infirmary-state-history.component.html',
  styleUrls: ['./nurse-infirmary-state-history.component.css']
})
export class NurseInfirmaryStateHistoryComponent implements OnInit {

  currentHospitalization : HospitalizationDto;
  patientLbp: string = 'lbp neki'

  lbz: string = ''

  stateHistoryList: PatientStateDto[] = [];
  stateHistoryPage: Page<PatientStateDto> = new Page<PatientStateDto>();

  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  form: FormGroup;
  patients: Patient[] = []

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private laboratoryService: LaboratoryService,
              private router: Router,
              private snackBar: SnackbarServiceService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private infirmaryService:InfirmaryService) {

    this.currentHospitalization = history.state.hospitalization;

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    this.form = this.formBuilder.group({
      dateFrom: [startOfYear.toISOString().slice(0,10), [Validators.required]],
      dateTo: [now.toISOString().slice(0,10), [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.lbz = this.authService.getLBZ();
    this.getStateHistory();
  }


  getStateHistory(): void {
    const sendData = this.form.value;

    if (this.page == 0)
      this.page = 1;

    this.infirmaryService.getPatientStateByDate(this.currentHospitalization.id,
      sendData.dateFrom, sendData.dateTo,
      this.page - 1, this.PAGE_SIZE)
      .subscribe(res => {
        this.stateHistoryPage = res
        this.stateHistoryList = this.stateHistoryPage.content
        this.total = this.stateHistoryPage.totalElements
        if(this.stateHistoryList.length == 0){
          this.snackBar.openWarningSnackBar("Nema prethodnih stanja")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      })
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getStateHistory();
  }

  goToRegisterState(): void {
    const url = `/nurse-infirmary-register-state/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }



}
