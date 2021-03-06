import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { RegisterReactiveComponent } from "./register-reactive/register-reactive.component";

const routes: Routes = [
  {
    path: "register",
    data: { xyz: "In Progress" },
    component: RegisterComponent
  },
  {
    path: "register/reactive",
    component: RegisterReactiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
