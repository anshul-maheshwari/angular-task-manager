import {
  Component,
  OnInit,
  ContentChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.css"]
})
export class TitleComponent implements OnInit {
  constructor() {}

  @ContentChild("maxNumberOfTasksRef", { static: true }) maxNumberOfTasksRef: ElementRef;
  @Output() updateMaxTask: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit() {}

  onUpdateMaxTask(): void {
    if (this.maxNumberOfTasksRef) {
      this.updateMaxTask.emit(
        this.maxNumberOfTasksRef.nativeElement.value || 5
      );
    } else {
    this.updateMaxTask.emit(5);
    }
  }
}
