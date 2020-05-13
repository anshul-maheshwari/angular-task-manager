import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksReadOnlyComponent } from "../tasks-read-only/tasks-read-only.component";
import { AddTaskFormComponent } from "../list-tasks/add-task-form/add-task-form.component";
import { ListTasksComponent } from "../list-tasks/list-tasks.component";
import { ErrorComponent } from "../error/error.component";

import { Routes, RouterModule } from "@angular/router";
import { CanEditGuard } from "../core/guards/can-edit.guard.service";
import { CanLeaveEditGuard } from "../core/guards/can-leave-edit.guard.service";
import { TaskResolver } from "../core/reolvers/task.resolver";
import { RegisterComponent } from "../register/register.component";
import { RegisterReactiveComponent } from "../register-reactive/register-reactive.component";

const routes: Routes = [
  {
    path: "edit/:xyz",
    component: AddTaskFormComponent,
    canActivate: [CanEditGuard],
    canDeactivate: [CanLeaveEditGuard],
    resolve: { pqr: TaskResolver }
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
        canDeactivate: [CanLeaveEditGuard],
        resolve: { pqr: TaskResolver }
      }
    ]
  },
  { path: "", redirectTo: "/read", pathMatch: "full" },
  {
    path: "register",
    data: { xyz: "In Progress" },
    component: RegisterComponent
  },
  {
    path: "register/reactive",
    component: RegisterReactiveComponent
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
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
