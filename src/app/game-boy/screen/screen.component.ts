import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonData } from '../../types';

const BACKGROUNDS = ['city', 'desert', 'forest', 'savannah', 'snow'];

@Component({
	selector: 'app-screen',
	templateUrl: './screen.component.html',
	styleUrl: './screen.component.scss',
})
export class ScreenComponent implements OnChanges {
	@Input() pokemonData!: PokemonData;

	@Input() isLoading = false;

	backgroundUrl = '';

	/** Each new Pokémon lands in a different habitat. */
	ngOnChanges(changes: SimpleChanges): void {
		if (!changes['pokemonData']) {
			return;
		}

		const background =
			BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

		this.backgroundUrl = `assets/backgrounds/${background}-bg.png`;
	}
}
