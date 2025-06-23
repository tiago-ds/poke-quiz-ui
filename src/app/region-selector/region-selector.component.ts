import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

interface Region {
	name: string;
	badgeImage: string;
}

@Component({
	selector: 'app-region-selector',
	templateUrl: './region-selector.component.html',
	styleUrls: ['./region-selector.component.scss'],
	imports: [CommonModule],
})
export class RegionSelectorComponent {
	@Output() regionsConfirmed = new EventEmitter<string[]>();

	regions: Region[] = [
		{ name: 'kanto', badgeImage: 'assets/badges/kanto-badge.png' },
		{ name: 'johto', badgeImage: 'assets/badges/johto-badge.png' },
		{ name: 'hoenn', badgeImage: 'assets/badges/hoenn-badge.png' },
		{ name: 'sinnoh', badgeImage: 'assets/badges/sinnoh-badge.png' },
		{ name: 'unova', badgeImage: 'assets/badges/unova-badge.png' },
		{ name: 'kalos', badgeImage: 'assets/badges/kalos-badge.png' },
		{ name: 'alola', badgeImage: 'assets/badges/alola-stone.png' },
		{ name: 'galar', badgeImage: 'assets/badges/galar-badge.png' },
		{ name: 'paldea', badgeImage: 'assets/badges/paldea-badge.png' },
	];

	selectedRegions: string[] = [];

	regionsChanged = false;

	selectRegion(region: Region): void {
		this.regionsChanged = true;
		const index = this.selectedRegions.indexOf(region.name);

		if (index > -1) {
			this.selectedRegions.splice(index, 1);
		} else {
			this.selectedRegions.push(region.name);
		}
	}

	confirmRegions() {
		this.regionsConfirmed.emit(this.selectedRegions);
		this.regionsChanged = false;
	}
}
