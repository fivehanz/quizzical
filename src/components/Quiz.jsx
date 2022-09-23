import { useEffect, useState } from "react";
import QuizItem from "./QuizItem";

const Quiz = ({ questions }) => {
  const [quizItems, setQuizItems] = useState([]);
  const [howManyCorrect, setHowManyCorrect] = useState(0);
  const [finishQuiz, setFinishQuiz] = useState(false);

  useEffect(() => {
    setQuizItems(() => questions);
  }, [questions]);

  /* change isSelected to !isSelected on selected question 
  and reverse on others in the same question */
  const handleAnswerClick = (questionIndex, answerIndex) => {
    let handleAnswer = [...quizItems];

    if (handleAnswer[questionIndex].answers[answerIndex]) {
      handleAnswer[questionIndex].answers = handleAnswer[
        questionIndex
      ].answers.map((ans, index) => ({
        ...ans,
        isSelected: index === answerIndex ? true : false,
        buttonStateClass: index === answerIndex ? "selected" : "",
      }));

      setQuizItems(() => handleAnswer);
    } else {
      throw console.error();
    }
  };

  const checkAnswers = () => {
    let check = [...quizItems];
    let correctAnswerCount = 0;

    check = check.map((item) => {
      // - check if currAns === correctAns => set buttonStateClass = "correct"
      // && if selected => increment correctAnsCount
      const processCorrectAns = (ans) => {
        // calc correctAns count
        if (ans.isSelected) {
          correctAnswerCount++;
        }
        return "correct";
      };

      // return the obj
      return {
        ...item,
        answers: item.answers.map((ans) => ({
          ...ans,
          buttonStateClass:
            // logic for checking correctAns and WrongAns;
            ans.value === item.correctAnswer
              ? processCorrectAns(ans)
              : ans.isSelected
              ? "wrong"
              : "disabled",
        })),
      };
    });

    // set the obj
    setQuizItems(() => check);
    setHowManyCorrect(correctAnswerCount);
    setFinishQuiz(true);
  };

  return (
    <div className="quiz">
      {quizItems.map((item, index) => (
        <QuizItem
          key={item.questionId}
          questionIndex={index}
          {...item}
          handleAnswerClick={handleAnswerClick}
        />
      ))}
      {finishQuiz === true ? (
        <div className="result">
          <h2>You scored {howManyCorrect}/5 correct answers</h2>
          <button
            className="submit-button quiz-button"
            onClick={() => window.location.reload()}
          >
            Play again
          </button>
        </div>
      ) : (
        <button
          className="submit-button quiz-button center"
          onClick={checkAnswers}
        >
          Check answers
        </button>
      )}
    </div>
  );
};

export default Quiz;
