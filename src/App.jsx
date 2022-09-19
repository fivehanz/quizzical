import { useState, useEffect } from "react";
import "./App.scss";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const [questions, setQuestions] = useState([]);

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
      <Quiz questions={questions} />
    </div>
  );
}

export default App;
