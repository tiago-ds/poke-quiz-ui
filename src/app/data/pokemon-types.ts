/** Every type a quiz answer can be drawn from. */
export const POKEMON_TYPES = [
	'bug',
	'dark',
	'dragon',
	'electric',
	'fairy',
	'fighting',
	'fire',
	'flying',
	'ghost',
	'grass',
	'ground',
	'ice',
	'normal',
	'poison',
	'psychic',
	'rock',
	'steel',
	'water',
] as const;

/** Shown in each option slot until the first Pokémon has loaded. */
export const PLACEHOLDER_TYPE = 'empty';

/** How many options a question offers. */
export const OPTIONS_PER_QUESTION = 4;
