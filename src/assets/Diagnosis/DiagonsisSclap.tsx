import React, { useEffect, useRef, useState } from "react";
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
        question: "4. 이마 또는 가르마가 넓어지고 두피가 보인다.",
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
    "Part 1 : 건성(D) - 지성 및 지루성(O)",
    "Part 2 : 탈모 진행(A) - 정상(N)",
    "Part 3 : 두피 민감(S) - 비민감(R)",
    "Part 4 : 모발 손상(H) - 비손상(I)",
];

const DiagnosisSclap: React.FC = () => {
    const totalQuestions = questionsPart1.length + questionsPart2.length + questionsPart3.length + questionsPart4.length;
    const [part, setPart] = useState(1);
    const [answers, setAnswers] = useState<number[]>(Array(totalQuestions).fill(null));
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [part]);

    const handleAnswer = (index: number, score: number) => {
        console.log(`Question index: ${index}, Selected score: ${score}`);
        const newAnswers = [...answers];
        newAnswers[index] = score;
        setAnswers(newAnswers);
    };

    const nextPart = () => {
        if (isPartComplete()) {
            setPart(prev => prev + 1);
        } else {
            alertAndScrollToIncomplete();
        }
    };

    const isPartComplete = () => {
        switch (part) {
            case 1:
                return answers.slice(0, questionsPart1.length).every(answer => answer !== null);
            case 2:
                return answers.slice(questionsPart1.length, questionsPart1.length + questionsPart2.length).every(answer => answer !== null);
            case 3:
                return answers.slice(questionsPart1.length + questionsPart2.length, questionsPart1.length + questionsPart2.length + questionsPart3.length).every(answer => answer !== null);
            case 4:
                return answers.slice(questionsPart1.length + questionsPart2.length + questionsPart3.length, questionsPart1.length + questionsPart2.length + questionsPart3.length + questionsPart4.length).every(answer => answer !== null);
            default:
                return false;
        }
    };

    const isAllPartsComplete = () => {
        return answers.every(answer => answer !== null);
    };

    const alertAndScrollToIncomplete = () => {
        alert('모든 질문에 응답해 주세요.');
        const firstIncompleteIndex = answers.findIndex(answer => answer === null);
        const questionDiv = questionRefs.current[firstIncompleteIndex];
        if (questionDiv) {
            questionDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            questionDiv.focus();
        }
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

        if (part1Score >= 5) {
            result += "D";
        } else {
            result += "O";
        }

        result += ", ";

        if (part2Score >= 3) {
            result += "A";
        } else {
            result += "N";
        }

        result += ", ";

        if (part3Score >= 3) {
            result += "S";
        } else {
            result += "R";
        }

        result += ", ";

        if (part4Score >= 3) {
            result += "H";
        } else {
            result += "I";
        }

        return result;
    };

    const handleSubmit = () => {
        if (isAllPartsComplete()) {
            const { part1Score, part2Score, part3Score, part4Score } = calculatePartScores();
            const result = getResult(part1Score, part2Score, part3Score, part4Score);
            alert(`테스트 완료! 결과: ${result}`);
            window.location.href = `/sclapresult?part1=${part1Score}&part2=${part2Score}&part3=${part3Score}&part4=${part4Score}&result=${result}`;
        } else {
            alertAndScrollToIncomplete();
        }
    };

    const renderQuestions = () => {
        let questions;
        let offset = 0;

        switch (part) {
            case 1:
                questions = questionsPart1;
                break;
            case 2:
                questions = questionsPart2;
                offset = questionsPart1.length;
                break;
            case 3:
                questions = questionsPart3;
                offset = questionsPart1.length + questionsPart2.length;
                break;
            case 4:
                questions = questionsPart4;
                offset = questionsPart1.length + questionsPart2.length + questionsPart3.length;
                break;
            default:
                return null;
        }

        return questions.map((q, index) => (
            <div ref={el => questionRefs.current[offset + index] = el} key={index}>
                <Question
                    question={q.question}
                    options={q.options}
                    onAnswer={(optionIndex, score) => handleAnswer(offset + index, score)}
                    selectedOption={answers[offset + index] !== null ? index : null} // index로 selectedOption 전달
                    />
            </div>
        ));
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
