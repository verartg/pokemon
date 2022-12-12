import React, {useState, useEffect} from 'react';
import axios from "axios";

function Pokemon({name}) {
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemonData(result);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPokemon();
    }, []);

    return (
        <>
            {Object.keys(pokemonData).length > 0 &&
                <>
                    <h2>{pokemonData.data.name}</h2>
                    <img alt="Afbeelding Pokémon" src={pokemonData.data.sprites.front_default}/>
                    <p>Moves: {pokemonData.data.moves.length}</p>
                    <p>Weight: {pokemonData.data.weight}</p>
                    <ul>Abilities:
                        {pokemonData.data.abilities.map((ability) => {
                            return <li key={ability.ability.name}>{ability.ability.name}</li>
                        })}
                    </ul>
                </>
            }
        </>
    );
}

export default Pokemon;