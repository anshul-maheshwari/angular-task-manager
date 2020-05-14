import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface IUser {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

@Injectable({ providedIn: "root" })
export class UsersDao {
  constructor(private http: HttpClient) {}
  static readonly baseUrl = "https://reqres.in/";

  getUsersList(): Observable<IUser[]> {
    return this.http
      .get<{ data: IUser[] }>(UsersDao.baseUrl + "api/users?page=1")
      .pipe(map(res => res.data || []));
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(UsersDao.baseUrl + "api/users", user);
  }
}
