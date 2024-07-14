import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'products-front';
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = this.sidebarOpen? false: true;
  }
}

