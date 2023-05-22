import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-state-history',
  templateUrl: './nurse-covid-state-history.component.html',
  styleUrls: ['./nurse-covid-state-history.component.css']
})
export class NurseCovidStateHistoryComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
