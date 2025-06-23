import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoyComponent } from './game-boy/game-boy.component';
import { RegionSelectorComponent } from './region-selector/region-selector.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		GameBoyComponent,
		RegionSelectorComponent,
		CommonModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'poke-quiz';

	selectedRegions: string[] = [];

	onSelectedRegionsChange(selectedRegions: string[]) {
		this.selectedRegions = [...selectedRegions];
	}
}
