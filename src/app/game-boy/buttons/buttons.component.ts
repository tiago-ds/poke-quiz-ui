import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuizOptionComponent } from './quiz-option/quiz-option.component';
import { PokemonData } from '../../types';

@Component({
	selector: 'app-buttons',
	imports: [CommonModule, QuizOptionComponent],
	templateUrl: './buttons.component.html',
	styleUrl: './buttons.component.scss',
})
export class ButtonsComponent implements OnChanges {
	@Input() options: string[] = [];
	@Input() pokemonData: PokemonData | null = null;
	@Input() renderPokemonData: () => void = () => {};

	selectedTypes: string[] = [];
	submissionMessage: string = '';
	isCorrect: boolean = false;

	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes['pokemonData'] &&
			changes['pokemonData'].currentValue !==
				changes['pokemonData'].previousValue
		) {
			console.log(
				'ButtonsComponent: New Pokémon data detected. Resetting state.'
			);
			this.selectedTypes = []; // Clear previously selected types
			this.submissionMessage = ''; // Clear previous feedback message
			this.isCorrect = false; // Reset correctness flag
			// The individual quiz-option components will also need to reset their visual state
			// This will be handled by passing the `isChecked` prop in the HTML (see Step 3).
		}
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
				this.submissionMessage = 'Correct! Well done!';
				this.isCorrect = true;
			} else {
				this.submissionMessage = `Oops! The correct type${
					this.pokemonData.types.length > 1 ? 's are' : ' is'
				} ${this.pokemonData.types.join(' and ')}.`;
				this.isCorrect = false;
			}

			setTimeout(() => {
				this.submissionMessage = '';
				this.renderPokemonData();
			}, 3000);
		} else {
			alert('No Pokemon data available to check types.');
		}
	}
}
