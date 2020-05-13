import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormGroup, NgModelGroup } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor() {}

  @ViewChild("registerForm") registerFormRef: NgForm;
  @ViewChild("nameGroupRef") nameGroupRef: NgModelGroup;

  ngOnInit() {}

  ngAfterViewInit() {
    console.log(this.registerFormRef);
  }

  setDefault(): void {
    this.registerFormRef.form.patchValue({
      name: { fname: "Anshul", lname: "Maheshwari" },
      age: 90,
      email: "fdfd",
      underAged: "yes"
    });

    (this.registerFormRef.controls["name"] as FormGroup).controls[
      "lname"
    ].setValue("no");
  }

  submit(): void {
    console.log(this.registerFormRef);
    // console.log(this.nameGroupRef);
  }

  resetForm(): void {
    this.registerFormRef.resetForm();
  }
  resetNameForm(): void {
    this.nameGroupRef.reset();
  }
}
