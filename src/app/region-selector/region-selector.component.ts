import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { REGIONS } from '../data/regions';
import { Region } from '../types';

@Component({
	selector: 'app-region-selector',
	templateUrl: './region-selector.component.html',
	styleUrls: ['./region-selector.component.scss'],
	imports: [NgFor],
})
export class RegionSelectorComponent {
	@Output() regionsConfirmed = new EventEmitter<string[]>();

	readonly regions = REGIONS;

	selectedRegions: string[] = [];

	toggleRegion({ name }: Region): void {
		this.selectedRegions = this.selectedRegions.includes(name)
			? this.selectedRegions.filter((region) => region !== name)
			: [...this.selectedRegions, name];
	}

	confirmRegions(): void {
		this.regionsConfirmed.emit(this.selectedRegions);
	}
}
