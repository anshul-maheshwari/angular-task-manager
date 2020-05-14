import { Component, OnInit } from "@angular/core";
import { UsersDao } from "../core/dao/users.dao";
import { IUser } from "../core/dao/users.dao";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  constructor(private usersDao: UsersDao) {}

  get firstNames(): string[] {
    return this.users.map(u => u.first_name);
  }

  ngOnInit() {
    this.usersDao.getUsersList().subscribe(res => (this.users = res));
  }
}
