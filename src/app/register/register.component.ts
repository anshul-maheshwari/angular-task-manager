import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor() {}

  @ViewChild("registerForm") registerFormRef: NgForm;

  ngOnInit() {}

  ngAfterViewInit() {
    console.log(this.registerFormRef);
  }

  setDefault(): void {
    this.registerFormRef.setValue({ name: "Anshul", age: 90, email: "fdfd" });
  }

  submit(): void {
    console.log(this.registerFormRef);
  }
}
