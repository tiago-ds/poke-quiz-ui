export type PokemonData = {
	pokemonName: string;
	types: string[];
	spriteUrl: string;
};

export type Region = {
	name: string;
	badgeImage: string;
	/** First national dex number in the region, inclusive. */
	start: number;
	/** Last national dex number in the region, inclusive. */
	end: number;
};

export type QuizResult = {
	isCorrect: boolean;
	pointsAwarded: number;
};
