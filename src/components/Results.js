import React from 'react';
import '../App.css';

const Results = ({ words, deleteWord }) => {
  if (!Array.isArray(words)) {
    console.error("Se esperaba un array para 'words', pero no es un array:", words);
    return null;
  }

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="results">
      {words.length === 0 ? (
        <p>No hay palabras guardas disponibles.</p>
      ) : (
        words.map((word, index) => {
          if (!word || !word.meanings || !Array.isArray(word.meanings)) {
            console.error("Estructura de datos incorrecta para la palabra:", word);
            return null; // Si la palabra no tiene el formato esperado, se omite
          }

          return (
            <div key={index} className="word-item">
              <h3>{word.word}</h3>
              <p>{word.phonetics || 'Pronunciación no disponible'}</p>

              {/* reproducir audio si esta disponible */}
              {word.phoneticAudio && (
                <button onClick={() => playAudio(word.phoneticAudio)}>Escuchar Pronunciación 🔊</button>
              )}

              {word.meanings.length > 0 ? (
                word.meanings.map((meaning, idx) => (
                  <div key={idx} className="meaning">
                    <p><strong>Categoría gramatical:</strong> {meaning.partOfSpeech || 'Desconocida'}</p>
                    <p><strong>Definición:</strong> {meaning.definition || 'No disponible'}</p>
                    <p><strong>Ejemplo:</strong> {meaning.example || 'Ninguno'}</p>
                    <p><strong>Sinónimos:</strong> {meaning.synonyms || 'Ninguno'}</p>
                  </div>
                ))
              ) : (
                <p>No hay significados disponibles.</p>
              )}

              <button onClick={() => deleteWord(word.word)}>Eliminar</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Results;
