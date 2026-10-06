import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, IonContent, TopbarComponent],
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage {}
