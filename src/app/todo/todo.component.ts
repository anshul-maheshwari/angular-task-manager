import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  todo = "";
  todoDate = new Date();
  todos: { todo: string; todoDate: Date }[] = [];
  subject: Subject<string[]> = new Subject<string[]>();
  constructor() {}

  ngOnInit() {
    this.init();
    this.todos.push({ todo: "ZttZ", todoDate: this.todoDate });
    this.todos.push({ todo: "yDDy", todoDate: this.todoDate });
    this.todos.push({ todo: "p3p3p", todoDate: this.todoDate });
    this.todos.push({ todo: "ada", todoDate: this.todoDate });
  }

  ngAfterViewInit() {
    this.subject.next(this.todos.map(t => t.todo));
  }

  init(): void {
    this.todo = "";
    this.todoDate = new Date();
  }

  add(): void {
    this.todos.push({ todo: this.todo, todoDate: new Date(this.todoDate) });
    this.todos = [...this.todos];
    this.subject.next(this.todos.map(t => t.todo));
    this.init();
  }
}
