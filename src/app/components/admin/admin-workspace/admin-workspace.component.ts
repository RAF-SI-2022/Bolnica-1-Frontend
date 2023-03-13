import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-workspace',
  templateUrl: './admin-workspace.component.html',
  styleUrls: ['./admin-workspace.component.css']
})
export class AdminWorkspaceComponent implements OnInit {

  constructor(private router: Router){

  }
  ngOnInit(): void {
  }

  pretrazi(){
      this.router.navigate(['/admin-search-employee']);
  }

  profil(){
       this.router.navigate(['/profile']);
  }

  dodajZaposlenog(){
      this.router.navigate(['/admin-add-employee']);
  }
}
