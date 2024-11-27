import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';
import Footer from './components/Footer';
import './App.css';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [font, setFont] = useState(localStorage.getItem('font') || 'Arial');
    const [words, setWords] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const savedWords = localStorage.getItem('words');
        if (savedWords) {
            setWords(JSON.parse(savedWords));
        }
        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            if (words.length > 0) {
                localStorage.setItem('words', JSON.stringify(words));
            } else {
                localStorage.removeItem('words');
            }
        }
    }, [words, isInitialLoad]);

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        document.body.style.fontFamily = font;
        localStorage.setItem('font', font);
    }, [font]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const addWord = async (searchTerm) => {
        if (typeof searchTerm !== 'string' || !searchTerm.trim()) {
            setErrorMessage('Por favor, introduce una palabra válida.');
            return;
        }

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm.trim()}`);
            const data = await response.json();

            if (data.title === 'No Definitions Found') {
                setErrorMessage('No se encontraron resultados para esa palabra.');
                return;
            }

            setErrorMessage('');

            const firstWord = data[0] || {};
            const phonetics = firstWord.phonetics?.[0]?.text || 'Transcripción fonética no disponible';
            const phoneticAudio = firstWord.phonetics?.[0]?.audio;
            const meanings = firstWord.meanings || [];

            const filteredMeanings = meanings.slice(0, 1).map((meaning) => {
                const firstDefinition = meaning?.definitions?.[0];
                return {
                    partOfSpeech: meaning?.partOfSpeech || 'Desconocido',
                    definition: firstDefinition?.definition || 'No disponible',
                    example: firstDefinition?.example || 'Ninguno',
                    synonyms: (firstDefinition?.synonyms?.slice(0, 1) || ['Ninguno']).join(', '),
                };
            }) || [];

            const formattedWord = {
                word: firstWord.word || 'Desconocida',
                phonetics,
                phoneticAudio,
                meanings: filteredMeanings,
                sourceUrls: Array.from(new Set(firstWord.sourceUrls || [])),
            };

            setWords((prevWords) => {
                const existingWordIndex = prevWords.findIndex((word) => word.word === formattedWord.word);
                if (existingWordIndex !== -1) {
                    const updatedWords = prevWords.filter((word) => word.word !== formattedWord.word);
                    return [formattedWord, ...updatedWords];
                }
                return [formattedWord, ...prevWords];
            });
        } catch (error) {
            console.error('Error al buscar la palabra:', error);
            setErrorMessage('Hubo un problema al buscar la palabra. Inténtalo de nuevo.');
        }
    };

    const deleteWord = (wordToDelete) => {
        const updatedWords = words.filter((word) => word.word !== wordToDelete);
        setWords(updatedWords);
    };

    return (
        <div className="App">
            <Header theme={theme} font={font} setFont={setFont} toggleTheme={toggleTheme} />
            <main>
                <Search addWord={addWord} errorMessage={errorMessage} /> {/*mensaje de error*/}
                <Results words={words} deleteWord={deleteWord} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
