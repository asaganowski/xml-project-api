import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { XmlListComponent } from './xml/components/xml-list/xml-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, XmlListComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
