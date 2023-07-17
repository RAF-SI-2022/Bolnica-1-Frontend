import {Component, OnInit} from '@angular/core';
import {CovidSummed} from "../../../../models/covid/CovidSummed";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-stats-details',
  templateUrl: './doctor-covid-stats-details.component.html',
  styleUrls: ['./doctor-covid-stats-details.component.css']
})
export class DoctorCovidStatsDetailsComponent  implements OnInit  {

  currentStat: CovidSummed;

  positive: number = 0;
  negative: number = 0;
  hospitalized: number = 0;
  ventilator: number = 0;
  dead: number = 0;
  curr: number = 0;
  vaccinated: number = 0;
  healed: number=0;
  date: Date = new Date();

  constructor(private route: ActivatedRoute,
              private router: Router){
    this.currentStat = history.state.stat;

  }

  ngOnInit(): void {
    this.positive = this.currentStat.positive;
    this.negative = this.currentStat.negative;
    this.hospitalized = this.currentStat.hospitalized;
    this.ventilator = this.currentStat.ventilator;
    this.dead = this.currentStat.dead;
    this.curr = this.currentStat.curr;
    this.vaccinated = this.currentStat.vaccinated;
    this.healed = this.currentStat.healed;
    this.date = this.currentStat.date;

  }

  navigateBack():void{
    this.router.navigate(['/doctor-covid-statistics']);
  }

}
