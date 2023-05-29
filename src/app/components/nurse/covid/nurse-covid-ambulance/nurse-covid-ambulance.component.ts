import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-nurse-covid-ambulance',
  templateUrl: './nurse-covid-ambulance.component.html',
  styleUrls: ['./nurse-covid-ambulance.component.css']
})
export class NurseCovidAmbulanceComponent  implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      textLBP: ['', [Validators.required]],
      examinationType: ['Prvi', [Validators.required]],
      textDoctor: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    console.log("radi")
  }

  addExemination(): void {

    const sendData = this.form.value;
    console.log(sendData)
    // TODO: .
  }

}
