import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-score-counter',
	imports: [CommonModule],
	templateUrl: './score-counter.component.html',
	styleUrl: './score-counter.component.scss',
})
export class ScoreCounterComponent implements OnChanges {
	@Input() currentScore: number = 0;
	@Input() currentStreak: number = 0;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['currentScore']) {
			this.currentScore = changes['currentScore'].currentValue;
		}

		if (changes['currentStreak']) {
			this.currentStreak = changes['currentStreak'].currentValue;
		}
	}

	createRange(number: number): number[] {
		const maxCombo = 5;
		const numToDisplay = Math.min(number, maxCombo);
		return new Array(numToDisplay).fill(0).map((n, index) => index);
	}
}
