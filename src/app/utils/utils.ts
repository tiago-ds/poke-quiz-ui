const regionNationalDexNumbers = [
	{ region: 'kanto', start: 1, end: 151 },
	{ region: 'johto', start: 152, end: 251 },
	{ region: 'hoenn', start: 252, end: 386 },
	{ region: 'sinnoh', start: 387, end: 493 },
	{ region: 'unova', start: 494, end: 649 },
	{ region: 'kalos', start: 650, end: 721 },
	{ region: 'alola', start: 722, end: 809 },
	{ region: 'galar', start: 810, end: 905 },
	{ region: 'paldea', start: 906, end: 1010 },
];

export const getRandomDexNumber = (selectedRegions: string[]) => {
	console.log(selectedRegions);
	const selectedRanges = regionNationalDexNumbers.filter((region) =>
		selectedRegions.includes(region.region)
	);

	const allNumbers: number[] = [];

	selectedRanges.forEach((range) => {
		for (let i = range.start; i <= range.end; i++) {
			allNumbers.push(i);
		}
	});

	console.log(allNumbers);

	const randomIndex = Math.floor(Math.random() * allNumbers.length);
	return allNumbers[randomIndex];
};

const types = [
	'bug',
	'dragon',
	'electric',
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
	'water',
	'steel',
	'dark',
];

const shuffleArray = (array: Array<string>): Array<string> => {
	let remainingElements = array.length;

	while (remainingElements > 0) {
		const randomIndex = Math.floor(Math.random() * remainingElements);
		remainingElements--;

		const temp = array[remainingElements];
		array[remainingElements] = array[randomIndex];
		array[randomIndex] = temp;
	}

	return array;
};

export const generateTypeQuestion = (
	correctTypes: Array<string>
): Array<string> => {
	const alternatives = [...correctTypes];

	const wrongTypesPool = types.filter((type) => !correctTypes.includes(type));

	while (alternatives.length < 4) {
		const randomIndex = Math.floor(Math.random() * wrongTypesPool.length);
		const randomWrongType = wrongTypesPool[randomIndex];

		alternatives.push(randomWrongType);

		wrongTypesPool.splice(randomIndex, 1);
	}

	return shuffleArray(alternatives);
};
