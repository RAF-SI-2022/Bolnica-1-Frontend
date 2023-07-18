import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LaboratoryService} from "../../../../services/laboratory-service/laboratory.service";
import {PatientService} from "../../../../services/patient-service/patient.service";
import {UserService} from "../../../../services/user-service/user.service";
import {CovidSummed} from "../../../../models/covid/CovidSummed";
import {ChartData} from "../../../../models/laboratory/Prescription";

@Component({
  selector: 'app-nurse-covid-stats-details',
  templateUrl: './nurse-covid-stats-details.component.html',
  styleUrls: ['./nurse-covid-stats-details.component.css']
})
export class NurseCovidStatsDetailsComponent  implements OnInit  {

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


  numberOfTestedPatients : number;
  numberOfHospitalizedPatients : number;
  numberOfPositivePatients : number;
  numberOfCuredPatients : number;
  numberOfPatientsOnRespirator : number;
  numberOfDeadPatients : number;

  todayDate: Date = new Date();

  single: ChartData[];
  view: [number, number] = [700, 400];
  pieChartDimensions: [number, number] = [400, 400];
  barChartSingle: ChartData[];
  testedPieChartData: ChartData[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tip';
  showYAxisLabel = true;
  yAxisLabel = 'Broj';

  colorScheme = 'vivid';

  constructor(private route: ActivatedRoute,
              private router: Router){
    this.currentStat = history.state.stat;


    this.numberOfTestedPatients = 43;
    this.numberOfHospitalizedPatients = 1200;
    this.numberOfPositivePatients = 20;
    this.numberOfCuredPatients = 245;
    this.numberOfPatientsOnRespirator = 823;
    this.numberOfDeadPatients = 40;

    this.single = [
      {
        "name": "Broj testiranih",
        "value": this.numberOfTestedPatients
      },
      {
        "name": "Broj hospitalizovanih",
        "value": this.numberOfHospitalizedPatients
      },
      {
        "name": "Broj pozitivnih",
        "value": this.numberOfPositivePatients
      },
      {
        "name": "Broj izlečenih",
        "value": this.numberOfCuredPatients
      },
      {
        "name": "Broj na respiratoru",
        "value": this.numberOfPatientsOnRespirator
      },
      {
        "name": "Broj umrlih",
        "value": this.numberOfDeadPatients
      }
    ];
    this.testedPieChartData = [
      {
        name: "Pozitivni pacijenti",
        value: this.numberOfPositivePatients
      },
      {
        name: "Negativni pacijenti",
        value: this.numberOfTestedPatients - this.numberOfPositivePatients
      }
    ];
    this.barChartSingle = [
      {
        "name": "Broj hospitalizovanih",
        "value": this.numberOfHospitalizedPatients
      },
      {
        "name": "Broj izlečenih",
        "value": this.numberOfCuredPatients
      },
      {
        "name": "Broj na respiratoru",
        "value": this.numberOfPatientsOnRespirator
      },
      {
        "name": "Broj umrlih",
        "value": this.numberOfDeadPatients
      }
    ];

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

    this.fillData()
  }

  navigateBack():void{
    this.router.navigate(['/nurse-covid-statistics']);
  }

  fillData(): void{

    this.single = [
      {
        "name": "Broj testiranih",
        "value": this.positive + this.negative
      },

      {
        "name": "Broj pozitivnih",
        "value": this.positive
      },
      {
        "name": "Broj hospitalizovanih",
        "value": this.hospitalized
      },
      {
        "name": "Broj na respiratoru",
        "value": this.ventilator
      },
      {
        "name": "Broj umrlih",
        "value": this.dead
      },
      {
        "name": "Broj vakcinisanih",
        "value": this.vaccinated
      },
      {
        "name": "Broj izlecenih",
        "value": this.healed
      },
    ];

    this.testedPieChartData = [
      {
        name: "Pozitivni pacijenti",
        value: this.positive
      },
      {
        name: "Negativni pacijenti",
        value: this.negative
      }
    ];

    this.barChartSingle = [
      {
        "name": "Broj hospitalizovanih",
        "value": this.hospitalized
      },
      {
        "name": "Broj izlečenih",
        "value": this.healed
      },
      {
        "name": "Broj na respiratoru",
        "value": this.ventilator
      },
      {
        "name": "Broj umrlih",
        "value": this.dead
      }
    ];

  }


}

