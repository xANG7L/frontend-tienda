import { Component } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isOpen: boolean = true; 

  constructor(private sidebarService: UtilsService){}  

  openCloseSideVar(): void {
    this.isOpen = !this.isOpen
    this.sidebarService.toogleSideBar(this.isOpen);
  }

}
