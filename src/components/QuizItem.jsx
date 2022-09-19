import React, { useEffect } from "react";

const QuizItem = ({ answers, question, questionIndex, handleAnswerClick }) => {
  return (
    <div className="quiz--item">
      <h2
        className="quiz--item-title"
        dangerouslySetInnerHTML={{ __html: question }}
      ></h2>

      <div className="quiz--item-options">
        {answers.map((ans, index) => (
          <button
            key={ans.answerId}
            id={ans.answerId}
            className={`quiz--item-option button ${
              ans.isSelected ? "selected" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: ans.value }}
            onClick={() => handleAnswerClick(questionIndex, index)}
          ></button>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default QuizItem;
