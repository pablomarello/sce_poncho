import React, { useState, useEffect } from 'react';
import { questions as questionsData } from "../data";
import Swal from 'sweetalert2';

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
        if (score + 1 === 8) {
          Swal.fire({
            title: '¡Felicidades!',
            text: '¡Acertaste todas las preguntas!',
            imageUrl: 'src/assets/img/congrat.gif',
            imageWidth: 400, 
            imageHeight: 200,
            confirmButtonText: 'Aceptar'
          });
        }
      }
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }, 4000);
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
      <div className="w-full h-[45vh] max-w-3xl mx-auto p-6 border rounded-lg shadow-md text-center">
        <p className="text-2xl font-semibold font-neue mb-10">Resultado final</p>
        <p className="text-xl mb-16 font-neue">Respuestas correctas: {score} de {questions.length}!</p>
        <button
          onClick={handleRestart}

          className="bg-amarillo text-white px-6 py-3 rounded-xl text-2xl font-neue"

        >
          Volver a jugar
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className=" relative flex flex-col w-full h-auto max-w-3xl mx-auto p-4 rounded-lg shadow-md mt-2 mb-2">
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
            className={`px-6 py-3 rounded-2xl font-medium font-neue ${
              selectedAnswer === answer
                ? isAnswerCorrect
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : selectedAnswer && answer === currentQuestion.correct_answer
                ? 'bg-green-600 text-white'
                : 'bg-morado text-white'
            }`}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="text-right ">
        <button
          onClick={() => {
            setQuestions(shuffleArray([...questionsData])); // Mezcla las preguntas de nuevo
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
          }}
          className="font-neue border border-amarillo text-black px-4 py-2 rounded-xl font-medium"
        >
          Reiniciar juego
        </button>
      </div>
    </div>
  );
};
