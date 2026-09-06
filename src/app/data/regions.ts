import { Region } from '../types';

/**
 * The single source of truth for regions: the national dex range a region
 * covers and the badge shown in the selector.
 */
export const REGIONS: readonly Region[] = [
	{ name: 'kanto', badgeImage: 'assets/badges/kanto-badge.png', start: 1, end: 151 },
	{ name: 'johto', badgeImage: 'assets/badges/johto-badge.png', start: 152, end: 251 },
	{ name: 'hoenn', badgeImage: 'assets/badges/hoenn-badge.png', start: 252, end: 386 },
	{ name: 'sinnoh', badgeImage: 'assets/badges/sinnoh-badge.png', start: 387, end: 493 },
	{ name: 'unova', badgeImage: 'assets/badges/unova-badge.png', start: 494, end: 649 },
	{ name: 'kalos', badgeImage: 'assets/badges/kalos-badge.png', start: 650, end: 721 },
	{ name: 'alola', badgeImage: 'assets/badges/alola-stone.png', start: 722, end: 809 },
	{ name: 'galar', badgeImage: 'assets/badges/galar-badge.png', start: 810, end: 905 },
	{ name: 'paldea', badgeImage: 'assets/badges/paldea-badge.png', start: 906, end: 1010 },
];
