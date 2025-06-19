import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoyComponent } from './game-boy/game-boy.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, GameBoyComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'poke-quiz';
}
