import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
  { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
  { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
];


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menuItems: any[];

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}
