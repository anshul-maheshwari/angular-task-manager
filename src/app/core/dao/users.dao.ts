import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

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

  getUsersListDelayed(delayedBy: string): Observable<IUser[]> {
    const param = new HttpParams();
    return this.http
      .get<{ data: IUser[] }>(UsersDao.baseUrl + "api/users", {
        params: param
          .append("param1", "1")
          .append("param1", "2")
          .set("param2", "2")
          .set("param2", "10")
          .set("delay", delayedBy),
          responseType: "json"
      })
      .pipe(
        tap(res => console.log(res)),
        map(res => [])
      );
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(UsersDao.baseUrl + "api/users", user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(UsersDao.baseUrl + `api/users/${id}`);
  }

  getUser(id: string): Observable<any> {
    const header = new HttpHeaders({
      header1: "1",
      header2: "2",
      header3: "3"
    });
    return this.http
      .get<{ data: IUser }>(UsersDao.baseUrl + `api/users/${id}`, {
        headers: header.set("header1", "11").append("header2", "22")
      })
      .pipe(
        map(res => res.data),
        catchError(err => {
          if (err.status === 404) {
            alert("User not found");
          }

          return of(null);
        })
      );
  }
}
