import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
  ValidationErrors
} from "@angular/forms";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-register-reactive",
  templateUrl: "./register-reactive.component.html",
  styleUrls: ["./register-reactive.component.css"]
})
export class RegisterReactiveComponent implements OnInit {
  constructor() {}
  registerForm: FormGroup;
  readonly inPhoneCountryCode = "91";

  ngOnInit() {
    this.initForm();
    this.registerForm.statusChanges.subscribe(status => console.log(status));
    this.registerForm.valueChanges.subscribe(value => console.log(value));
  }

  get ageControl(): AbstractControl {
    return this.registerForm.get("age");
  }

  get phoneControl(): FormArray {
    return this.registerForm.get("phone") as FormArray;
  }

  addPhoneControl(): void {
    this.phoneControl.controls.push(
      new FormControl(
        "xxxx-xxxx-xx",
        [
          Validators.required,
          this.customPhoneValidator.bind({ inPhoneCountryCode: "91" })
        ],
        this.customPhoneDuplicateValidator.bind(this)
      )
    );
  }

  removePhoneControl(index: number): void {
    this.phoneControl.removeAt(index);
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      name: new FormGroup({
        lname: new FormControl("lname", [Validators.required]),
        fname: new FormControl("fname", [Validators.required])
      }),
      age: new FormControl("90", [
        Validators.required,
        Validators.min(0),
        Validators.max(90)
      ]),
      email: new FormControl("defaul email", [
        Validators.required,
        Validators.email
      ]),
      phone: new FormArray([])
    });
  }

  private submit(): void {
    console.log(this.registerForm);
  }

  customPhoneValidator(control: AbstractControl): { [key: string]: boolean } {
    const value = control.value || "";
    if (
      value.substr(0, 2) === this.inPhoneCountryCode ||
      (value[0] === "+" && value.substr(1, 2) === this.inPhoneCountryCode)
    ) {
      return null;
    }
    return { phone: true };
  }

  customPhoneDuplicateValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return Observable.create(observer => {
      const value = control.value || "";
      if (
        this.phoneControl.controls
          .map(control => control.value)
          .filter(val => (val = value)).length > 1
      ) {
        setTimeout(() => observer.next({ duplicatePhone: true }), 3000);
      } else {
        setTimeout(() => observer.next(null), 3000);
      }
      setTimeout(() => observer.complete(), 3001);
    });
  }
}
