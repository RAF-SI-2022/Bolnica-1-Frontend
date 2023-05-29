import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-statistics',
  templateUrl: './nurse-covid-statistics.component.html',
  styleUrls: ['./nurse-covid-statistics.component.css']
})
export class NurseCovidStatisticsComponent  implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }

}
