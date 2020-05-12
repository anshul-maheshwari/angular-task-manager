import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { ITask } from "../../list-tasks/list-tasks.component";

import { Observable } from "rxjs";
import { TasksService } from "../Services/tasks.service";
import { Injectable } from "@angular/core";

@Injectable()
export class TaskResolver implements Resolve<ITask> {
  constructor(private tasksService: TasksService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ITask> | Promise<ITask> | ITask {
    const id = route.params["xyz"];
    if (id) {
      return this.tasksService.getTask(id);
    }
    return null;
  }
}
