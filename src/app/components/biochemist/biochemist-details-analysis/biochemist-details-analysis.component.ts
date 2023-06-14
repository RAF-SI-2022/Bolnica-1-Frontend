import { Component, OnInit } from '@angular/core';
import { LaboratoryService } from "../../../services/laboratory-service/laboratory.service";
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user-service/user.service";
import { LabWorkOrderNew } from "../../../models/laboratory/LabWorkOrderNew";
import { PatientService } from "../../../services/patient-service/patient.service";
import { LabWorkOrderWithAnalysis } from "../../../models/laboratory/LabWorkOrderWithAnalysis";
import { ParameterAnalysisResultWithDetails } from "../../../models/laboratory/ParameterAnalysisResultWithDetails";
import { OrderStatus } from "../../../models/laboratory-enums/OrderStatus";
import { LabWorkOrderDto } from "../../../models/laboratory/LabWorkOrderDto";
import { AdminPromeniZaposlenog, Zaposleni } from "../../../models/models";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';
import { filter, map, pairwise, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-biochemist-details-analysis',
  templateUrl: './biochemist-details-analysis.component.html',
  styleUrls: ['./biochemist-details-analysis.component.css']
})
export class BiochemistDetailsAnalysisComponent implements OnInit {

  currentLabWorkOrder: LabWorkOrderNew;

  labWorkOrderWithAnalysis: LabWorkOrderWithAnalysis = new LabWorkOrderWithAnalysis();
  parameterAnalysisResults: ParameterAnalysisResultWithDetails[] = [];
  biochemistVerified: AdminPromeniZaposlenog = new AdminPromeniZaposlenog();

  obradjen: boolean = false;

  lbz: string = '';

  biochemist: boolean = false;
  biochemistSpec: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  workOrderId: number = 0;
  lbp: string = '';
  patientName: string = '';
  patientSurname: string = '';

  biochemistLbzVerified: string = ''
  biochemistName: string = ''
  biochemistSurname: string = ''


  shouldShowFromPRoute = false;
  constructor(private route: ActivatedRoute, private userService: UserService, private snackBar: SnackbarServiceService,
    private authService: AuthService, private laboratoryService: LaboratoryService, private activatedRoute: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder,
    private patientService: PatientService) {

    this.currentLabWorkOrder = history.state.lab;

  }

