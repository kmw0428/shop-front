import React, { useState } from "react";
import Question from "./Question";
import "./Diagnosis.css";

const questionsPart1 = [
    {
        question: "1. 고객님에게 가장 가까운 상태를 체크해주세요.",
        options: [
            { text: "하루 이상 샴푸를 하지 않으면 두피와 모발이 기름진다.", score: 2 },
            { text: "샴푸 후 하루가 지나도 기름지지 않는다", score: -2 },
        ],
    },
    {
        question: "2. 고객님에게 가장 가까운 상태를 체크해주세요.",
        options: [
            { text: "두피를 긁으면 피지나 비듬, 각질이 떨어져 나온다.", score: 1 },
            { text: "건조한 두피로 인해 마른 비듬각질이 떨어진다.", score: -1 },
            { text: "선택사항 없음", score: 0 },
        ],
    },
    {
        question: "3. 고객님에게 가장 가까운 상태를 체크해주세요.",
        options: [
            { text: "피지가 많아 두피나 모발이 기름진다.", score: 2 },
            { text: "두피와 모발이 건조하다.", score: -2 },
            { text: "선택사항 없음", score: 0 },
        ],
    },
    {
        question: "4. 고객님에게 가장 가까운 상태를 체크해주세요.",
        options: [
            { text: "과도한 피지로 인해 가려움을 느낀다.", score: 1 },
            { text: "두피가 건조해서 가려움을 느낀다.", score: -1 },
            { text: "선택사항 없음", score: 0 },
        ],
    },
];

const questionsPart2 = [
    {
        question: "1. 샴푸(세정)을 할때 모발이 많이 빠진다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "2. 모발이 가늘어졌다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "3. 모발에 힘이 없고 볼륨이 쉽게 죽는다.",
        options: [
            { text: "YES", score: 1 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "4. 샴푸(세정)을 할때 모발이 많이 빠진다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
];

const questionsPart3 = [
    {
        question: "1. 두피가 붉고 울긋불긋 하다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "2. 두피에 뾰루지(트러블)가 만져진다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "3. 두피에 열이나고 후끈거린다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "4. 두피를 만지면 통증이 있다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
];

const questionsPart4 = [
    {
        question: "1. 모발이 푸석하고 쉽게 엉킨다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "2. 잦은 화학적시술(펌/염색)로 인해 모발이 많이 손상되어 있다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "3. 모발에 힘이 없고 늘어진다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
    {
        question: "4. 모발이 손상되고 쉽게 끊어진다.",
        options: [
            { text: "YES", score: 2 },
            { text: "NO", score: 0 },
        ],
    },
];

const partTitles = [
    "Part 1 : 건성(D) - 지성(O)",
    "Part 2 : 탈모 진행(H) - 정상(L)",
    "Part 3 : 두피 민감(S) - 비민감(R)",
    "Part 4 : 모발 손상(Q) - 비손상(N)",
];

const DiagnosisSclap: React.FC = () => {
    const totalQuestions = questionsPart1.length + questionsPart2.length + questionsPart3.length + questionsPart4.length;
    const [part, setPart] = useState(1);
    const [answers, setAnswers] = useState<number[]>(Array(totalQuestions).fill(null));

    const handleAnswer = (index: number, score: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = score;
        setAnswers(newAnswers);
    };

    const nextPart = () => {
        setPart(prev => prev + 1);
    };

    const prevPart = () => {
        setPart(prev => prev - 1);
    };


    const calculatePartScores = () => {
        const part1Score = answers.slice(0, questionsPart1.length).reduce((acc, score) => acc + (score || 0), 0);
        const part2Score = answers.slice(questionsPart1.length, questionsPart1.length + questionsPart2.length).reduce((acc, score) => acc + (score || 0), 0);
        const part3Score = answers.slice(questionsPart1.length + questionsPart2.length, questionsPart1.length + questionsPart2.length + questionsPart3.length).reduce((acc, score) => acc + (score || 0), 0);
        const part4Score = answers.slice(questionsPart1.length + questionsPart2.length + questionsPart3.length, questionsPart1.length + questionsPart2.length + questionsPart3.length + questionsPart4.length).reduce((acc, score) => acc + (score || 0), 0);
        return { part1Score, part2Score, part3Score, part4Score };
    };

    const getResult = (part1Score: number, part2Score: number, part3Score: number, part4Score: number) => {
        let result = "";

        if (part1Score >= 3.4) {
            result += "O";
        } else if (part1Score >= 2.7) {
            result += "O";
        } else if (part1Score >= 1.7) {
            result += "D";
        } else {
            result += "D";
        }

        result += ", ";

        if (part2Score >= 3.4) {
            result += "H";
        } else if (part2Score >= 3.0) {
            result += "L";
        } else {
            result += "L";
        }

        result += ", ";

        if (part3Score >= 4) {
            result += "S";
        } else {
            result += "R";
        }

        result += ", ";

        if (part4Score >= 4) {
            result += "Q";
        } else {
            result += "N";
        }

        return result;
    };

    const handleSubmit = () => {
        const { part1Score, part2Score, part3Score, part4Score } = calculatePartScores();
        const result = getResult(part1Score, part2Score, part3Score, part4Score);
        alert(`테스트 완료! 결과: ${result}`);
        window.location.href = `/skinresult?part1=${part1Score}&part2=${part2Score}&part3=${part3Score}&part4=${part4Score}&result=${result}`;
    };


    const renderQuestions = () => {
        switch (part) {
            case 1:
                return questionsPart1.map((q, index) => (
                    <Question
                        key={index}
                        question={q.question}
                        options={q.options}
                        onAnswer={(score) => handleAnswer(index, score)}
                        selectedOption={answers[index]}
                    />
                ));
            case 2:
                return questionsPart2.map((q, index) => (
                    <Question
                        key={index}
                        question={q.question}
                        options={q.options}
                        onAnswer={(score) => handleAnswer(index + questionsPart1.length, score)}
                        selectedOption={answers[index + questionsPart1.length]}
                    />
                ));
            case 3:
                return questionsPart3.map((q, index) => (
                    <Question
                        key={index}
                        question={q.question}
                        options={q.options}
                        onAnswer={(score) => handleAnswer(index + questionsPart1.length + questionsPart2.length, score)}
                        selectedOption={answers[index + questionsPart1.length + questionsPart2.length]}
                    />
                ));
            case 4:
                return questionsPart4.map((q, index) => (
                    <Question
                        key={index}
                        question={q.question}
                        options={q.options}
                        onAnswer={(score) => handleAnswer(index + questionsPart1.length + questionsPart2.length + questionsPart3.length, score)}
                        selectedOption={answers[index + questionsPart1.length + questionsPart2.length + questionsPart3.length]}
                    />
                ));
            default:
                return null;
        }
    };

    return (
        <div className="diagnosis">
            <h2>{partTitles[part - 1]}</h2>
            <hr />
            {renderQuestions()}
            <div>
                {part > 1 && <button onClick={prevPart}>Previous</button>}
                {part < 4 ? (
                    <button onClick={nextPart}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>결과 보기</button>
                )}
            </div>
        </div>
    );
};

export default DiagnosisSclap;