import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, IonContent, TopbarComponent],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {}
