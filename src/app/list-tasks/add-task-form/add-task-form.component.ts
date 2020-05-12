import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  SimpleChange
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ITask } from "../list-tasks.component";
import { TasksService } from "../../core/Services/tasks.service";
import { Subscription, Observable } from "rxjs";
import { canLeaveEditPage } from "../../core/guards/can-leave-edit.guard.service";

@Component({
  selector: "app-add-task-form",
  templateUrl: "./add-task-form.component.html",
  styleUrls: ["./add-task-form.component.css"]
})
export class AddTaskFormComponent implements OnInit, canLeaveEditPage {
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  @ViewChild("assignedTo", { static: true }) assignedToRef: ElementRef;
  @ViewChild("description", { static: true }) descriptionRef: ElementRef;
  @ViewChild("titleRef", { static: true }) titleRef: ElementRef;
  @Input() id: string;
  editable = false;
  subscription: Subscription = new Subscription();

  title: string = "";
  data: ITask;

  ngAfterViewInit() {
    if (this.id) {
      this.populteData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const updatedId: SimpleChange = changes["id"];
    if (updatedId && updatedId.currentValue !== updatedId.previousValue) {
      this.populteData();
    }
  }

  private populteData(): void {
    this.data = this.tasksService.getTask(this.id);

    if (this.data) {
      this.assignedToValue = this.data.assignedTo;
      this.titleValue = this.data.title;
      this.descriptionValue = this.data.description;
    } else {
      this.assignedToValue = this.titleValue = this.descriptionValue = "";
    }
  }

  ngOnInit() {
    console.log("Comp Created");
    this.subscription.add(
      this.route.params.subscribe(param => {
        const idParam = param["xyz"];
        console.log(idParam);
        if (idParam) {
          this.id = idParam;
        }
        this.populteData();
      })
    );

    this.subscription.add(
      this.route.queryParams.subscribe(quertParam => {
        const isEditable = quertParam["editenabled"];
        if (isEditable) {
          this.editable = !+isEditable;
        }
      })
    );

    this.subscription.add(
      this.route.fragment.subscribe(f => {
        console.log(f);
      })
    );
  }

  ngOnDestroy() {
    console.log("about destroy");
    this.subscription.unsubscribe();
  }

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

  get titleValue(): string {
    if (this.titleRef) {
      return this.titleRef.nativeElement.value;
    }
  }

  get descriptionValue(): string {
    if (this.descriptionRef) {
      return this.descriptionRef.nativeElement.value;
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

  get isUnsaved(): boolean {
    return (
      this.data.title !== this.titleValue ||
      this.data.assignedTo !== this.assignedToValue ||
      this.data.description !== this.descriptionValue
    );
  }

  delete(): void {
    this.tasksService.deleteTask(this.id);
  }

  xyz(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.data && this.isUnsaved) {
      return confirm('Do you want to leave');
    }
    return true;
  }
}
