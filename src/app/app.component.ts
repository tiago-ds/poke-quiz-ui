import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoyComponent } from './game-boy/game-boy.component';
import { RegionSelectorComponent } from './region-selector/region-selector.component';
import { CommonModule } from '@angular/common';
import { ScoreCounterComponent } from './score-counter/score-counter.component';

@Component({
	selector: 'app-root',
	imports: [
		CommonModule,
		GameBoyComponent,
		RegionSelectorComponent,
		ScoreCounterComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'poke-quiz';

	selectedRegions: string[] = [];
	totalScore: number = 0;
	currentStreak: number = 0;

	onSelectedRegionsChange(selectedRegions: string[]) {
		this.selectedRegions = [...selectedRegions];

		this.totalScore = 0;
		this.currentStreak = 0;
	}

	onQuizResult(result: { isCorrect: boolean; pointsAwarded: number }) {
		if (result.isCorrect) {
			this.totalScore += result.pointsAwarded;
			this.currentStreak++;
		} else {
			this.totalScore = Math.max(
				0,
				this.totalScore + result.pointsAwarded
			);
			this.currentStreak = 0;
		}
	}
}
