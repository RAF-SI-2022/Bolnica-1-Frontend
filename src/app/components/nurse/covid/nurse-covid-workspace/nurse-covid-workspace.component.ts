import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-workspace',
  templateUrl: './nurse-covid-workspace.component.html',
  styleUrls: ['./nurse-covid-workspace.component.css']
})
export class NurseCovidWorkspaceComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
