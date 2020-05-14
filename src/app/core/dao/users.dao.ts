import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

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

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(UsersDao.baseUrl + `api/users/${id}`);
  }

  getUser(id: string): Observable<any> {
    return this.http
      .get<{ data: IUser }>(UsersDao.baseUrl + `api/users/${id}`)
      .pipe(map(res => res.data),
      catchError(err => {
        if(err.status === 404) {
          alert('User not found');
        }

        return of(null);
      }));
  }
}
