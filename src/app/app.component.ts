import { Component } from "@angular/core";

import { interval, Observable, of } from "rxjs";
import { ITask } from "./list-tasks/list-tasks.component";
import { catchError, map, filter } from "rxjs/operators";

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

  ngOnInit() {
    const intervalObservable = Observable.create(observer => {
      setTimeout(() => observer.next(20), 2000);
      setTimeout(() => observer.next(40), 4000);
      setTimeout(() => observer.next(70), 7000);
      setTimeout(() => observer.next(10), 1000);
      setTimeout(() => observer.next(30), 3000);
      setTimeout(() => observer.next(300), 30000);
      setTimeout(() => observer.complete(100), 6000);
      setTimeout(() => observer.error("fdjfalsk"), 5000);
    });

    // intervalObservable
    //   .pipe(
    //     catchError(() => {
    //       return of(50);
    //     }),
    //     filter((num: number) => Math.random() > 0.5),
    //     map(data => {
    //       return { d: data };
    //     }),
    //   )
    //   .subscribe(
    //     x => console.log(x),
    //     z => console.log("error", z),
    //     y => console.log("complet", y)
    //   );
  }
}
