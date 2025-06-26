import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizOptionComponent } from './quiz-option/quiz-option.component';
import { PokemonData } from '../../types';

@Component({
	selector: 'app-buttons',
	imports: [CommonModule, QuizOptionComponent],
	templateUrl: './buttons.component.html',
	styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
	@Input() options: string[] = [];
	@Input() pokemonData: PokemonData | null = null;
	@Input() renderPokemonData: () => void = () => {};

	selectedTypes: string[] = [];
	submissionMessage: string = '';
	isCorrect: boolean = false;

	@Output() guessSubmitted = new EventEmitter<{
		isCorrect: boolean;
		pointsAwarded: number;
	}>();

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
				this.guessSubmitted.emit({ isCorrect: true, pointsAwarded: 1 });
			} else {
				this.submissionMessage = `Oops! The correct type${
					this.pokemonData.types.length > 1 ? 's are' : ' is'
				} ${this.pokemonData.types.join(' and ')}.`;
				this.isCorrect = false;

				this.guessSubmitted.emit({
					isCorrect: false,
					pointsAwarded: -1,
				});
			}

			setTimeout(() => {
				this.submissionMessage = '';
				this.isCorrect = false;
				this.selectedTypes = [];

				this.renderPokemonData();
			}, 2000);
		} else {
			alert('No Pokemon data available to check types.');
		}
	}
}
