import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [statement, setStatement] = useState('');
    const [inputText, setInputText] = useState('');
    const [correctChars, setCorrectChars] = useState(0);
    const [WPM, setWPM] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [time, setTime] = useState(0);
    const [testCompleted, setTestCompleted] = useState(false);
    const [dataResults, setDataResults] = useState([]);

    useEffect(() => {
        // Initialize dataResults from localStorage
        const storedResults = localStorage.getItem("resultTyping");
        if (storedResults) {
            setDataResults(JSON.parse(storedResults));
        }
        getRandomStatement();
    }, []);

    const getRandomStatement = () => {
        axios.get('https://random-word-api.herokuapp.com/word?number=25')
            .then(({ data }) => {
                setStatement(data.join(' '));
                resetTest();
            })
            .catch(error => {
                console.error('Error fetching words:', error);
                // Fallback statement in case API fails
                setStatement('The quick brown fox jumps over the lazy dog. This is a sample text for typing practice.');
                resetTest();
            });
    };

    const resetTest = () => {
        setInputText('');
        setCorrectChars(0);
        setWPM(0);
        setAccuracy(0);
        setStartTime(0);
        setTime(0);
        setTestCompleted(false);
        const input = document.querySelector("#typing");
        if (input) input.value = "";
    };

    const handleInputChange = (e) => {
        if (testCompleted) return;

        const value = e.target.value;

        // Start timer on first character
        if (value.length === 1 && inputText.length === 0) {
            setStartTime(Date.now());
        }

        setInputText(value);

        // Calculate correct characters
        let correct = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === statement[i]) {
                correct++;
            }
        }
        setCorrectChars(correct);

        // Check if test is completed
        if (value.trim() === statement.trim()) {
            finishTest();
        }
    };

    const finishTest = () => {
        const endTime = Date.now();
        const timeInSeconds = Math.floor((endTime - startTime) / 1000);
        setTime(timeInSeconds);

        // Calculate WPM (assuming 5 characters per word)
        const words = statement.length / 5;
        const minutes = timeInSeconds / 60;
        const wpm = Math.round(words / minutes);
        setWPM(wpm);

        // Calculate accuracy
        const acc = Math.round((correctChars / statement.length) * 100);
        setAccuracy(acc); 
        setTestCompleted(true);
    };

    useEffect(() => {
        if (testCompleted) {
            const newResult = {
                article_typing: statement,
                wpm_typing: WPM,
                accuracy_typing: accuracy,
                time_typing: time
            };
            
            const updatedResults = [...dataResults, newResult];
            setDataResults(updatedResults);
            localStorage.setItem("resultTyping", JSON.stringify(updatedResults));
        }
    }, [testCompleted]);

    return (
        <div className="container">
            <h1>SpeedType Master</h1>
            <p>Improve your typing skills with our interactive test.</p>

            <form onSubmit={(e) => e.preventDefault()}>
                <article>
                    {statement.split('').map((char, index) => {
                        let color = 'white';
                        if (index < inputText.length) {
                            color = inputText[index] === char ? 'green' : 'red';
                        }
                        return (
                            <span key={index} style={{ color }}>{char}</span>
                        );
                    })}
                </article>

                <input
                    id="typing"
                    value={inputText}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Write it now"
                    disabled={testCompleted}
                />

                <div className="btns">
                    <button type="button" onClick={finishTest} disabled={testCompleted}>
                        Submit
                    </button>
                    <button type="button" onClick={getRandomStatement}>
                        Reset
                    </button>
                </div>

                {(WPM && time && accuracy) ? (
                    <div className="results">
                        <div className="box">
                            <h2>WPM</h2>
                            <span>{WPM}</span>
                        </div>
                        <div className="box">
                            <h2>Time</h2>
                            <span>{time}s</span>
                        </div>
                        <div className="box">
                            <h2>Accuracy</h2>
                            <span>{accuracy}%</span>
                        </div>
                    </div>
                ) : null}
            </form>
        </div>
    );
}

export default HomePage;