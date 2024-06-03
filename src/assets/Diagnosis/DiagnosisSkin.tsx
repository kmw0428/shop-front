import React, { useState } from "react";
import Question from "./Question";
import "./Diagnosis.css";

const questions = [
    {
        question: "1.클렌징 후에 아무것도 바르지 않고 2~3시간 후에 밝은 빛 아래서 거울을 보면 이마와 볼이 어떻게 보이고 느껴집니까?",
        options: [
            {text: "매우 거칠고, 버석거리고 각질이 들떠 보입니다.", score: 1},
            {text: "당깁니다.", score: 2},
            {text: "당기지 않고 건조해 보이지 않고 번들거리지 않습니다.", score: 3},
            {text: "밝은 빛에 반사되는 듯이 번들 거립니다.", score: 4},
        ],
    },
    {
        question: "2.사진을 찍었을 때, 피부가 번들거립니까?",
        options: [
            {text: "그렇치 않습니다.", score: 1},
            {text: "때때로 그렇습니다.", score: 2},
            {text: "자주 그렇습니다.", score: 3},
            {text: "항상 그렇습니다.", score: 4},
        ],
    },
    {
        question: "3.메이크업 파운데이션(파우더는 안 바른 상태)을 바른지 2~3시간 후에 메이크업 상태가 어떻습니까?",
        options: [
            {text: "약간 들떠보이고 주름진 부분이 나타납니다.", score: 1},
            {text: "부드러워 보입니다.", score: 2},
            {text: "번들거립니다.", score: 3},
            {text: "고정이 안되고 번들거립니다.", score: 4},
            {text: "파운데이션을 바르지 않습니다.", score: 2.5},
        ],
    },
    {
        question: "4.건조할 때 모이스처라이즈를 바르지 않으면 피부가 어떠합니까?",
        options: [
            {text: "건조하고 갈라질 것 같습니다.", score: 1},
            {text: "당김을 느낍니다.", score: 2},
            {text: "정상적 입니다.", score: 3},
            {text: "번들거리고 모이스처라이저가 필요 없습니다.", score: 4},
            {text: "잘 모르겠습니다.", score: 2.5},
        ],
    },
    {
        question: "5.확대경으로 보았을 때, 모공이 많고 사이즈가 커 보입니까?",
        options: [
            {text: "아니오.", score: 1},
            {text: "이마와 코가 두드러져 보입니다.", score: 2},
            {text: "적당히 보입니다.", score: 3},
            {text: "많이 보입니다.", score: 4},
            {text: "잘 모르겠습니다.", score: 2.5},
        ],
    },
    {
        question: "6.평소 당신의 피부 타입을 어떻게 생각하고 계십니까?",
        options: [
            {text: "건성", score: 1},
            {text: "중성", score: 2},
            {text: "복합", score: 3},
            {text: "지성", score: 4},
        ],
    },
    {
        question: "7.거품이 많이 나는 비누를 사용할 때 피부 상태는 어떠합니까?",
        options: [
            {text: "건조하고 갈리집니다.", score: 1},
            {text: "약간 건조하고 갈라지지는 않습니다.", score: 2},
            {text: "정상입니다.", score: 3},
            {text: "금방 유분기가 올라옵니다.", score: 4},
            {text: "비누나 거품이 나는 클렌저를 사용하지 않습니다.(그 이유가 피부가 건조해져서 그렇다면 1번을 선택하십시오.)", score: 2.5},
        ],
    },
    {
        question: "8.모이스처라이저를 바르지 않았을 때 피부가 당기는 느낌이 있습니까?",
        options: [
            {text: "항상 그렇습니다.", score: 1},
            {text: "때때로 그렇습니다.", score: 2},
            {text: "거의 그렇지 않습니다.", score: 3},
            {text: "결코 그렇지 않습니다.", score: 4},
        ],
    },
    {
        question: "9.화이트헤드나 블랙헤드가 있습니까?",
        options: [
            {text: "없습니다.", score: 1},
            {text: "거의 그렇지 않습니다.", score: 2},
            {text: "때때로 그렇습니다.", score: 3},
            {text: "항상 그렇습니다.", score: 4},
        ],
    },
    {
        question: "10.이마와 코 부위가 번들거리는 느낌이 있습니까?",
        options: [
            {text: "그렇지 않습니다.", score: 1},
            {text: "때때로 그렇습니다.", score: 2},
            {text: "자주 그렇습니다.", score: 3},
            {text: "항상 그렇습니다.", score: 4},
        ],
    },
    {
        question: "11.모이스처라이저를 바르고 2~3시간 후 볼 부위의 피부상태는 어떻습니까?",
        options: [
            {text: "매우 거칠고, 각질이 일어나거나 또는 각질이 떨어집니다.", score: 1},
            {text: "부드럽습니다.", score: 2},
            {text: "조금 번들거림이 있습니다.", score: 3},
            {text: "번들거리고 기름집니다.", score: 4},
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
            <h2>Part1 건성(D) - 지성(O)</h2><hr />
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