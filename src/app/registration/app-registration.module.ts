import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RegistrationRoutingModule } from "./app-registration.routing.module";
import { RegisterComponent } from "./register/register.component";
import { RegisterReactiveComponent } from "./register-reactive/register-reactive.component";

@NgModule({
  imports: [
    RegistrationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegisterComponent, RegisterReactiveComponent],
})
export class RegistrationModule {}
