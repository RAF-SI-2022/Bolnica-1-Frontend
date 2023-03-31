import {Component, OnInit} from '@angular/core';
import {ScheduledLabExamination} from "../../../models/laboratory/ScheduledLabExamination";

@Component({
  selector: 'app-technician-schedule-lab-examination',
  templateUrl: './technician-schedule-lab-examination.component.html',
  styleUrls: ['./technician-schedule-lab-examination.component.css']
})
export class TechnicianScheduleLabExaminationComponent implements OnInit {

  page = 0
  pageSize = 5
  total = 0

  scheduledLabExams: ScheduledLabExamination[] = [];

  ngOnInit(): void {
  }

}
