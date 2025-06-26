import { HttpClient } from '@angular/common/http';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChange,
	SimpleChanges,
} from '@angular/core';
import { PokemonData } from '../types';
import { generateTypeQuestion, getRandomDexNumber } from '../utils/utils';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from './screen/screen.component';
import { ButtonsComponent } from './buttons/buttons.component';

@Component({
	selector: 'app-game-boy',
	imports: [CommonModule, ScreenComponent, ButtonsComponent],
	templateUrl: './game-boy.component.html',
	styleUrl: './game-boy.component.scss',
})
export class GameBoyComponent implements OnChanges {
	pokemonData: PokemonData | null = null;
	quizOptions: Array<string> = ['empty', 'empty', 'empty', 'empty'];
	selectedTypes: string[] = [];
	public boundRenderPokemonData!: () => void;

	@Input()
	selectedRegions: string[] = [];

	@Output() quizResult = new EventEmitter<{
		isCorrect: boolean;
		pointsAwarded: number;
	}>();

	constructor(private http: HttpClient) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['selectedRegions']) {
			this.onConfirmRegions();
		}
	}

	onConfirmRegions() {
		this.boundRenderPokemonData = () => this.renderPokemonData();
		this.renderPokemonData();
	}

	onQuizSubmit(event: { isCorrect: boolean; pointsAwarded: number }) {
		this.quizResult.emit({
			isCorrect: event.isCorrect,
			pointsAwarded: event.pointsAwarded,
		});
	}

	renderPokemonData(): void {
		const pokemonNumber = getRandomDexNumber(this.selectedRegions);

		if (!pokemonNumber) {
			return;
		}

		const URLRequest = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
		this.http.get(URLRequest).subscribe({
			next: (res: any) => {
				const { name, types, sprites } = res;

				this.pokemonData = {
					pokemonName: name,
					types: types.map((type: any) => type.type.name),
					spriteUrl: sprites.front_default,
				};

				if (this.pokemonData?.types) {
					this.quizOptions = generateTypeQuestion(
						this.pokemonData.types
					);
				}
			},
			error: (err) => {
				console.error(
					'An error occurred while fetching Pokemon data:',
					err
				);
			},
		});

		// Mocked data to avoid too many requests for the API
		// this.pokemonData = {
		// 	pokemonName: 'belossom',
		// 	types: ['grass', 'poison'],
		// 	spriteUrl:
		// 		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/182.png',
		// };
		if (this.pokemonData?.types) {
			this.quizOptions = generateTypeQuestion(this.pokemonData.types);
		}
	}
}
