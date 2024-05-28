import React from "react";

interface Props {
    question: string;
    options: {text: string; score: number;}[];
    onAnswer: (score: number) => void;
}

const Question: React.FC<Props> = ({ question, options, onAnswer }) => {
    return (
        <div>
            <h3>{question}</h3>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={`${question}-${index}`}
                        name={question}
                        value={option.score}
                        onChange={() => onAnswer(option.score)}
                    />
                    <label htmlFor={`${question}-${index}`}>{option.text}</label>
                </div>
            ))}
        </div>
    )
}

export default Question;