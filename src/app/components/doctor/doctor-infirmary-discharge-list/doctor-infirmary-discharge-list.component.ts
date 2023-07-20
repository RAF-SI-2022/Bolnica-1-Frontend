import {Component, OnInit} from '@angular/core';
import {CountryCode} from "../../../models/patient-enums/CountryCode";
import {FamilyStatus} from "../../../models/patient-enums/FamilyStatus";
import {MaritalStatus} from "../../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../../models/patient-enums/ExpertiseDegree";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../services/patient-service/patient.service";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import { HospitalizationDto } from 'src/app/models/infirmary/HospitalizationDto';
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-doctor-infirmary-discharge-list',
  templateUrl: './doctor-infirmary-discharge-list.component.html',
  styleUrls: ['./doctor-infirmary-discharge-list.component.css']
})
export class DoctorInfirmaryDischargeListComponent implements OnInit {

  addGroup: FormGroup;
  currentHospitalization : HospitalizationDto;

  patientLbp: string = 'lbp neki'
  lbz: string = ''
  pbo: string = '';
  initialFormValues: any;

  dischargeShow: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackbarServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private infirmaryService: InfirmaryService,
              private authService: AuthService) {

    this.currentHospitalization = history.state.hospitalization;

    this.addGroup = this.formBuilder.group({
      followingDiagnosis: ['', [Validators.required]],
      anamnesis: ['', [Validators.required]],
      analysis: ['', [Validators.required]],
      courseOfDisease: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      therapy: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.lbz = this.authService.getLBZ();
    this.pbo = this.authService.getPBO();
    this.initialFormValues = this.addGroup.getRawValue();


    this.dischargeShow = this.isDischargeDateAndTimeEmpty();
    console.log(this.dischargeShow)

    if(this.dischargeShow==false)  this.gotoone();
  }

  gotoone(): void {
    const url = `/doctor-infirmary-workspace/${this.patientLbp}`;
    const hospitalization = this.currentHospitalization
    this.router.navigateByUrl(url, { state: { hospitalization } });
  }


  isDischargeDateAndTimeEmpty(): boolean {
    return !this.currentHospitalization.dischargeDateAndTime;
  }

  addDischargeList() {

    const dischargeList = this.addGroup.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      return;
    }



    //proveri sta treba za ovo
    //this.permissions = []


    this.infirmaryService.createDischargeList(dischargeList.followingDiagnosis,
      dischargeList.anamnesis, dischargeList.analysis, dischargeList.courseOfDisease,
      dischargeList.summary, dischargeList.therapy, this.lbz, this.pbo, new Date(),
      this.currentHospitalization.id).subscribe((response) => {
      this.snackBar.openSuccessSnackBar("Uspesno kreirana otpusna lista!")

      const now = new Date();
      this.currentHospitalization.dischargeDateAndTime = now;

      //dodato
      this.addGroup.reset();

      // Update form controls with initial values
      Object.keys(this.addGroup.controls).forEach((controlName) => {
        const control = this.addGroup.get(controlName);
        const initialValue = this.initialFormValues[controlName];
        // @ts-ignore
        control.setValue(initialValue);
        // @ts-ignore
        control.markAsPristine();

        control?.markAsUntouched();

        control?.updateValueAndValidity();
      });

      form.classList.remove("was-validated");

      this.gotoone()


    }, error => {
      console.log("Error " + error.status);
      if (error.status == 409) {
        this.snackBar.openErrorSnackBar("Otpusna lista nije kreirana!")
      }
    })

  }

}

