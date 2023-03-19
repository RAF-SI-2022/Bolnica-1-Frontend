import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-biochemist-workspace',
  templateUrl: './biochemist-workspace.component.html',
  styleUrls: ['./biochemist-workspace.component.css']
})
export class BiochemistWorkspaceComponent implements OnInit {

  page = 0;

  ngOnInit(): void {
  }

  onTableDataChange(event: any): void {
    this.page = event;

  }

}

/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '',
})
export class AppComponent {
  currentDate: Date = new Date();

  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}

 */
