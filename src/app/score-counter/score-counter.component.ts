import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-score-counter',
	templateUrl: './score-counter.component.html',
	styleUrl: './score-counter.component.scss',
})
export class ScoreCounterComponent {
	@Input() currentScore = 0;
	@Input() currentStreak = 0;
}
