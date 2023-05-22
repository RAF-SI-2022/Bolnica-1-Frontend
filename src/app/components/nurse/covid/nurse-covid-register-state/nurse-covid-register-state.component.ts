import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-register-state',
  templateUrl: './nurse-covid-register-state.component.html',
  styleUrls: ['./nurse-covid-register-state.component.css']
})
export class NurseCovidRegisterStateComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
