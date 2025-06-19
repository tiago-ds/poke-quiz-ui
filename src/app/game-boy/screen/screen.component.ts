import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { PokemonData } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-screen',
	imports: [CommonModule],
	templateUrl: './screen.component.html',
	styleUrl: './screen.component.scss',
})
export class ScreenComponent implements OnInit, OnChanges {
	@Input() pokemonData: PokemonData | null = null;

	backgroundUrl: string = '';

	private backgroundPrefix = '../../../assets/';

	private setRandomBackground(): void {
		if (this.backgroundImages.length === 0) {
			return;
		}
		const randomIndex = Math.floor(
			Math.random() * this.backgroundImages.length
		);
		this.backgroundUrl = `${this.backgroundPrefix}${this.backgroundImages[randomIndex]}-bg.png`;
	}

	private backgroundImages: string[] = [
		'city',
		'desert',
		'forest',
		'savannah',
		'snow',
	];

	ngOnInit(): void {
		this.setRandomBackground();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['pokemonData'] && changes['pokemonData'].currentValue) {
			this.setRandomBackground();
		}
	}
}
