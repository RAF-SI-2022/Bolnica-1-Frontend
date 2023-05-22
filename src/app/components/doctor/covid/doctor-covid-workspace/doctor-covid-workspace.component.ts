import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-workspace',
  templateUrl: './doctor-covid-workspace.component.html',
  styleUrls: ['./doctor-covid-workspace.component.css']
})
export class DoctorCovidWorkspaceComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
