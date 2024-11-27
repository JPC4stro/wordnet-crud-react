import React from 'react';
import '../App.css';

function Header({ theme, font, setFont, toggleTheme }) {
    return (
        <header>
            <div className="logo-container">
                <h1>WordNet</h1>
            </div>
            <div className="settings">
                <select value={font} onChange={(e) => setFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Courier New, Courier, monospace">Courier New</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Times New Roman, Times, serif">Times New Roman</option>
                    <option value="Verdana, sans-serif">Verdana</option>
                </select>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? 'Modo Oscuro 🌑' : 'Modo Claro 🌞'}
                </button>
            </div>
        </header>
    );
}

export default Header;
