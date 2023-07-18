import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import { ChartData } from 'src/app/models/laboratory/Prescription';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Page} from "../../../../models/models";
import {CovidSummed} from "../../../../models/covid/CovidSummed";
import {PatientService} from "../../../../services/patient-service/patient.service";

@Component({
  selector: 'app-doctor-covid-statistics',
  templateUrl: './doctor-covid-statistics.component.html',
  styleUrls: ['./doctor-covid-statistics.component.css']
})
export class DoctorCovidStatisticsComponent  implements OnInit {

  form: FormGroup;
  page = 0;
  pageSize = 5;
  statsPage: Page<CovidSummed> = new Page<CovidSummed>();
  statsList: CovidSummed[] = [];
  total = 0;

  positive: number = 0;
  negative: number = 0;
  hospitalized: number = 0;
  ventilator: number = 0;
  dead: number = 0;
  curr: number = 0;
  vaccinated: number = 0;
  healed: number=0;

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



  constructor(private router: Router,
              private covidService: CovidServiceService,
              private snackBar: SnackbarServiceService,
              private patientService: PatientService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {

    const now = new Date();

    this.form = this.formBuilder.group({
      from: [now.toISOString().slice(0,10), [Validators.required]],
      to: [now.toISOString().slice(0,10), [Validators.required]],
      gender: ['SVI', [Validators.required]],
      ageCategory: ['0', [Validators.required]]
    });


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
    this.getCovidStats()
  }


  getCovidStats() {
    const workOrder = this.form.value;

    this.patientService.getCovidStats(
      this.page, this.pageSize, workOrder.from, workOrder.to,
      workOrder.gender, workOrder.ageCategory)
      .subscribe((response) => {

        this.statsPage = response.list;
        this.statsList = this.statsPage.content;
        this.total = this.statsPage.totalElements
        if(this.statsList.length == 0){
          this.snackBar.openWarningSnackBar("Nema statistike za te filtere")
        }

        this.positive = response.covidSummed.positive;
        this.negative = response.covidSummed.negative;
        this.hospitalized = response.covidSummed.hospitalized;
        this.ventilator = response.covidSummed.ventilator;
        this.dead = response.covidSummed.dead;
        this.curr = response.covidSummed.curr;
        this.vaccinated = response.covidSummed.vaccinated;
        this.healed = response.covidSummed.healed;

        // this.fillData();

      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      });
  }

  navigateToDetails(stat: CovidSummed): void {
    const url = `/doctor-covid-stats-details`;
    this.router.navigateByUrl(url, { state: { stat } });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getCovidStats();
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

