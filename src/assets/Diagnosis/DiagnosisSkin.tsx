import React, { useState } from "react";
import Question from "./Question";
import "./Diagnosis.css";

const questions = [
    {
        question: "질문지1",
        options: [
            {text: "질문 1", score: 1},
            {text: "질문 2", score: 2},
            {text: "질문 3", score: 3},
            {text: "질문 4", score: 4},
        ],
    },
    {
        question: "질문지2",
        options: [
            {text: "질문 1", score: 1},
            {text: "질문 2", score: 2},
            {text: "질문 3", score: 3},
            {text: "질문 4", score: 4},
        ],
    },
    {
        question: "질문지3",
        options: [
            {text: "질문 1", score: 1},
            {text: "질문 2", score: 2},
            {text: "질문 3", score: 3},
            {text: "질문 4", score: 4},
        ],
    },
];

const DiagnosisSkin: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));

    const handleAnswer = (index: number, score: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = score;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const totalScore = answers.reduce((acc, score) => acc + score, 0);
        alert(`테스트 완료! 총 점수: ${totalScore}`);
        window.location.href = `/result?score=${totalScore}`;
    };

    return (
        <div className="diagnosis">
            {questions.map((q, index) => (
                <Question
                    key={index}
                    question={q.question}
                    options={q.options}
                    onAnswer={(score) => handleAnswer(index, score)}
                />
            ))}
            <button onClick={handleSubmit}>결과 보기</button>
        </div>
    );
};

export default DiagnosisSkin;