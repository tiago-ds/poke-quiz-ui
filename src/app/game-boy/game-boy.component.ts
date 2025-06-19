import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PokemonData } from '../types';
import { generateTypeQuestion } from '../utils/constants';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from './screen/screen.component';
import { ButtonsComponent } from './buttons/buttons.component';

@Component({
	selector: 'app-game-boy',
	imports: [CommonModule, ScreenComponent, ButtonsComponent],
	templateUrl: './game-boy.component.html',
	styleUrl: './game-boy.component.scss',
})
export class GameBoyComponent {
	pokemonData: PokemonData | null = null;
	quizOptions: Array<string> = [];
	selectedTypes: string[] = []; // This array will hold the types the user has selected

	constructor(private http: HttpClient) {}

	ngOnInit() {
		const pokemonNumber = Math.floor(Math.random() * 386) + 1;
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

		// this.pokemonData = {
		// 	pokemonName: 'belossom',
		// 	types: ['grass', 'poison'],
		// 	spriteUrl:
		// 		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/182.png',
		// };

		// this.quizOptions = generateTypeQuestion(this.pokemonData.types);
	}

	onTypeSelectionChange(event: { type: string; isChecked: boolean }): void {
		if (event.isChecked) {
			if (!this.selectedTypes.includes(event.type)) {
				this.selectedTypes.push(event.type);
			}
		} else {
			this.selectedTypes = this.selectedTypes.filter(
				(t) => t !== event.type
			);
		}
	}

	onSubmit(): void {
		if (this.pokemonData) {
			const correctTypes = this.pokemonData.types.sort();
			const selectedTypesSorted = this.selectedTypes.sort();

			if (
				correctTypes.length === selectedTypesSorted.length &&
				correctTypes.every(
					(type, index) => type === selectedTypesSorted[index]
				)
			) {
				alert('Correct! You guessed all the types!');
			} else {
				alert(
					`Incorrect. The correct types are: ${correctTypes.join(
						', '
					)}.`
				);
			}
		}
	}
}
