import { Component } from '@angular/core';
import { GameBoyComponent } from './game-boy/game-boy.component';
import { RegionSelectorComponent } from './region-selector/region-selector.component';
import { ScoreCounterComponent } from './score-counter/score-counter.component';
import { QuizResult } from './types';

@Component({
	selector: 'app-root',
	imports: [GameBoyComponent, RegionSelectorComponent, ScoreCounterComponent],
	templateUrl: './app.component.html',
})
export class AppComponent {
	selectedRegions: string[] = [];
	totalScore = 0;
	currentStreak = 0;

	onSelectedRegionsChange(selectedRegions: string[]): void {
		this.selectedRegions = [...selectedRegions];

		this.totalScore = 0;
		this.currentStreak = 0;
	}

	onQuizResult({ isCorrect, pointsAwarded }: QuizResult): void {
		this.totalScore = Math.max(0, this.totalScore + pointsAwarded);
		this.currentStreak = isCorrect ? this.currentStreak + 1 : 0;
	}
}
