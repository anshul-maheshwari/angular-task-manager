import {
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
  HttpHandler
} from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export class ResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log("response", request.url);
    return next
      .handle(
        request.clone({
          headers: new HttpHeaders().set("auth", "233")
        })
      )
      .pipe(
        tap(res => console.log("interceptor", res)),
        catchError(err => {
          if (err.status === 401) {
            // fetch token
          }

          return throwError(err);
        })
      );
  }
}
