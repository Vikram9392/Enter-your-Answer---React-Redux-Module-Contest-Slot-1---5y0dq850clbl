import React, { useState } from "react";

const questions = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      score: 1
    },
    {
      question: "What is the largest country in the world?",
      answer: "Russia",
      score: 1
    },
    {
      question: "What is the currency of Japan?",
      answer: "Yen",
      score: 1
    },
    {
      question: "What is the tallest mammal?",
      answer: "Giraffe",
      score: 1
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
      score: 1
    }
];

function Quiz() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (event) => {
        setAnswer(event.target.value.toLowerCase());
    };

    const handleSubmit = () => {
        if (answer === questions[questionIndex].answer.toLowerCase()) {
            setScore(score + 1);
            setAnswer("");
            setAttempts(0);
            if (questionIndex < questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
            } else {
                setGameOver(true);
            }
        } else {
            if (attempts < 2) {
                setAttempts(attempts + 1);
            } else {
                setAnswer("");
                setAttempts(0);
                if (questionIndex < questions.length - 1) {
                    setQuestionIndex(questionIndex + 1);
                } else {
                    setGameOver(true);
                }
            }
        }
    };

    const handleRetry = () => {
        setQuestionIndex(0);
        setAnswer("");
        setAttempts(0);
        setGameOver(false);
        setScore(0);
    };

    if (gameOver) {
        return (
            <div className="game-over-container">
                <h1 className="game-over-heading">Game Over</h1>
                <p className="score-para">Your score: {score}/{questions.length}</p>
                <button className="retry-btn" onClick={handleRetry}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <h1 className="question-text">{questions[questionIndex].question}</h1>
            <input className="answer-input" value={answer} onChange={handleAnswer} /><br />
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            {attempts === 1 && <p className="attempt-alert">Incorrect. Two attempts remaining.</p>}
            {attempts === 2 && <p className="attempt-alert">Incorrect. One attempt remaining.</p>}
        </div>
    );
}

export default Quiz;
