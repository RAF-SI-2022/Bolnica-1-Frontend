import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-ambulance',
  templateUrl: './nurse-covid-ambulance.component.html',
  styleUrls: ['./nurse-covid-ambulance.component.css']
})
export class NurseCovidAmbulanceComponent  implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }

}
