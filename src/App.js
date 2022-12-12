import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Pokemon from "./components/Pokemon";
import Button from "./components/Button"

function App() {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchEmAll() {
            toggleLoading(true);
            setError(false);

            try {
                const result = await axios.get(currentPage);
                setNextPage(result.data.next);
                setPrevPage(result.data.previous);
                setPokemonArray(result.data.results);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            toggleLoading(false);
        }

        fetchEmAll();
    }, [currentPage]);

    function gotoNextPage() {
        setCurrentPage(nextPage);
    }

    function gotoPrevPage() {
        setCurrentPage(prevPage);
    }


    return (
        <>
            <ul>
                {pokemonArray.map((pokemon) => {
                    return <Pokemon name={pokemon.name}/>
                })}
            </ul>
            <Button
                disabled={!prevPage}
                clickHandler={() => gotoPrevPage}
            >Vorige
            </Button>
            <Button
                disabled={!nextPage}
                clickHandler={() => gotoNextPage()}
            >Volgende
            </Button>

            {loading && <p>"loading..."</p>}
            {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
        </>
    );
}

export default App;
