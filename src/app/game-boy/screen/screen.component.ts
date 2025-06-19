import { Component, Input } from '@angular/core';
import { PokemonData } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-screen',
	imports: [CommonModule],
	templateUrl: './screen.component.html',
	styleUrl: './screen.component.scss',
})
export class ScreenComponent {
	@Input() pokemonData: PokemonData | null = null;
}