  previousUrl: string = "";
  ngOnInit(): void {
    // biochemist daily prikazic
    let prevRoute: string = "";
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl =  events[0].urlAfterRedirects
      console.log('current url', events[1].urlAfterRedirects);
      console.log("prev " + this.previousUrl)
      if(this.previousUrl == "/biochemist-search"){
        this.shouldShowFromPRoute = false;
      }
      else{
        this.shouldShowFromPRoute = true;
      }
      console.log("HOHO " + this.shouldShowFromPRoute)
    });
    this.workOrderId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    // @ts-ignore
    this.lbz = localStorage.getItem("LBZ")
    console.log("lbz " + this.lbz)

    //mora preko state jer je na beku u dto lbp long umesto string

    // OTKOMENTARISATI KAD PRORADI STRANICA


    this.lbp = this.currentLabWorkOrder.lbp
    this.biochemistLbzVerified = this.currentLabWorkOrder.biochemistLbz

    if(this.currentLabWorkOrder.status == 'OBRADJEN'){
      this.obradjen = true
    }

    this.getPatient();
    this.getBiochemistVerified();

    //setInterval(this.getLabWorkOrderWithAnalysis, 5000)
    this.getLabWorkOrderWithAnalysis();

    if(this.currentLabWorkOrder.status == 'OBRADJEN'){
      this.obradjen = true
      this.labWorkOrderWithAnalysis.biochemistLbz = this.labWorkOrderWithAnalysis.biochemistLbz
      console.log("Woww " + this.labWorkOrderWithAnalysis.biochemistLbz)
      this.biochemistLbzVerified = this.labWorkOrderWithAnalysis.biochemistLbz
    }

  }

  getBiochemistVerified(): void {
    this.userService.getEmployee(this.biochemistLbzVerified).subscribe(result => {
    }, err => {
      if (err.status == 302) { // found!
        this.biochemistVerified = err.error; // Message recieved on error -> err.error to get message
        this.biochemistName = this.biochemistVerified.name
        this.biochemistSurname = this.biochemistVerified.surname
      }
    });

  }

  getLabWorkOrderWithAnalysis(): void {

    this.laboratoryService.getLabWorkOrderWithAnalysis(this.workOrderId).subscribe(
      res => {

      }, err => {
        if (err.status == 302) { // found!
          this.labWorkOrderWithAnalysis = err.error; // Message recieved on error -> err.error to get message
          this.parameterAnalysisResults = this.labWorkOrderWithAnalysis.parameterAnalysisResults
        }
      })

  }

  getPatient(): void {
    this.patientService.getPatientByLbp(this.lbp).subscribe((response) => {
      this.patientName = response.name;
      this.patientSurname = response.surname;
    })

    console.log("Ime: " + this.patientName)
    console.log("Prezime: " + this.patientSurname)
  }


  saveChanges(paramId: number, result: string): void {
    console.log("result before service " + result);
    console.log("id parametra " + paramId);
    console.log("work order "+ this.workOrderId)
    if(result == null || result.length == 0){
      this.snackBar.openErrorSnackBar("Polje ne sme biti prazno")
      return;
    }
    this.laboratoryService.updateResults(this.workOrderId, paramId, result, new Date(), this.lbz)
      .subscribe((response) => {
        // this.errorMessage = '';
        // this.successMessage = 'Promena je uspesno sacuvana!'
        //this.getLabWorkOrderWithAnalysis();
        this.snackBar.openSuccessSnackBar("Promena uspesno sacuvana!")
      }, error => {
        console.log("Error " + error.status);
        if (error.status == 409) {
          // this.errorMessage = 'Promena nije sacuvana!';
          this.snackBar.openErrorSnackBar("Promena nije sacuvana!")
        }
      })
  }

  verifyWorkOrder(): void {
    for (let par of this.parameterAnalysisResults) {
      console.log("Evo " + par.result)
      if(par.result == null || par.result.length == 0){
        this.snackBar.openErrorSnackBar("Popunite sva polja")
        return;
      }
    }
    // this.laboratoryService.verifyResult(this.workOrderId).subscribe(res => {
    //   console.log("usao ")
    //   // this.successMessage = res.message
    //   this.obradjen = true
    //   this.biochemistLbzVerified = this.lbz
    //   this.getBiochemistVerified()
    //   this.getLabWorkOrderWithAnalysis();
    //   this.snackBar.openSuccessSnackBar("Verifikovan uspesno!")
    // }, error => {
    //   console.log("Error " + error.status);
    //   if (error.status == 409) {
    //     // this.errorMessage = 'Promena nije sacuvana!';
    //     this.snackBar.openErrorSnackBar("Promena nije sacuvana!")
    //   }
    // })

    // Save all parameter results before verifying
    const savePromises = this.parameterAnalysisResults.map((p) =>
      this.laboratoryService.updateResults(this.workOrderId, p.id, p.result, new Date(), this.lbz).toPromise()
    );

    Promise.all(savePromises)
      .then(() => {
        // All results saved successfully, now verify the work order
        this.laboratoryService.verifyResult(this.workOrderId).subscribe(
          (res) => {
            this.obradjen = true;
            this.biochemistLbzVerified = this.lbz;
            this.getBiochemistVerified();
            this.getLabWorkOrderWithAnalysis();
            this.snackBar.openSuccessSnackBar("Verifikovan uspesno!");
          },
          (error) => {
            console.log("Error " + error.status);
            if (error.status == 409) {
              this.snackBar.openErrorSnackBar("Promena nije sacuvana!");
            }
          }
        );
      })
      .catch((error) => {
        console.log("Error while saving results: ", error);
        this.snackBar.openErrorSnackBar("Greška prilikom čuvanja rezultata!");
      });
  }


  checkMedBiohemicar(): boolean {
    this.userService.checkRole('ROLE_MED_BIOHEMICAR').subscribe(hasRole => {
      if (hasRole) {
        this.biochemist = true;
      }
      else this.biochemist = false;
    });
    return this.biochemist;
  }

  checkSpecMedBiohemije(): boolean {
    this.userService.checkRole('ROLE_SPEC_MED_BIOHEMIJE').subscribe(hasRole => {
      if (hasRole) {
        this.biochemistSpec = true;
      }
      else this.biochemistSpec = false;
    });
    return this.biochemistSpec;
  }

}
