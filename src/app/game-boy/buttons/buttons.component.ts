import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

	selectedTypes: string[] = [];

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
		} else {
			alert('No Pokemon data available to check types.');
		}
		window.location.reload();
	}
}
