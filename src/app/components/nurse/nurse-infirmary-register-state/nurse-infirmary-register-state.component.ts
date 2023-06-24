import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {AuthService} from "../../../services/auth.service";
import {Time} from "@angular/common";

@Component({
  selector: 'app-nurse-infirmary-register-state',
  templateUrl: './nurse-infirmary-register-state.component.html',
  styleUrls: ['./nurse-infirmary-register-state.component.css']
})
export class NurseInfirmaryRegisterStateComponent implements OnInit {

  addGroup: FormGroup;
  currentHospitalization : HospitalizationDto;

  patientLbp: string = 'lbp neki'
  lbz: string = ''
  pbo: string = '';
  initialFormValues: any;

  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackbarServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private infirmaryService: InfirmaryService,
              private authService: AuthService) {

    this.currentHospitalization = history.state.hospitalization;

    const now = new Date();

    //now.toISOString().slice(11,19)

    this.addGroup = this.formBuilder.group({
      temperature: ['', [Validators.required]],
      systolicPressure: ['', [Validators.required]],
      diastolicPressure: ['', [Validators.required]],
      pulse: ['', [Validators.required]],
      therapy: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dateExamState: [now.toISOString().slice(0,10), [Validators.required]],
      timeExamState: [now.toLocaleTimeString(), [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.lbz = this.authService.getLBZ();
    this.pbo = this.authService.getPBO();
    this.initialFormValues = this.addGroup.getRawValue();

  }

  registerState() {

    const registerState = this.addGroup.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      return;
    }

    const isEmpty = Object.keys(registerState)
      .filter(key => key !== 'dateExamState' && key !== 'timeExamState')
      .every(key => !registerState[key]);

    if (isEmpty) {
      this.snackBar.openWarningSnackBar("Unesite vrednost u barem jedno polje!");
      return;
    }


    console.log("izmenjeno vreme+" + registerState.timeExamState)

    this.infirmaryService.createPatientState(registerState.dateExamState, registerState.timeExamState,
      registerState.temperature, registerState.systolicPressure, registerState.diastolicPressure,
      registerState.pulse, registerState.therapy, registerState.description, this.currentHospitalization.id)
      .subscribe((response) => {
      this.snackBar.openSuccessSnackBar("Uspesno registrovano stanje!")

        this.addGroup.reset();

        // Update form controls with initial values
        Object.keys(this.addGroup.controls).forEach((controlName) => {
          const control = this.addGroup.get(controlName);
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
        this.addGroup.get('dateExamState')?.reset();

        form.classList.remove('was-validated');


      }, error => {
      console.log("Error " + error.status);
      if (error.status == 409) {
        this.snackBar.openErrorSnackBar("Stanje pacijenta nije registrovano!")
      } else{
        this.snackBar.openErrorSnackBar("Greska!")
      }
    })

  }

}
