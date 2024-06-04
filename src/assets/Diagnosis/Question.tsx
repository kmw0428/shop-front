import React, { useEffect, useState } from "react";

interface Props {
  question: string;
  options: { text: string; score: number }[];
  onAnswer: (index: number, score: number) => void;
  selectedOption: number | null;
}

const Question: React.FC<Props> = ({ question, options, onAnswer, selectedOption }) => {
  const [selected, setSelected] = useState<number | null>(selectedOption);

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  const handleClick = (index: number, score: number) => {
    if (selected !== index) {
      setSelected(index);
      onAnswer(index, score);
    }
  };

  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="question">
      <h3>{renderTextWithLineBreaks(question)}</h3>
      {options.map((option, index) => (
        <div
          key={index}
          className={`option ${selected === index ? "selected" : ""}`}
          onClick={() => handleClick(index, option.score)}
        >
          <label>
            <input
              type="radio"
              name={question}
              value={option.score}
              checked={selected === index}
              onChange={() => handleClick(index, option.score)}
              style={{ display: "none" }}
            />
            {renderTextWithLineBreaks(option.text)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Question;
