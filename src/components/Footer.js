import React from 'react';
import '../App.css';

function Footer() {
    return (
        <footer>
            <p>&copy; 2024 WordNet-Tool. Todos los derechos reservados.</p>
            <p>
                <a href="mailto:wordnet@gmail.com">Contacto: wordnet@gmail.com</a>
            </p>
            <div className="social-media">
                <a href="https://github.com/JPC4stro/wordnet-crud-react/">Github</a>
            </div>
        </footer>
    );
}

export default Footer;
