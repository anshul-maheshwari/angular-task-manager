import { Observable } from "rxjs";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

export interface canLeaveEditPage {
  xyz(): Observable<boolean> | Promise<boolean> | boolean;
}

export class CanLeaveEditGuard implements CanDeactivate<canLeaveEditPage> {
  canDeactivate(
    component: canLeaveEditPage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.xyz();
  }
}
