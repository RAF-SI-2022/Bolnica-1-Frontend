import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-exam',
  templateUrl: './doctor-covid-exam.component.html',
  styleUrls: ['./doctor-covid-exam.component.css']
})
export class DoctorCovidExamComponent  implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }

}
