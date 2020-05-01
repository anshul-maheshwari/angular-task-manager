import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'Task Manager App';
  maxNumberOfTasks = 5;

  onUpdateMaxTask(maxNumberOfTasks: number): void {
    this.maxNumberOfTasks = maxNumberOfTasks;
  }
}
