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
  user: IUser;
  constructor(private usersDao: UsersDao) {}

  get firstNames(): string[] {
    return this.users.map(u => u.first_name);
  }

  ngOnInit() {
    this.usersDao.getUsersList().subscribe(res => (this.users = res));
  }

  delete(id: string): void {
    this.usersDao.deleteUser(id).subscribe();
  }

  getUsers(delayedBy: string) {
    this.usersDao
      .getUsersListDelayed(delayedBy)
      .subscribe();
  }

  getUser(id: string): void {
    this.usersDao.getUser(id).subscribe(
      res => {
        console.log(res);
        this.user = res;
      },
      err => {
        alert("Error Block ");
        console.log(err);
        this.user = null;
      }
    );
  }
}
