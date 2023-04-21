import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technician-workspace',
  templateUrl: './technician-workspace.component.html',
  styleUrls: ['./technician-workspace.component.css']
})
export class TechnicianWorkspaceComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  goToPoseta(): void {
    this.router.navigate(['/technician-schedule-lab-examination']);
  }

  goToIzdavanje(): void{
    this.router.navigate(['/technician-issuing-results']);
  }

  goToPrijem(): void {
    this.router.navigate(['/technician-patient-admission']);
  }
}
