import { Component, OnInit } from '@angular/core';
import { TasksService } from '../core/Services/tasks.service';

@Component({
  selector: 'app-tasks-read-only',
  templateUrl: './tasks-read-only.component.html',
  styleUrls: ['./tasks-read-only.component.css']
})
export class TasksReadOnlyComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

}