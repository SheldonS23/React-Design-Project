import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

//API Key
const API_URL = 'http://www.omdbapi.com?apikey=e7fb3055'

//Sample Contents from Movies
// const movie1 = {
//     "Title": "Spiderman",
//     "Year": "2010",
//     "imdbID": "tt1785572",
//     "Type": "movie",
//     "Poster": "N/A"
// }

//Main Application
const App = () => {
    //States
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //Use API
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    //Initial Search Movie Effect
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    //Application Return
    return (
        <div className="app">
            <h1>Film Application</h1>

            {/** Set up Search Bar and Functionality */}
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {/** Populate Movies Based on Search*/}
            {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )}

        </div>
    );
}

export default App;