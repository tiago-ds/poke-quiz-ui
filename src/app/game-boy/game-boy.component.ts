import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class GameBoyComponent implements OnInit {
	pokemonData: PokemonData | null = null;
	quizOptions: Array<string> = [];
	selectedTypes: string[] = [];
	public boundRenderPokemonData!: () => void;

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.boundRenderPokemonData = this.renderPokemonData.bind(this);
		this.renderPokemonData();

		// Mocked data to avoid too many requests for the API
		// this.pokemonData = {
		// 	pokemonName: 'belossom',
		// 	types: ['grass', 'poison'],
		// 	spriteUrl:
		// 		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/182.png',
		// };
		// this.quizOptions = generateTypeQuestion(this.pokemonData.types);
	}

	renderPokemonData(): void {
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
}
