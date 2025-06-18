import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';
import { NavbarComponent} from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularAPI';
}
