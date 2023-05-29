import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-covid-waiting-room',
  templateUrl: './doctor-covid-waiting-room.component.html',
  styleUrls: ['./doctor-covid-waiting-room.component.css']
})
export class DoctorCovidWaitingRoomComponent  implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("radi")
  }

}
