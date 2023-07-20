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

  positive: number = 135;
  negative: number = 788;
  hospitalized: number = 1232;
  ventilator: number = 150;
  dead: number = 218;
  curr: number = 18;
  vaccinated: number = 1102;
  healed: number=900;

  todayDate: Date = new Date();

  single: ChartData[];
  view: [number, number] = [700, 400];
  pieChartDimensions: [number, number] = [400, 400];
  barChartSingle: ChartData[];
  testedPieChartData: ChartData[];

  caseCategoriesData: ChartData[];
  cumulativeData: any[];

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

  lineChartData: { name: string, series: { name: Date, value: number }[] }[];

  lineChartView: [number, number] = [700, 400];
  lineChartLegend = true;
  lineChartXAxisLabel = 'Datum';
  lineChartYAxisLabel = 'Broj';
  lineChartColorScheme = 'vivid';



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


    this.single = [];
    this.testedPieChartData = [];
    this.barChartSingle = [];
    this.caseCategoriesData = [];
    this.cumulativeData = [];
    this.lineChartData = [];

  }


  ngOnInit(): void {
    // this.getCovidStats()
    this.fillData()
    this.fillSampleData()

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

        this.fillData();

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

    this.caseCategoriesData = [
      {
        "name": "Hospitalizovani",
        "value": this.hospitalized
      },
      {
        "name": "Na respiratoru",
        "value": this.ventilator
      },
      {
        "name": "Umrli",
        "value": this.dead
      },
      {
        "name": "Izleceni",
        "value": this.healed
      }
    ];

    // Calculate cumulative data over time
    let cumulativePositive = 0;
    let cumulativeNegative = 0;
    let cumulativeHospitalized = 0;
    let cumulativeVentilator = 0;
    let cumulativeDead = 0;
    let cumulativeVaccinated = 0;
    let cumulativeHealed = 0;

    this.cumulativeData = this.statsList.map((stat) => {
      console.log("usao")
      cumulativePositive += stat.positive;
      cumulativeNegative += stat.negative;
      cumulativeHospitalized += stat.hospitalized;
      cumulativeVentilator += stat.ventilator;
      cumulativeDead += stat.dead;
      cumulativeVaccinated += stat.vaccinated;
      cumulativeHealed += stat.healed;

      console.log("cumulative")
      console.log(cumulativePositive)

      return {
        "name": stat.date.getTime(), // Use the timestamp as the unique identifier for the data points
        "Positive": cumulativePositive,
        "Negative": cumulativeNegative,
        "Hospitalized": cumulativeHospitalized,
        "Ventilator": cumulativeVentilator,
        "Dead": cumulativeDead,
        "Vaccinated": cumulativeVaccinated,
        "Healed": cumulativeHealed,
      };
    });


    // Line chart data
    this.lineChartData = [
      {
        name: 'Broj novih pozitivnih',
        series: this.calculateDailyRate('positive')
      },
      {
        name: 'Broj hospitalizovanih',
        series: this.calculateDailyRate('hospitalized')
      },
      {
        name: 'Broj na respiratoru',
        series: this.calculateDailyRate('ventilator')
      },
      {
        name: 'Broj umrlih',
        series: this.calculateDailyRate('dead')
      },
      {
        name: 'Broj vakcinisanih',
        series: this.calculateDailyRate('vaccinated')
      },
    ];

    console.log(this.lineChartData)

  }


  calculateDailyRate(category: keyof CovidSummed): { name: Date; value: number }[] {
    console.log("Calculating daily rates for category:", category);

    const data = this.statsList.map((stat, index) => {
      const currentValue: number = Number(stat[category]); // Convert to number
      const previousValue: number = index > 0 ? Number(this.statsList[index - 1][category]) : 0; // Convert to number
      const dailyRate: number = currentValue - previousValue;
      console.log("Daily Rate:", dailyRate);

      return {
        name: new Date(stat.date.getTime()), // Convert timestamp to Date object
        value: dailyRate,
      };
    });

    console.log("Calculated data:", data);

    return data;
  }


  fillSampleData(): void {
    // Clear any existing data
    this.statsList = [];

    for (let i = 1; i <= 20; i++) {
      const covidSummed: CovidSummed = {
        positive: Math.floor(Math.random() * 1000),
        negative: Math.floor(Math.random() * 1000),
        hospitalized: Math.floor(Math.random() * 100),
        ventilator: Math.floor(Math.random() * 50),
        dead: Math.floor(Math.random() * 30),
        curr: Math.floor(Math.random() * 100),
        vaccinated: Math.floor(Math.random() * 500),
        healed: Math.floor(Math.random() * 800),
        date: new Date(2023, 6, i), // Replace 'i' with your desired day of the month
      };
      this.statsList.push(covidSummed);
    }

    // Sort the statsList by date in ascending order
    this.statsList.sort((a, b) => a.date.getTime() - b.date.getTime());
    console.log(this.statsList)

  }


}

