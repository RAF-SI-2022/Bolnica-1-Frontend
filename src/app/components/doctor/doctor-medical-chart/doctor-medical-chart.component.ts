import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-doctor-medical-chart',
  templateUrl: './doctor-medical-chart.component.html',
  styleUrls: ['./doctor-medical-chart.component.css']
})
export class DoctorMedicalChartComponent implements OnInit {
  generalForm: FormGroup
  allergyForm: FormGroup
  vaccineForm: FormGroup




  constructor(private formBuilder: FormBuilder) {
    this.generalForm = this.formBuilder.group(
      {
        bloodGroup: ['', [Validators.required]],
        rhFactor: ['', [Validators.required]]

      })

    this.allergyForm = this.formBuilder.group(
      {
        allergen: ['', [Validators.required]]
      }
      )

    this.vaccineForm = this.formBuilder.group(
      {
        vaccine: ['', [Validators.required]],
        dateOfReceiving: ['', [Validators.required]]
      }
    )
    }


  ngOnInit(): void {
    this.generalForm.get('bloodGroup')?.disable()
    this.generalForm.get('rhFactor')?.disable()
    // this.allergyForm.get('allergen')?.disable()
    // this.vaccineForm.get('vaccine')?.disable()
    // this.vaccineForm.get('dateOfReceiving')?.disable()

  }

  updateGeneral(): void {
    this.generalForm.get('bloodGroup')?.enable()
    this.generalForm.get('rhFactor')?.enable()
  }


}
