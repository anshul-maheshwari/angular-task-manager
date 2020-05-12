import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterState,
  RouterStateSnapshot,
  CanActivateChild,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CanEditGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const canEidt = +localStorage.getItem("canEdit") || 0;
    if (!canEidt) {
      this.router.navigate(['edit']);
    }
    return !!canEidt;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const canEidt = +localStorage.getItem("canEdit") || 0;
    return !!canEidt;
  }
}
