import { NgFor, NgIf } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
} from '@angular/core';
import { PokemonData, QuizResult } from '../../types';
import { isSameTypeSet } from '../../utils/utils';
import {
	OptionState,
	QuizOptionComponent,
} from './quiz-option/quiz-option.component';

/** How long the answer stays revealed before the next Pokémon loads. */
const AUTO_ADVANCE_MS = 3500;

type Phase = 'answering' | 'revealed';

@Component({
	selector: 'app-buttons',
	imports: [NgFor, NgIf, QuizOptionComponent],
	templateUrl: './buttons.component.html',
	styleUrl: './buttons.component.scss',
})
export class ButtonsComponent implements OnDestroy {
	@Input() options: string[] = [];
	@Input() pokemonData: PokemonData | null = null;
	@Input() isLoading = false;

	@Output() guessSubmitted = new EventEmitter<QuizResult>();
	@Output() roundFinished = new EventEmitter<void>();

	readonly autoAdvanceMs = AUTO_ADVANCE_MS;

	phase: Phase = 'answering';
	selectedTypes: string[] = [];
	submissionMessage = '';
	isCorrect = false;

	private autoAdvanceTimer?: ReturnType<typeof setTimeout>;

	ngOnDestroy(): void {
		clearTimeout(this.autoAdvanceTimer);
	}

	/** Options stop responding once the answer is on screen. */
	get isLocked(): boolean {
		return this.phase === 'revealed' || this.isLoading;
	}

	get primaryLabel(): string {
		if (this.isLoading) {
			return 'Loading…';
		}

		return this.phase === 'revealed' ? 'Next Pokémon' : 'Submit';
	}

	get isPrimaryDisabled(): boolean {
		if (this.isLoading) {
			return true;
		}

		return (
			this.phase === 'answering' &&
			(!this.pokemonData || this.selectedTypes.length === 0)
		);
	}

	onTypeSelectionChange({
		type,
		isChecked,
	}: {
		type: string;
		isChecked: boolean;
	}): void {
		if (this.isLocked) {
			return;
		}

		this.selectedTypes = isChecked
			? [...new Set([...this.selectedTypes, type])]
			: this.selectedTypes.filter((selected) => selected !== type);
	}

	/** How a single option should render, once the answer is revealed. */
	optionState(type: string): OptionState {
		if (this.phase !== 'revealed' || !this.pokemonData) {
			return 'idle';
		}

		if (this.pokemonData.types.includes(type)) {
			return 'correct';
		}

		return this.selectedTypes.includes(type) ? 'wrong' : 'faded';
	}

	onPrimaryAction(): void {
		if (this.phase === 'revealed') {
			this.goToNextPokemon();
			return;
		}

		this.revealAnswer();
	}

	private revealAnswer(): void {
		if (!this.pokemonData) {
			return;
		}

		const correctTypes = this.pokemonData.types;

		this.phase = 'revealed';
		this.isCorrect = isSameTypeSet(correctTypes, this.selectedTypes);
		this.submissionMessage = this.isCorrect
			? 'Correct! Well done!'
			: `It's ${correctTypes.join(' and ')}.`;

		this.guessSubmitted.emit({
			isCorrect: this.isCorrect,
			pointsAwarded: this.isCorrect ? 1 : -1,
		});

		this.autoAdvanceTimer = setTimeout(
			() => this.goToNextPokemon(),
			AUTO_ADVANCE_MS
		);
	}

	private goToNextPokemon(): void {
		clearTimeout(this.autoAdvanceTimer);

		this.phase = 'answering';
		this.submissionMessage = '';
		this.isCorrect = false;
		this.selectedTypes = [];

		this.roundFinished.emit();
	}
}
