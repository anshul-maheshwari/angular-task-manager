import {
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
  HttpHandler
} from "@angular/common/http";

export class RequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('request', request.url);
    return next.handle(
      request.clone({
        headers: new HttpHeaders().set("auth", "233")
      })
    );
  }
}
