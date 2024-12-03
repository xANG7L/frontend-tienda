import { Component } from '@angular/core';
import { INavbar, navBarData } from '../../data/navbar-data';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink, NgClass
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
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
export class SidenavComponent {

  navabarData: INavbar[] = [];

  constructor(){
    this.navabarData = navBarData;
  }
  
  openClose(data: INavbar){
    data.open = !data.open;
  }
}
