import React, { useState } from "react";

interface Props {
  question: string;
  options: { text: string; score: number }[];
  onAnswer: (score: number) => void;
}

const Question: React.FC<Props> = ({ question, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionChange = (index: number, score: number) => {
    setSelectedOption(index);
    onAnswer(score);
  };

  return (
    <div className="question">
      <h3>{question}</h3>
      {options.map((option, index) => (
        <div
          key={index}
          className={`option ${selectedOption === index ? "selected" : ""}`}
          onClick={() => handleOptionChange(index, option.score)}
        >
          <input
            type="radio"
            id={`${question}-${index}`}
            name={question}
            value={option.score}
            checked={selectedOption === index}
            onChange={() => handleOptionChange(index, option.score)}
            onClick={(e) => e.stopPropagation()}
          />
          <label htmlFor={`${question}-${index}`}>{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default Question;
