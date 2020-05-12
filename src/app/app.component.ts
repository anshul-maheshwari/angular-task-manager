import { Component } from "@angular/core";

import { interval } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Task Manager App";
  maxNumberOfTasks = 5;

  onUpdateMaxTask(maxNumberOfTasks: number): void {
    this.maxNumberOfTasks = maxNumberOfTasks;
  }

  // ngOnInit() {
  //   const intervalObservable = interval(1000);

  //   intervalObservable.subscribe(x => console.log(x));
  // }
}
