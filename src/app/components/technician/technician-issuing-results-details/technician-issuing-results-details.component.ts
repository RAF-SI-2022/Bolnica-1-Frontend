import {Component, OnDestroy} from '@angular/core';
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {LabWorkOrderWithAnalysis} from "../../../models/laboratory/LabWorkOrderWithAnalysis";
import {ParameterAnalysisResultWithDetails} from "../../../models/laboratory/ParameterAnalysisResultWithDetails";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user-service/user.service";
import {AuthService} from "../../../services/auth.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {FormBuilder} from "@angular/forms";
import {PatientService} from "../../../services/patient-service/patient.service";
import { interval } from 'rxjs';
import {Zaposleni} from "../../../models/models";

@Component({
  selector: 'app-technician-issuing-results-details',
  templateUrl: './technician-issuing-results-details.component.html',
  styleUrls: ['./technician-issuing-results-details.component.css']
})
export class TechnicianIssuingResultsDetailsComponent {


  currentLabWorkOrder: LabWorkOrderNew;

  labWorkOrderWithAnalysis: LabWorkOrderWithAnalysis = new LabWorkOrderWithAnalysis();
  parameterAnalysisResults: ParameterAnalysisResultWithDetails[]= [];

  workOrderId: number = 0;

  patientLbp: string = '';
  patientName: string = '';
  patientSurname: string = '';
  patientDateOfBirth: Date = new Date();


  constructor(private route: ActivatedRoute,
              private laboratoryService:LaboratoryService,
              private router: Router,
              private patientService: PatientService,
              private userService: UserService){
    this.currentLabWorkOrder = history.state.lab;
    this.patientLbp = this.currentLabWorkOrder.lbp;
  }


  ngOnInit(): void {

    this.workOrderId =parseInt( <string>this.route.snapshot.paramMap.get('id'));
    this.getPatientInfo();

    console.log(this.workOrderId)
   // interval(5000).subscribe(() => {
      this.getLabWorkOrderWithAnalysis();
    //});


  }

  getPatientInfo(): void{
    this.patientService.getPatientByLbp(this.patientLbp).subscribe(res=>{
      this.patientName = res.name
      this.patientSurname = res.surname
      this.patientDateOfBirth = res.dateOfBirth
    })
  }

  getLabWorkOrderWithAnalysis(): void {
    this.laboratoryService.getLabWorkOrderWithAnalysis(this.workOrderId).subscribe(
      res => {

      },
      (err) => {
        if (err.status == 302) {

          this.labWorkOrderWithAnalysis = err.error;
          this.parameterAnalysisResults = this.labWorkOrderWithAnalysis.parameterAnalysisResults;

          // Assuming you receive the biochemist's lbz in the response as `biochemistLbz`

          this.parameterAnalysisResults.forEach((result) => {
            const biochemistLbz = result.lbzBiochemist;
            this.userService.getEmployee(biochemistLbz).subscribe(
              (biochemist: Zaposleni) => {
              },
                err => {
                  if (err.status == 302) { // found!
                    const biochemist = err.error
                    result.biochemistName = biochemist.name;
                    result.biochemistSurname = biochemist.surname;

                  }
                }

            );
          });

        }
      }
    );
  }

  navigateBack():void{
    this.router.navigate(['/technician-issuing-results']);
  }

  printTable() {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=600,height=600');

    // Generate the HTML content for printing
    const tableContent = document.getElementById('printTable')?.outerHTML;

    // Write the HTML content to the new window
    printWindow?.document.open();
    printWindow?.document.write(`
    <html>
      <head>
        <title>Laboratorijske analize</title>
      </head>
      <body>
        ${tableContent}
        <script>
          // Automatically trigger printing once the content is loaded
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close(); // Close the print window after printing is complete
            }
          };
        </script>
      </body>
    </html>
  `);
    printWindow?.document.close();
  }
}
