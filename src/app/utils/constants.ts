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

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

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
