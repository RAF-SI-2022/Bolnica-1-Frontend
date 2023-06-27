import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-workspace',
  templateUrl: './admin-workspace.component.html',
  styleUrls: ['./admin-workspace.component.css']
})
export class AdminWorkspaceComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {}

  goToSearchEmployees(){
      this.router.navigate(['/admin-search-employee']);
  }

  goToProfile(){
       this.router.navigate(['/profile']);
  }

  goToAddEmployee(){
      this.router.navigate(['/admin-add-employee']);
  }
}
