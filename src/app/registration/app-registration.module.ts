import { NgModule } from "@angular/core";
import { RegisterReactiveComponent } from "../register-reactive/register-reactive.component";
import { RegisterComponent } from "../register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RegistrationRoutingModule } from "./app-registration.routing.module";

@NgModule({
  imports: [
    RegistrationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegisterComponent, RegisterReactiveComponent],
  exports: [RegisterComponent, RegisterReactiveComponent, RegistrationRoutingModule]
})
export class RegistrationModule {}
