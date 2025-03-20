import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { hash, timeStamp, publicKey } from "../config"

const BrowseCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                let url = `http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=100`;
                
                if (searchTerm) {
                    url += `&nameStartsWith=${searchTerm}`;
                }

                const response = await axios.get(url);
                
                if (response.data && response.data.data && response.data.data.results) {
                    setCharacters(response.data.data.results);
                    setError(null);
                } else {
                    setError('No characters found');
                    setCharacters([]);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch characters');
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchCharacters();
        }, 500); // Debounce search

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <div className="browse-characters">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Marvel characters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginBottom: '1rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
            </div>
            
            <div className="character-grid">
                {loading ? (
                    <div className="loading">Loading characters...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : characters.length === 0 ? (
                    <div className="no-results">No characters found</div>
                ) : (
                    characters.map((character) => (
                        <Link 
                            to={`/characters/${character.id}`} 
                            key={character.id} 
                            className="character-card"
                        >
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                            />
                            <div>
                                <h3>{character.name}</h3>
                                <p>{character.description || 'No description available.'}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default BrowseCharacters;