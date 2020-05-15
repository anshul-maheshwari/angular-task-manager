import { NgModule } from "@angular/core";
import { UsersComponent } from "../users/users.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserRoutingModule } from "./app-user.routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, UserRoutingModule],
  declarations: [UsersComponent]
})
export class UserModule {}
