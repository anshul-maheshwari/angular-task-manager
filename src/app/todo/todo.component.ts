import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  todo = "";
  todoDate = new Date();
  todos: { todo: string; todoDate: Date }[] = [];
  constructor() {}

  ngOnInit() {
    this.init();
    this.todos.push({ todo: "tt", todoDate: this.todoDate });
    this.todos.push({ todo: "DD", todoDate: this.todoDate });
    this.todos.push({ todo: "p3p3p", todoDate: this.todoDate });
    this.todos.push({ todo: "dfoiwiopej", todoDate: this.todoDate });
  }

  init(): void {
    this.todo = "";
    this.todoDate = new Date();
  }

  add(): void {
    this.todos.push({ todo: this.todo, todoDate: new Date(this.todoDate) });
    this.init();
  }
}
