import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LettersWithSpacesOnlyDirective } from "./core/directives/letters-with-spaces-only.directive";
import { ListTasksComponent } from "./list-tasks/list-tasks.component";
import { AddTaskFormComponent } from "./list-tasks/add-task-form/add-task-form.component";
import { TitleComponent } from "./title/title.component";
import { TasksService } from "./core/Services/tasks.service";
import { CommonService } from "./core/Services/common.service";
import { TasksReadOnlyComponent } from "./tasks-read-only/tasks-read-only.component";
import { Route } from "@angular/compiler/src/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./error/error.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { CanEditGuard } from "./core/guards/can-edit.guard.service";
import { CanLeaveEditGuard } from "./core/guards/can-leave-edit.guard.service";
import { TaskResolver } from "./core/reolvers/task.resolver";


@NgModule({
  imports: [BrowserModule, FormsModule,AppRoutingModule ],
  declarations: [
    AppComponent,
    LettersWithSpacesOnlyDirective,
    ListTasksComponent,
    AddTaskFormComponent,
    TitleComponent,
    TasksReadOnlyComponent,
    ErrorComponent
  ],
  bootstrap: [AppComponent],
  providers: [CommonService, CanEditGuard, CanLeaveEditGuard, TaskResolver]
})
export class AppModule {}
