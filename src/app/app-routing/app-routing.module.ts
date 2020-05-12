import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksReadOnlyComponent } from "../tasks-read-only/tasks-read-only.component";
import { AddTaskFormComponent } from "../list-tasks/add-task-form/add-task-form.component";
import { ListTasksComponent } from "../list-tasks/list-tasks.component";
import { ErrorComponent } from "../error/error.component";

import { Routes, RouterModule } from "@angular/router";
import { CanEditGuard } from "../core/guards/can-edit.guard.service";
import { CanLeaveEditGuard } from "../core/guards/can-leave-edit.guard.service";

const routes: Routes = [
  {
    path: "edit/:xyz",
    component: AddTaskFormComponent,
    canActivate: [CanEditGuard],
    canDeactivate: [CanLeaveEditGuard]
  },
  { path: "edit", component: ListTasksComponent },
  {
    path: "read",
    component: TasksReadOnlyComponent,
    canActivateChild: [CanEditGuard],
    children: [
      {
        path: "edit/:xyz",
        component: AddTaskFormComponent,
        canDeactivate: [CanLeaveEditGuard]
      }
    ]
  },
  { path: "", redirectTo: "/read", pathMatch: "full" },
  {
    path: "register",
    data: { xyz: "In Progress" },
    component: ErrorComponent
  },
  {
    path: "login",
    component: ErrorComponent
  },
  {
    path: "**",
    data: { xyz: "Not Found" },
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
