import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/licitacao',     title: 'Licitações',         icon:'nc-bank',              class: '' },
    { path: '/contrato',      title: 'Contratos',          icon:'nc-single-copy-04',    class: '' },
    { path: '/sobre',         title: 'Quem Somos',              icon:'nc-alert-circle-i',    class: '' },


];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css'],
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
