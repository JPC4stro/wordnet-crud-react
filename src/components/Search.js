import React, { useState } from 'react';
import '../App.css';

function Search({ addWord }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setErrorMessage('Por favor, ingresa una palabra para buscar.');
            return;
        }

        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm.trim()}`
            );
            const data = await response.json();

            if (response.status === 404 || data.title === 'No Definitions Found') {
                setErrorMessage('No se encontraron resultados para esta palabra.');
                return;
            }

            setErrorMessage('');
            addWord(searchTerm.trim());
            setSearchTerm('');
        } catch (error) {
            console.error('Error al buscar la palabra:', error);
            setErrorMessage('Hubo un problema al conectarse con la API. Intenta de nuevo.');
        }
    };

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Escribe una palabra..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default Search;
