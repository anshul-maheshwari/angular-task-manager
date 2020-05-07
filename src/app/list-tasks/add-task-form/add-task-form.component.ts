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
import { TasksService } from "../../core/Services/tasks.service";

@Component({
  selector: "app-add-task-form",
  templateUrl: "./add-task-form.component.html",
  styleUrls: ["./add-task-form.component.css"]
})
export class AddTaskFormComponent implements OnInit {
  constructor(private tasksService: TasksService) {}
  @ViewChild("assignedTo", { static: true }) assignedToRef: ElementRef;
  @ViewChild("description", { static: true }) descriptionRef: ElementRef;
  @ViewChild("titleRef", { static: true }) titleRef: ElementRef;
  title: string = "";

  @Input() id: string;

  data: ITask;

  ngAfterViewInit() {
    this.data = this.tasksService.getTask(this.id);

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
      this.title = this.titleRef.nativeElement.value = value || "";
    }
  }

  set descriptionValue(value: string) {
    if (this.descriptionRef) {
      this.descriptionRef.nativeElement.value = value || "";
    }
  }

  save(des: string): void {
    this.tasksService.updateTask({
      id: this.id,
      title: this.title,
      description: des,
      assignedTo: this.assignedToValue
    });
  }

  delete(): void {
    this.tasksService.deleteTask(this.id);
  }
}
