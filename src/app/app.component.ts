import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { UtilsService } from './services/utils.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidenavComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  screenWidth: number = 0;

  openSideBar: boolean = false;

  constructor(private sidebarService: UtilsService) {
    this.sidebarService.sideBarState$.subscribe(state => {
      this.openSideBar = state;
    })
  }

  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.sidebarService.toogleSideBar(true);
  }

}
