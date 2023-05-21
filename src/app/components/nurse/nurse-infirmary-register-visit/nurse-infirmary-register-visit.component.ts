import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-nurse-infirmary-register-visit',
  templateUrl: './nurse-infirmary-register-visit.component.html',
  styleUrls: ['./nurse-infirmary-register-visit.component.css']
})
export class NurseInfirmaryRegisterVisitComponent implements OnInit {

  addGroup: FormGroup;
  currentHospitalization : HospitalizationDto;

  patientLbp: string = 'lbp neki'
  lbz: string = ''
  pbo: string = '';

  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackbarServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private infirmaryService: InfirmaryService,
              private authService: AuthService) {

    this.currentHospitalization = history.state.hospitalization;

    this.addGroup = this.formBuilder.group({
      visitorName: ['', [Validators.required]],
      visitorSurname: ['', [Validators.required]],
      visitorJmbg: ['', [Validators.required]],
      note: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.patientLbp = <string>this.route.snapshot.paramMap.get('lbp');
    this.lbz = this.authService.getLBZ();
    this.pbo = this.authService.getPBO();
  }

  addVisit() {

    const visit = this.addGroup.value
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      return;
    }

    this.infirmaryService.createVisit(visit.visitorName, visit.visitorSurname,
      visit.visitorJmbg, new Date(), visit.note, this.currentHospitalization.id)
      .subscribe((response) => {
        this.snackBar.openSuccessSnackBar("Uspesno registrovana poseta!")
      }, error => {
        console.log("Error " + error.status);
        if (error.status == 409) {
          this.snackBar.openErrorSnackBar("Poseta pacijentu nije registrovano!")
        }
      })
  }

}
