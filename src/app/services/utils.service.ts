import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  openCloseSideBar = new Subject<boolean>();

  sideBarState$ = this.openCloseSideBar.asObservable();

  toogleSideBar(isOpen: boolean): void {
    this.openCloseSideBar.next(isOpen);
  }

}
