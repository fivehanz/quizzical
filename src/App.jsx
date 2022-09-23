import { useState, useEffect } from "react";
import "./App.scss";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const [questions, setQuestions] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);

  // to fetch questions only once
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const get = await fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
    );

    await get
      .json()
      .then((res) => {
        const data = res.results.map((result) => {
          const rand = Math.ceil(
            Math.random() * result.incorrect_answers.length
          );
          result.incorrect_answers.splice(rand, 0, result.correct_answer);

          return {
            question: result.question,
            questionId: nanoid(),
            correctAnswer: result.correct_answer,
            answers: result.incorrect_answers.map((ans) => ({
              answerId: nanoid(),
              value: ans,
              isSelected: false,
              buttonStateClass: "",
            })),
          };
        });

        setQuestions(data);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="App">
      {startQuiz === true ? (
        <Quiz questions={questions} />
      ) : (
        <div className="landing">
          <h2 className="landing-heading">Quizzical</h2>
          <p className="landing-subtitle">some desc if needed lol</p>
          <button
            className="submit-button landing-start-quiz"
            onClick={() => setStartQuiz(true)}
          >
            Start quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
