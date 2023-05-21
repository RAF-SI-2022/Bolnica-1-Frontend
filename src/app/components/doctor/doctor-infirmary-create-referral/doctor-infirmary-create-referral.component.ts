import {Component, OnInit} from '@angular/core';
import {PrescriptionAnalysis} from "../../../models/laboratory/PrescriptionAnalysis";
import {AdminPromeniZaposlenog, DeparmentShort, Page} from "../../../models/models";
import {ParameterDto} from "../../../models/laboratory/ParameterDto";
import {LabAnalysisDto} from "../../../models/laboratory/LabAnalysisDto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrescriptionServiceService} from "../../../services/prescription-service/prescription-service.service";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user-service/user.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {PrescriptionType} from "../../../models/laboratory-enums/PrescriptionType";
import {PrescriptionStatus} from "../../../models/laboratory-enums/PrescriptionStatus";

@Component({
  selector: 'app-doctor-infirmary-create-referral',
  templateUrl: './doctor-infirmary-create-referral.component.html',
  styleUrls: ['./doctor-infirmary-create-referral.component.css']
})
export class DoctorInfirmaryCreateReferralComponent  implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  selectedOption: string = '';
  departmentFromId: number = 0;
  departmentToId: number = 0;
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
  analysisParams: ParameterDto[] = [];

  selectedAnalysis: number = 0;

  // hospitals: HospitalShort[] = [];
  // selectedHospital: HospitalShort = new HospitalShort();

  hospitals: DeparmentShort[] = []
  selectedHospital: number = 0;
  departments: DeparmentShort[] = [];

  selectedDepartment: string = '';

  referralForm: FormGroup;
  userEdit: AdminPromeniZaposlenog = new AdminPromeniZaposlenog();

  pageHospital = 0
  pageSizeHospital = 99999
  totalHospital = 0
  hospitalPage: Page<DeparmentShort> = new Page<DeparmentShort>()

  constructor(private prescriptionService: PrescriptionServiceService,
              private snackBar: SnackbarServiceService,
              private laboratoryService: LaboratoryService,
              private authService: AuthService,
              private userService: UserService,
              private patientService: PatientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private infirmaryService: InfirmaryService) {
    this.referralForm = this.formBuilder.group({

      // ustanova: ['', [Validators.required]],
      // ustanova1: [new DeparmentShort(), [Validators.required]],
      // ustanova2: [new HospitalShort(), [Validators.required]],
      // ustanova3: [new HospitalShort(), [Validators.required]],
      analysis: ['' ,[Validators.required]],
      comment: ['', [Validators.required]],
      // refferalDiagnosis: ['', [Validators.required]],
      // referralReason: ['', [Validators.required]],
      // prescriptionAnalysisDtos: ['', [Validators.required]]
    });
  }
  // onOptionSelected(value: string) {
  //     this.selectedOption = value;
  // }

  isPopupVisible = false;

  ngOnInit(): void {
    this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
    console.log(this.lbp);
    //interval(5000).subscribe(() => {
    this.getLabDoctorDepartments();
    //});
  }

  getLabDoctorDepartments(){
    this.getDepartments();
    // this.getHospitals();
    this.lbz = this.authService.getLBZ();
    console.log(this.lbz);
    this.getLabAnalysis();
    this.getDoctorDepartment()
  }
  /*      ustanova: ['', [Validators.required]],
        ustanova1: [new DeparmentShort(), [Validators.required]],
        ustanova2: [new HospitalShort(), [Validators.required]],
        ustanova3: [new HospitalShort(), [Validators.required]],
        analysis: [new LabAnalysisDto(), [Validators.required]],
        comment: ['', [Validators.required]],
        refferalDiagnosis: ['', [Validators.required]],
        referralReason: ['', [Validators.required]],
        prescriptionAnalysisDtos: ['', [Validators.required]]
      });
    }
    // onOptionSelected(value: string) {
    //     this.selectedOption = value;
    // }

    isPopupVisible = false;

    ngOnInit(): void {
      this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
      console.log(this.lbp);
      this.getDepartments();
      // this.getHospitals();
      this.lbz = this.authService.getLBZ();
      console.log(this.lbz);
      this.getLabAnalysis();
      this.getDoctorDepartment()
    }*/


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

  //  getHospitals(): void {
  //   this.userService.getHospitals().subscribe(res=>{
  //      this.hospitals = res;
  //   });
  // }

  showPopup(event: any): void {
    this.isPopupVisible = true;
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

  confirmUput(): void {

    if(!this.validateEntries()){
      this.snackBar.openErrorSnackBar("Popunite trazena polja!")
      return;
    }
    // if(this.totalDepartmentsChecked == 0){
    //   this.snackBar.openErrorSnackBar("Izaberite parametre")
    //   return;
    // }
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

    // this.patientService.writePerscription(PrescriptionType.LABORATORIJA, this.doctorId,this.departmentFromId,this.departmentToId,this.lbp,
    //   new Date(),1,referral.comment, '','',this.prescriptionArray ).subscribe(res=>{
    //   console.log(res)
    // });

    this.infirmaryService.sendPrescriptionToLab(
      PrescriptionType.STACIONAR, this.lbz, this.departmentFromId, this.departmentToId, this.lbp,
       new Date(), PrescriptionStatus.NEREALIZOVAN, referral.comment,
      "dijagnoza", "razlog",this.prescriptionArray
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
    console.log("name " + this.selectedDepartment)

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
      console.log("departmentToId " + this.departmentToId)
    } else {
      this.totalHopsitalChecked--;
      // @ts-ignore
      this.departmentToId = null;
    }
  }


  onDepartmentSelected(event: any) {
    this.selectedDepartment = event.target.value; // Update the selectedDepartment property with the new value
  }



}
