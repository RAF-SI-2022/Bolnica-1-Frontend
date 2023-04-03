import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../../services/patient-service/patient.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user-service/user.service";
import {DeparmentShort, HospitalShort, Zaposleni} from "../../../models/models";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-doctor-create-referral',
  templateUrl: './doctor-create-referral.component.html',
  styleUrls: ['./doctor-create-referral.component.css']
})
export class DoctorCreateReferralComponent implements OnInit{

    selectedOption: string = '';
    departmentFromId: number = 0;
    departmentToId: number = 0;
    doctorId: number = 0;
    prescriptionAnalyses: string = '';

    lbz = '';
    lbp = '';

    analysisSaBeka = ['analiza1', 'analiza2', 'analiza3'];

    hospitals: HospitalShort[] = [];
    selectedHospital: HospitalShort = new HospitalShort();
    departments: DeparmentShort[] = [];

    referralForm:  FormGroup;

  constructor(private authService: AuthService, private userService: UserService, private patientService: PatientService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.referralForm = this.formBuilder.group({
        ustanova: ['', [Validators.required]],
        ustanova1: [new DeparmentShort(), [Validators.required]],
        ustanova2: [new HospitalShort(), [Validators.required]],
        ustanova3: [new HospitalShort(), [Validators.required]],
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
      this.getDepartments();
       this.lbp = <string>this.route.snapshot.paramMap.get('lbp');
       this.getHospitals();
       this.lbz = this.authService.getLBZ();
       console.log(this.lbz);

    }

    getHospitals(): void {
     this.userService.getHospitals().subscribe(res=>{
        this.hospitals = res;
     });
   }

    showPopup(event: any): void {
        this.isPopupVisible = true;
    }

    hidePopup(): void {
        this.isPopupVisible = false;
    }

    confirmUput(): void {
        const referral = this.referralForm.value;
        console.log("uput potvrdjen")
        // this.patientService.writePerscription(referral.selectedOption,this.doctorId,this.departmentFromId,this.departmentToId,this.lbp,new Date(),1,'','','', this.prescriptionAnalyses);
    }

  getDepartments(): void {
    this.userService.getDepartments().subscribe(res=>{
      this.departments = res;
    });
  }



}
