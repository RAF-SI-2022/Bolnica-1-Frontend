import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-search-admission',
  templateUrl: './nurse-covid-search-admission.component.html',
  styleUrls: ['./nurse-covid-search-admission.component.css']
})
export class NurseCovidSearchAdmissionComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
