import { NgIf } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	inject,
} from '@angular/core';
import { OPTIONS_PER_QUESTION, PLACEHOLDER_TYPE } from '../data/pokemon-types';
import { PokemonService } from '../services/pokemon.service';
import { PokemonData, QuizResult } from '../types';
import { generateTypeQuestion, getRandomDexNumber } from '../utils/utils';
import { ButtonsComponent } from './buttons/buttons.component';
import { ScreenComponent } from './screen/screen.component';

const placeholderOptions = () =>
	new Array(OPTIONS_PER_QUESTION).fill(PLACEHOLDER_TYPE);

@Component({
	selector: 'app-game-boy',
	imports: [NgIf, ScreenComponent, ButtonsComponent],
	templateUrl: './game-boy.component.html',
	styleUrl: './game-boy.component.scss',
})
export class GameBoyComponent implements OnChanges {
	private readonly pokemonService = inject(PokemonService);

	pokemonData: PokemonData | null = null;
	quizOptions: string[] = placeholderOptions();
	isLoading = false;

	@Input() selectedRegions: string[] = [];

	@Output() quizResult = new EventEmitter<QuizResult>();

	ngOnChanges(): void {
		this.loadNextPokemon();
	}

	loadNextPokemon(): void {
		const dexNumber = getRandomDexNumber(this.selectedRegions);

		if (dexNumber === null) {
			return;
		}

		this.isLoading = true;

		this.pokemonService.getByDexNumber(dexNumber).subscribe({
			next: (pokemon) => {
				this.pokemonData = pokemon;
				this.quizOptions = generateTypeQuestion(pokemon.types);
				this.isLoading = false;
			},
			error: (err) => {
				this.isLoading = false;

				console.error(
					'An error occurred while fetching Pokemon data:',
					err
				);
			},
		});
	}
}
