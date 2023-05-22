import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nurse-covid-workspace-one',
  templateUrl: './nurse-covid-workspace-one.component.html',
  styleUrls: ['./nurse-covid-workspace-one.component.css']
})
export class NurseCovidWorkspaceOneComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }
}
