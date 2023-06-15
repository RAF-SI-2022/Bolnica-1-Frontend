import { Component, OnInit } from '@angular/core';
import { PatientService } from "../../../../services/patient-service/patient.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../../services/user-service/user.service";
import { AdminPromeniZaposlenog, DeparmentShort, HospitalShort, Page } from "../../../../models/models";
import { AuthService } from "../../../../services/auth.service";
import { LaboratoryService } from "../../../../services/laboratory-service/laboratory.service";
import { LabAnalysisDto } from "../../../../models/laboratory/LabAnalysisDto";
import { ParameterDto } from "../../../../models/laboratory/ParameterDto";
import { PrescriptionAnalysis } from "../../../../models/laboratory/PrescriptionAnalysis";
import { PrescriptionType } from "../../../../models/laboratory-enums/PrescriptionType";
import { PrescriptionServiceService } from "../../../../services/prescription-service/prescription-service.service";
import { Patient } from "../../../../models/patient/Patient";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { interval } from 'rxjs';
import {DiagnosisCode, DiagnosisCodeDto} from "../../../../models/patient/DiagnosisCode";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";


@Component({
  selector: 'app-doctor-covid-create-referral',
  templateUrl: './doctor-covid-create-referral.component.html',
  styleUrls: ['./doctor-covid-create-referral.component.css']
})
export class DoctorCovidCreateReferralComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  selectedOption: string = '';
  departmentFromId: number = 0;
  departmentToId: number = 0;
  departmentToIdInfirmary: number = 0;

  doctorId: number = 0;
  prescriptionAnalyses: string = '';

  prescriptionAnalyses1: PrescriptionAnalysis = new PrescriptionAnalysis();
  prescriptionArray: PrescriptionAnalysis[] = [];

  page = 0
  pageSize = 5
  total = 0
  paramsPage: Page<ParameterDto> = new Page<ParameterDto>()
  paramsList: ParameterDto[] = []

  lbz = '';
  lbp = '';

  analysisSaBeka: LabAnalysisDto[] = [];
  diagnosisSaBeka: DiagnosisCodeDto[] = [];

  analysisParams: ParameterDto[] = [];

  selectedAnalysis: number = 0;

  // hospitals: HospitalShort[] = [];
  // selectedHospital: HospitalShort = new HospitalShort();

  hospitals: DeparmentShort[] = []
  hospitalsInfirmary: DeparmentShort[] = []

  selectedHospital: number = 0;
  departments: DeparmentShort[] = [];

  selectedDepartment: string = '';
  selectedDepartmentInfirmary: string = '';


  referralForm: FormGroup;
  referralInfirmaryForm: FormGroup;
  userEdit: AdminPromeniZaposlenog = new AdminPromeniZaposlenog();

  pageHospital = 0
  pageSizeHospital = 99999
  totalHospital = 0
  hospitalPage: Page<DeparmentShort> = new Page<DeparmentShort>()
  hospitalPageInfirmary: Page<DeparmentShort> = new Page<DeparmentShort>()


  allDiagnosis: DiagnosisCodeDto[] = []
  diagnosis: string = ''


  constructor(private prescriptionService: PrescriptionServiceService,
              private snackBar: SnackbarServiceService,
              private laboratoryService: LaboratoryService,
              private authService: AuthService,
              private userService: UserService,
              private patientService: PatientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private covidService: CovidServiceService) {
    this.referralForm = this.formBuilder.group({
        analysis: ['' ,[Validators.required]],
        comment: ['', [Validators.required]],
      });

      this.referralInfirmaryForm = this.formBuilder.group({
        diagnosis: ['' ,[Validators.required]],
        commentInfirmary: ['', [Validators.required]],
      });

    }

    isPopupVisible = false;

    ngOnInit(): void {
      this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
      console.log(this.lbp);
      //interval(5000).subscribe(() => {
        this.getLabDoctorDepartments();
      //});

      this.patientService.getDiagnosis().subscribe(res => {
        this.diagnosisSaBeka = res;
      });

      this.getDiagnosis()
    }


  getLabDoctorDepartments(){
      this.getDepartments();
      this.lbz = this.authService.getLBZ();
      console.log(this.lbz);
      this.getLabAnalysis();
      this.getDoctorDepartment()
    }


  getDiagnosis(): void {
    this.patientService.getDiagnosis().subscribe(result => {
      console.log("ema")
      this.allDiagnosis = result;
      console.log(this.allDiagnosis)
    })
  }

  getDoctorDepartment(): void {
    this.userService.getEmployee(this.lbz).subscribe(result => { },
      err => {
        if (err.status == 302) { // found!
          this.userEdit = err.error;
          console.log(this.userEdit)
          this.departmentFromId = this.userEdit.department.id
          console.log(this.departmentFromId)
        }
        else{
          this.snackBar.openErrorSnackBar("Greska")
        }
      })
  }



    hidePopup(): void {
        this.isPopupVisible = false;
    }

  validateEntries() : boolean {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');

    if(form.checkValidity() === false){
      return false;
    }

    return true;
  }


  validateInfirmaryEntries() : boolean {
    var form = document.getElementsByClassName('needs-validation')[1] as HTMLFormElement;
    form.classList.add('was-validated');

    if(form.checkValidity() === false){
      return false;
    }

    return true;
  }

  confirmUput(): void {

      if(!this.validateEntries()){
        this.snackBar.openErrorSnackBar("Popunite trazena polja!")
        return;
      }
      if(this.totalDepartmentsChecked == 0){
        this.snackBar.openErrorSnackBar("Izaberite parametre")
        return;
      }
      // if(this.totalHopsitalChecked == 0){
      //   this.snackBar.openErrorSnackBar("Izaberite bolnicu")
      //   return;
      // }

      if(!confirm('Da li ste sigurni da želite da napravite uput?')){
        return;
      }


    const referral = this.referralForm.value;
    console.log("uput potvrdjen");
    console.log(this.selectedAnalysis);
    console.log("selected params: " + this.selectedParams);

    this.prescriptionAnalyses1.analysisId = this.selectedAnalysis;
    this.prescriptionAnalyses1.parametersIds = this.selectedParams;

    this.prescriptionArray.push(this.prescriptionAnalyses1);

    console.log(this.prescriptionAnalyses1)

    this.covidService.writeLabPerscription(
      this.lbz, this.departmentFromId, this.departmentToId, this.lbp, referral.comment, this.prescriptionArray
    ).subscribe(res => {
      console.log(res)
      // this.errorMessage = '';
      // this.successMessage = 'Uspesno dodat uput!';
      this.snackBar.openSuccessSnackBar("Uspesno dodat uput!")
    }, error => {
      console.log("Error " + error.status);
      // this.successMessage = '';
      // this.errorMessage = 'ERROR: Uput nije kreiran!';
      this.snackBar.openErrorSnackBar("Uput nije kreiran");
    }
    );
  }




  confirmInfirmaryUput(): void {

    if(!this.validateInfirmaryEntries()){
      this.snackBar.openErrorSnackBar("Popunite trazena polja!")
      return;
    }

    if(this.totalHopsitalChecked == 0){
      this.snackBar.openErrorSnackBar("Izaberite bolnicu")
      return;
    }

    if(!confirm('Da li ste sigurni da želite da napravite uput?')){
      return;
    }

    const referral = this.referralInfirmaryForm.value;
    // console.log("uput potvrdjen");
    // console.log(this.selectedAnalysis);
    // console.log("selected params: " + this.selectedParams);


    if (this.diagnosis != '') {
      let tmpdiagnosis = this.diagnosis.split("-")[0].trim();

      this.covidService.writeInfirmaryPerscription(
        this.lbz, this.departmentFromId, this.departmentToIdInfirmary, this.lbp, tmpdiagnosis,
        referral.commentInfirmary
      ).subscribe(res => {
          console.log(res)
          // this.errorMessage = '';
          // this.successMessage = 'Uspesno dodat uput!';
          this.snackBar.openSuccessSnackBar("Uspesno dodat uput!")
        }, error => {
          console.log("Error " + error.status);
          // this.successMessage = '';
          // this.errorMessage = 'ERROR: Uput nije kreiran!';
          this.snackBar.openErrorSnackBar("Uput nije kreiran");
        }
      );

    }else{
      this.snackBar.openWarningSnackBar("Popunite dijagnozu!")
    }


  }

  getDepartments(): void {
    this.userService.getDepartments().subscribe(res => {
      this.departments = res;
      this.getLaboratoryDepartment(res)
    });
  }

  getLaboratoryDepartment(dep: DeparmentShort[]): void{
    dep.forEach(department => {
      if (department.name === "Laboratory") {
        this.departmentToId = department.id;
      }
    });
  }

  getLabAnalysis(): void {
    console.log("dosao do ts");
    this.laboratoryService.getAnalysis().subscribe(res => {
      this.analysisSaBeka = res;
    });
    console.log("prosao ts");
  }


  getParams() {
    this.laboratoryService.getAnalysisParams(this.selectedAnalysis, this.page, this.pageSize).subscribe((response) => {
      this.paramsPage = response
      this.paramsList = this.paramsPage.content
      this.total = this.paramsPage.totalElements
      console.log(this.paramsList)
      if(this.paramsList.length == 0){
        this.snackBar.openWarningSnackBar("Izaberite tip parametra")
      }
    })
  }


  getHospitalsByDepName() {
    console.log("name " + this.selectedDepartmentInfirmary)

    this.userService.getDepartmentForRefferal(this.selectedDepartment, this.page, this.pageSize).subscribe((res) => {

      this.hospitalPage = res
      this.hospitals = this.hospitalPage.content
      this.totalHospital = this.paramsPage.totalElements
      console.log(this.hospitals)
      if(this.hospitals.length == 0){
        this.snackBar.openWarningSnackBar("Izaberite ustanovu")
      }
    })
  }

  getHospitalsByDepNameInfirmary() {
    console.log("name " + this.selectedDepartmentInfirmary)

    this.userService.getDepartmentForRefferal(this.selectedDepartmentInfirmary, this.page, this.pageSize).subscribe((res) => {
      this.hospitalPageInfirmary = res
      this.hospitalsInfirmary = this.hospitalPageInfirmary.content
      this.totalHospital = this.paramsPage.totalElements
      console.log(this.hospitalsInfirmary)
      if(this.hospitalsInfirmary.length == 0){
        this.snackBar.openWarningSnackBar("Izaberite ustanovu")
      }
    })
  }


  selectedParams = [];

  totalDepartmentsChecked = 0;
  onCheckboxChange(event: any, id: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.totalDepartmentsChecked++;
      // @ts-ignore
      this.selectedParams.push(id);
    } else {
      // @ts-ignore
      const index = this.selectedParams.indexOf(id);
      this.totalDepartmentsChecked--;
      if (index !== -1) {
        this.selectedParams.splice(index, 1);
      }
    }
  }

  totalHopsitalChecked = 0;

  onCheckboxChangeForHospital(event: any, id: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      // @ts-ignore
      this.departmentToId = id;
      this.totalHopsitalChecked++;
      // console.log("departmentToId " + this.departmentToId)
    } else {
      this.totalHopsitalChecked--;
      // @ts-ignore
      this.departmentToId = null;
    }
  }

  onCheckboxChangeForHospitalInfirmary(event: any, id: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      // @ts-ignore
      this.departmentToIdInfirmary = id;
      this.totalHopsitalChecked++;
    } else {
      this.totalHopsitalChecked--;
      // @ts-ignore
      this.departmentToIdInfirmary = null;
    }
  }

  onDepartmentSelected(event: any) {
    this.selectedDepartment = event.target.value; // Update the selectedDepartment property with the new value
  }

  onDepartmentSelectedInfirmary(event: any) {
    this.selectedDepartmentInfirmary = event.target.value; // Update the selectedDepartment property with the new value
  }


  filteredDiagnosisCodes: DiagnosisCodeDto[] = [];

  filterDiagnosisCodes(searchText: string): void {
    if (this.allDiagnosis && this.allDiagnosis.length > 0 && searchText.length > 0) {
      this.filteredDiagnosisCodes = this.allDiagnosis.filter(
        (diagnosiss) =>
          (diagnosiss.code?.toString().toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (diagnosiss.description?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (diagnosiss.latinDescription?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    } else {
      this.filteredDiagnosisCodes = [];
    }
    console.log("Imam nas " + this.filterDiagnosisCodes.length)
  }

  selectSuggestion(suggestion: DiagnosisCodeDto): void {
    this.diagnosis = `${suggestion.code} - ${suggestion.description} (${suggestion.latinDescription})`;
    this.filteredDiagnosisCodes = [];
  }

}
