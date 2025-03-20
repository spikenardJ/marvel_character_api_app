import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { hash, timeStamp, publicKey } from "../config";

const CharacterDetails = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                setLoading(true);
                const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
                
                const response = await axios.get(url);
                
                if (response.data?.data?.results?.[0]) {
                    setCharacter(response.data.data.results[0]);
                    setError(null);
                } else {
                    setError('Character not found');
                }
            } catch (err) {
                console.error('API Error:', err);
                setError(err.message || 'Failed to fetch character details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCharacterDetails();
        }
    }, [id]);

    if (loading) {
        return <div className="loading">Loading character details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!character) {
        return <div className="no-results">No character found</div>;
    }

    return (
        <div className="character-detail">
            <div className="character-detail-card">
                <img 
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`.replace('http:', 'https:')}
                    alt={character.name}
                />
                <div className="character-info">
                    <h1>{character.name}</h1>
                    <p className="description">
                        {character.description || 'No description available.'}
                    </p>
                    
                    {character.comics?.items?.length > 0 && (
                        <div className="comics-section">
                            <h2>Featured Comics</h2>
                            <ul className="comics-list">
                                {character.comics.items.slice(0, 5).map((comic, index) => (
                                    <li key={index}>{comic.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {character.series?.items?.length > 0 && (
                        <div className="series-section">
                            <h2>Featured Series</h2>
                            <ul className="series-list">
                                {character.series.items.slice(0, 5).map((series, index) => (
                                    <li key={index}>{series.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;