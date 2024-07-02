import React, { useState, useEffect } from 'react';
import { questions as questionsData } from "../data";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const QuestionCard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Mezcla las preguntas una vez cuando el componente se monta
    setQuestions(shuffleArray([...questionsData]));
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [...currentQuestion.incorrect_answer, currentQuestion.correct_answer];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerClick = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = answer === currentQuestion.correct_answer;
    setSelectedAnswer(answer);
    setIsAnswerCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }, 3000);
  };

  const handleRestart = () => {
    setQuestions(shuffleArray([...questionsData])); // Mezcla las preguntas de nuevo
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowResult(false);
  };

  if (questions.length === 0) {
    return <div>Cargando...</div>;
  }

  if (showResult) {
    return (
      <div className="w-full h-[45vh] max-w-3xl mx-auto p-4 border rounded-lg shadow-md text-center">
        <p className="text-xl font-semibold mb-4">Resultado final</p>
        <p className="text-lg mb-6">Respuestas correctas: {score} de {questions.length}!</p>
        <button
          onClick={handleRestart}
          className="bg-amarillo text-white px-4 py-2 rounded-full font-medium font-neue"
        >
          Volver a jugar
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full h-[45vh] max-w-3xl mx-auto p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 font-neue">{currentQuestionIndex + 1} de {questions.length}</span>
      </div>
      <div className="text-center mb-6">
        <p className="text-xl font-semibold font-neue">
          {currentQuestion.question}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`px-6 py-3 rounded-full font-medium font-neue ${
              selectedAnswer === answer
                ? isAnswerCorrect
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-morado text-white'
            }`}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            setQuestions(shuffleArray([...questionsData])); // Mezcla las preguntas de nuevo
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
          }}
          className="font-neue bg-amarillo border-2 border-amarillo text-white px-4 py-2 rounded-full font-medium"
        >
          Reiniciar juego
        </button>
      </div>
    </div>
  );
};
