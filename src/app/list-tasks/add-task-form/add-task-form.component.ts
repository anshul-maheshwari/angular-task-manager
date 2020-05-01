import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { ITask } from "../list-tasks.component";

@Component({
  selector: "app-add-task-form",
  templateUrl: "./add-task-form.component.html",
  styleUrls: ["./add-task-form.component.css"]
})
export class AddTaskFormComponent implements OnInit {
  constructor() {}
  @ViewChild("assignedTo", { static: true }) assignedToRef: ElementRef;
  @ViewChild("description", { static: true }) descriptionRef: ElementRef;
  @ViewChild("titleRef", { static: true }) titleRef: ElementRef;
  title: string = '';

  @Input() data: ITask;

  @Output() deleteTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateTask: EventEmitter<ITask> = new EventEmitter<ITask>();

  ngAfterViewInit() {
    if (this.data) {
      this.assignedToValue = this.data.assignedTo;
      this.titleValue = this.data.title;
      this.descriptionValue = this.data.description;
    }
  }
  ngOnInit() {}

  set assignedToValue(value: string) {
    if (this.assignedToRef) {
      this.assignedToRef.nativeElement.value = value || "";
    }
  }

  get assignedToValue(): string {
    if (this.assignedToRef) {
      return this.assignedToRef.nativeElement.value;
    }
  }

  set titleValue(value: string) {
    if (this.titleRef) {
     this.title =  this.titleRef.nativeElement.value = value || "";
    }
  }

  set descriptionValue(value: string) {
    if (this.descriptionRef) {
      this.descriptionRef.nativeElement.value = value || "";
    }
  }

  save(des: string): void {
    const updatedData: ITask = {
      id: this.data.id,
      title: this.title,
      description: des,
      assignedTo: this.assignedToValue
    };
    console.log(updatedData);
    this.updateTask.emit(updatedData);
  }

  delete(): void {
    if (this.data) {
      this.deleteTask.emit(this.data.id);
    }
  }
}
