import { Component } from '@angular/core';
import { FaConfig } from '@fortawesome/angular-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'licitacoesecontratosFrontend';

  faCoffee = faCoffee;

  home = faHome

  constructor(faConfig: FaConfig) {
    faConfig.fixedWidth = true;
  }

}
