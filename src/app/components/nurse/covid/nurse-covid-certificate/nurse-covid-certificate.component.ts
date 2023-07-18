import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LaboratoryService} from "../../../../services/laboratory-service/laboratory.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user-service/user.service";
import {PatientService} from "../../../../services/patient-service/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../../../../models/patient/Patient";

@Component({
  selector: 'app-nurse-covid-certificate',
  templateUrl: './nurse-covid-certificate.component.html',
  styleUrls: ['./nurse-covid-certificate.component.css']
})
export class NurseCovidCertificateComponent implements OnInit{

  form: FormGroup;

  initialFormValues: any;

  constructor(private snackBar: SnackbarServiceService,
              private authService: AuthService,
              private userService: UserService,
              private patientService: PatientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {


    this.form = this.formBuilder.group({
      lbp: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initialFormValues = this.form.getRawValue();
    this.populatePatients()
  }


  sendCertificate() {


    const certificate = this.form.value;
    console.log(certificate.lbp+":before trimming")

    if (certificate.lbp == '') {
      this.snackBar.openWarningSnackBar("Izaberite pacijenta");
      return;
    }

    certificate.lbp = certificate.lbp.replace(/ /g, "_").split(":")[0];
    certificate.lbp = certificate.lbp.split("_")[0];


    this.patientService.sendVaccinationCertificateToMail(certificate.lbp)
      .subscribe((response) => {

        this.form.reset();
        Object.keys(this.form.controls).forEach((controlName) => {
          const control = this.form.get(controlName);
          const initialValue = this.initialFormValues[controlName];
          // @ts-ignore
          control.setValue(initialValue);
          // @ts-ignore
          control.markAsPristine();
          // @ts-ignore
          control.markAsUntouched(); // Dodajte ovu liniju
          // @ts-ignore
          control.updateValueAndValidity();
        });

        this.snackBar.openSuccessSnackBar("Uspesno poslat sertifikat")

    }, err => {
      this.snackBar.openErrorSnackBar("Greska")
    });
  }



  patients: Patient[] = []
  filteredPatients: Patient[] = [];
  filterPatientLbp(searchText: string){
    if (this.patients && this.patients.length > 0 && searchText.length > 0) {
      this.filteredPatients = this.patients.filter(
        (patientt) =>
          (patientt.lbp?.toString().toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (patientt.name?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (patientt.surname?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    } else {
      this.filteredPatients = [];
    }
    console.log("Imam nas " + this.filteredPatients.length)
  }

  selectSuggestion(patient: Patient){
    this.form.value.lbp = `${patient.lbp} : ${patient.name} (${patient.surname})`;
    this.filteredPatients = [];
  }


  populatePatients() {
    this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
      this.patients = res.content;
      console.log("IMA NAS " + res.content.length)
    }, err => {
      console.log("GRESKA " + err.message)
    })
  }

}
