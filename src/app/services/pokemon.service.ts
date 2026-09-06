import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonData } from '../types';

type PokeApiPokemon = {
	name: string;
	sprites: { front_default: string };
	types: Array<{ type: { name: string } }>;
};

@Injectable({ providedIn: 'root' })
export class PokemonService {
	private readonly http = inject(HttpClient);

	private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

	getByDexNumber(dexNumber: number): Observable<PokemonData> {
		return this.http
			.get<PokeApiPokemon>(`${this.baseUrl}/${dexNumber}`)
			.pipe(
				map(({ name, sprites, types }) => ({
					pokemonName: name,
					types: types.map((entry) => entry.type.name),
					spriteUrl: sprites.front_default,
				}))
			);
	}
}
