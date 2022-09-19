import { useEffect, useState } from "react";
import QuizItem from "./QuizItem";

const Quiz = ({ questions }) => {
  const [quizItems, setQuizItems] = useState([]);

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
      }));

      setQuizItems(() => handleAnswer);
    } else {
      throw console.error();
    }
  };

  const checkAnswers = () => {
    console.log("check ans clicked");
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
      <button className="check-answers" onClick={checkAnswers}>
        Check answers
      </button>
    </div>
  );
};

export default Quiz;
