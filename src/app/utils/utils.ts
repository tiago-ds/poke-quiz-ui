import { OPTIONS_PER_QUESTION, POKEMON_TYPES } from '../data/pokemon-types';
import { REGIONS } from '../data/regions';

/**
 * Picks a national dex number uniformly at random across every selected
 * region, or null when nothing is selected.
 */
export const getRandomDexNumber = (selectedRegions: string[]): number | null => {
	const ranges = REGIONS.filter((region) =>
		selectedRegions.includes(region.name)
	);

	const total = ranges.reduce(
		(count, range) => count + (range.end - range.start + 1),
		0
	);

	if (total === 0) {
		return null;
	}

	let offset = Math.floor(Math.random() * total);

	for (const range of ranges) {
		const size = range.end - range.start + 1;

		if (offset < size) {
			return range.start + offset;
		}

		offset -= size;
	}

	return null;
};

/** Returns a shuffled copy, leaving the input untouched. */
const shuffle = <T>(items: readonly T[]): T[] => {
	const shuffled = [...items];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
};

/**
 * Builds the answer options for a question: every correct type, padded out
 * with distinct wrong ones, in random order.
 */
export const generateTypeQuestion = (correctTypes: string[]): string[] => {
	const wrongTypesPool = POKEMON_TYPES.filter(
		(type) => !correctTypes.includes(type)
	);

	const alternatives = [...correctTypes];

	while (
		alternatives.length < OPTIONS_PER_QUESTION &&
		wrongTypesPool.length > 0
	) {
		const randomIndex = Math.floor(Math.random() * wrongTypesPool.length);

		alternatives.push(wrongTypesPool[randomIndex]);
		wrongTypesPool.splice(randomIndex, 1);
	}

	return shuffle(alternatives);
};

/** True when both lists hold the same types, regardless of order. */
export const isSameTypeSet = (a: string[], b: string[]): boolean =>
	a.length === b.length && [...a].sort().join() === [...b].sort().join();
