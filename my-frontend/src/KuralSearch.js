// src/components/KuralSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './KuralSearch.module.css';

const KuralSearch = () => {
    const [chapterName, setChapterName] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [verse, setVerse] = useState('');
    const [translation, setTranslation] = useState('');
    const [explanation, setExplanation] = useState('');
    const [number, setNumber] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/kurals', {
                params: {
                    chapterName,
                    sectionName,
                    verse,
                    translation,
                    explanation,
                    number
                }
            });
            setResults(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching data');
            setResults([]);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Search Thirukkural</h1>
            <div>
                <label>Chapter Name:</label>
                <input type="text" value={chapterName} onChange={(e) => setChapterName(e.target.value)} />
            </div>
            <div>
                <label>Section Name:</label>
                <input type="text" value={sectionName} onChange={(e) => setSectionName(e.target.value)} />
            </div>
            <div>
                <label>Verse:</label>
                <input type="text" value={verse} onChange={(e) => setVerse(e.target.value)} />
            </div>
            <div>
                <label>Translation:</label>
                <input type="text" value={translation} onChange={(e) => setTranslation(e.target.value)} />
            </div>
            <div>
                <label>Explanation:</label>
                <input type="text" value={explanation} onChange={(e) => setExplanation(e.target.value)} />
            </div>
            <div>
                <label>Number:</label>
                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
            <button onClick={handleSearch}>Search</button>

            {error && <p className={styles.error}>{error}</p>}

            <ul>
                {results.map((kural, index) => (
                    <li key={index}>
                        <p>Chapter Name: {kural.chapterName}</p>
                        <p>Section Name: {kural.sectionName}</p>
                        <p>Verse: {kural.verse}</p>
                        <p>Translation: {kural.translation}</p>
                        <p>Explanation: {kural.explanation}</p>
                        <p>Number: {kural.number}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KuralSearch;
