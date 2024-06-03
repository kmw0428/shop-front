import React, { useEffect, useState } from "react";
import Question from "./Question";
import "./Diagnosis.css";

const questionsPart1 = [
    {
        question: "1.클렌징 후에 아무것도 바르지 않고 2~3시간 후에 밝은 빛 아래서 거울을 보면 이마와 볼이 어떻게 보이고 느껴집니까?",
        options: [
            { text: "매우 거칠고, 버석거리고 각질이 들떠 보입니다.", score: 1 },
            { text: "당깁니다.", score: 2 },
            { text: "당기지 않고 건조해 보이지 않고 번들거리지 않습니다.", score: 3 },
            { text: "밝은 빛에 반사되는 듯이 번들 거립니다.", score: 4 },
        ],
    },
    {
        question: "2.사진을 찍었을 때, 피부가 번들거립니까?",
        options: [
            { text: "그렇치 않습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
        ],
    },
    {
        question: "3.메이크업 파운데이션(파우더는 안 바른 상태)을 바른지 2~3시간 후에 메이크업 상태가 어떻습니까?",
        options: [
            { text: "약간 들떠보이고 주름진 부분이 나타납니다.", score: 1 },
            { text: "부드러워 보입니다.", score: 2 },
            { text: "번들거립니다.", score: 3 },
            { text: "고정이 안되고 번들거립니다.", score: 4 },
            { text: "파운데이션을 바르지 않습니다.", score: 2.5 },
        ],
    },
    {
        question: "4.건조할 때 모이스처라이즈를 바르지 않으면 피부가 어떠합니까?",
        options: [
            { text: "건조하고 갈라질 것 같습니다.", score: 1 },
            { text: "당김을 느낍니다.", score: 2 },
            { text: "정상적 입니다.", score: 3 },
            { text: "번들거리고 모이스처라이저가 필요 없습니다.", score: 4 },
            { text: "잘 모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "5.확대경으로 보았을 때, 모공이 많고 사이즈가 커 보입니까?",
        options: [
            { text: "아니오.", score: 1 },
            { text: "이마와 코가 두드러져 보입니다.", score: 2 },
            { text: "적당히 보입니다.", score: 3 },
            { text: "많이 보입니다.", score: 4 },
            { text: "잘 모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "6.평소 당신의 피부 타입을 어떻게 생각하고 계십니까?",
        options: [
            { text: "건성", score: 1 },
            { text: "중성", score: 2 },
            { text: "복합", score: 3 },
            { text: "지성", score: 4 },
        ],
    },
    {
        question: "7.거품이 많이 나는 비누를 사용할 때 피부 상태는 어떠합니까?",
        options: [
            { text: "건조하고 갈리집니다.", score: 1 },
            { text: "약간 건조하고 갈라지지는 않습니다.", score: 2 },
            { text: "정상입니다.", score: 3 },
            { text: "금방 유분기가 올라옵니다.", score: 4 },
            { text: "비누나 거품이 나는 클렌저를 사용하지 않습니다.(그 이유가 피부가 건조해져서 그렇다면 1번을 선택하십시오.)", score: 2.5 },
        ],
    },
    {
        question: "8.모이스처라이저를 바르지 않았을 때 피부가 당기는 느낌이 있습니까?",
        options: [
            { text: "항상 그렇습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "거의 그렇지 않습니다.", score: 3 },
            { text: "결코 그렇지 않습니다.", score: 4 },
        ],
    },
    {
        question: "9.화이트헤드나 블랙헤드가 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 그렇지 않습니다.", score: 2 },
            { text: "때때로 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
        ],
    },
    {
        question: "10.이마와 코 부위가 번들거리는 느낌이 있습니까?",
        options: [
            { text: "그렇지 않습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
        ],
    },
    {
        question: "11.모이스처라이저를 바르고 2~3시간 후 볼 부위의 피부상태는 어떻습니까?",
        options: [
            { text: "매우 거칠고, 각질이 일어나거나 또는 각질이 떨어집니다.", score: 1 },
            { text: "부드럽습니다.", score: 2 },
            { text: "조금 번들거림이 있습니다.", score: 3 },
            { text: "번들거리고 기름집니다.", score: 4 },
        ],
    },
];

const questionsPart2 = [
    {
        question: "1.얼굴에 붉은 여드름이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.", score: 2 },
            { text: "최소의 달에 한 번 정도 나타납니다.", score: 1 },
            { text: "최소 주에 한 번 정도 나타납니다.", score: 2 },
        ],
    },
    {
        question: "2.클렌저, 토너, 모이스처라이저를 비롯한 화장품을 피부에 적용했을 때 발진이나, 가렵고 쏘는듯한 증상이 나타납니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "제품을 바르지 않습니다.", score: 2.5 },
        ],
    },
    {
        question: "3.여드름이나 로사시아로 진단받은 적이 있습니까?",
        options: [
            { text: "아니오.", score: 1 },
            { text: "다른 사람들이 볼 때 그렇다고 합니다.", score: 2 },
            { text: "약간 그렇습니다.", score: 3 },
            { text: "심각한 정도입니다.", score: 4 },
            { text: "모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "4.악세서리를 하면 피부에 무언가 얼마나 자주 올라옵니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "5.자외선 차단체 사용 후 피부가 가렵거나 붉게 타는 듯한 느낌이 나거나 여드름이 올라온 적이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "6.아토피, 습진 또는 접촉성 피부염으로 진단밭은 적이 있습니까?",
        options: [
            { text: "아니오.", score: 1 },
            { text: "다른 사람들이 볼 때 그렇다고 합니다.", score: 2 },
            { text: "네, 약간 그렇습니다.", score: 3 },
            { text: "네, 심각한 정도입니다.", score: 4 },
            { text: "모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "7.반지를 꼈던 자리에 붉게 발진이 나타납니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "반지를 끼지 않습니다.", score: 2.5 },
        ],
    },
    {
        question: "8.향이 강한 화장품을 사용 후 피부가 간지럽거나 건조하고 뒤집어진 적이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "위와 같은 타입의 제품을 사용하지 않습니다.(그 이유가 위의 현상 때문이라면 1번을 체크해주세요)", score: 4 },
        ],
    },
    {
        question: "9.여행 시 호텔에서 제공되는 화장품을 사용하고 나서 문제가 없었습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.", score: 2 },
            { text: "피부가 간지럽고 붉어지고 또는 무언가 올라옵니다.", score: 3 },
            { text: "사용하지 않습니다. 과거에 문제를 겪었기 때문입니다.", score: 4 },
            { text: "평소 쓰는 제품을 사용하기 때문에 잘 모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "10. 가족 중에 아토피, 습진, 알레르기, 천식을 가지고 있는사람이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "한 명 정도 있습니다.", score: 2 },
            { text: "여러 명 있습니다.", score: 3 },
            { text: "많습니다.", score: 4 },
            { text: "잘 모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "11.향기나는 세제나 정전기 방지제를 사용한 옷을 입을 때 어떻습니까?",
        options: [
            { text: "괜찮습니다.", score: 1 },
            { text: "약간 드라이합니다.", score: 2 },
            { text: "가렵습니다.", score: 3 },
            { text: "가렵고 무언가 올라옵니다.", score: 4 },
            { text: "사용하지 않거나 잘 모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "12.운동, 스트레스, 감정 변화등으로 얼굴과 목이 얼마나 자주 붉어집니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
        ],
    },
    {
        question: "13.술을 마시면 피부가 붉어지거나 타는 듯한 느낌이 얼마나 자주 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "음주를 하지 않습니다.", score: 2.5 },
        ],
    },
    {
        question: "14.매운 음식이나 뜨거운 음식을 먹으면 피부가 붉어지거나 달아오르는 느낌이 얼마나 자주 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "매운 음식을 먹지 않습니다.(그 이유가 위의 현상 때문이라면 1번을 체크해주세요)", score: 2.5 },
        ],
    },
    {
        question: "15.얼굴과 특히 코 주변에 눈에 띄는 붉음증이나 혈관 확장된 부분이 얼마나 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "거의 없습니다.(코를 포함해서 1~3부분)", score: 2 },
            { text: "약간 있습니다.(코를 포함해서 4~6부분)", score: 3 },
            { text: "많습니다.(코를 포함해서 7부분 이상)", score: 4 },
        ],
    },
    {
        question: "16.사진 찍을 때 얼굴이 붉습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
        ],
    },
    {
        question: "17.실제로 선번을 입지 않았는데도 그렇게 보여집니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "항상 선번을 입습니다.", score: 2.5 },
        ],
    },
    {
        question: "18.스킨케어 및 메이크업 제품으로 피부가 가렵거나, 붓거나, 붉어지는 증상을 가지고 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "제품을 사용하지 않는다(그 이유가 위의 현상때문이라면 4번을 체크해주세요)", score: 2.5 },
        ],
    },
    {
        question: "19.피부과 전문의로부터 여드름, 로사시아, 접촉성 피부염, 습진 등을 진단을 받은적 있습니까?",
        options: [
            { text: "없습니다.", score: 0 },
            { text: "네, 있습니다.", score: 5 },
            { text: "피부과 전문의가 아닌 다른 의사들로부터 위 증상들을 진단 받았습니다.", score: 2 },
        ],
    },
];

const questionsPart3 = [
    {
        question: "1.여드름이나 피부 속으로 파고드는 인그로운 헤어가 발생한 후에 다크스팟이 생깁니까?",
        options: [
            { text: "없거나 본적 없습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "자주 그렇습니다.", score: 3 },
            { text: "항상 그렇습니다.", score: 4 },
            { text: "여드름이나 인그로운 헤어가 없습니다.", score: 2.5 },
        ],
    },
    {
        question: "2.무언가에 베이거나 상처가 생기고 난 후, 어둡거나 붉은 기가 얼마나 오래도록 남아있습니까?",
        options: [
            { text: "없거나 본 적 없습니다.", score: 1 },
            { text: "1주 정도 남아있습니다.", score: 2 },
            { text: "몇 주 정도 남아있습니다.", score: 3 },
            { text: "여러 달 남아 있습니다.", score: 4 },
        ],
    },
    {
        question: "3.임신이나 피임약 복용, 호르몬 대체요법 시 과하게 색소침착된 부분이 얼마나 많이 있었습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "한 구역 있습니다.", score: 2 },
            { text: "여러 구역 있습니다.", score: 3 },
            { text: "엄청 많습니다.", score: 4 },
            { text: "본인에게 해당이 되지 않습니다. (남성이거나 임신 및 피임약, 호르몬 대체요법을 경험한 적이 없다)", score: 2.5 },
        ],
    },
    {
        question: "4.윗입술이나 양 볼에 어두운 부분이 있습니까? 또는 과거에 있었던 적이 있어 시술 등으로 제거했습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "잘 모르겠습니다.", score: 2 },
            { text: "약간 보입니다.", score: 3 },
            { text: "여러 부분 보입니다.", score: 4 },
        ],
    },
    {
        question: "5.햇빛을 오래 쬐면 피부 위에 있는 어두운 부분들이 더 심해집니까?",
        options: [
            { text: "어두운 패치 부위가 없습니다.", score: 1 },
            { text: "잘 모르겠습니다.", score: 2 },
            { text: "약간 심해집니다.", score: 3 },
            { text: "많이 심해집니다.", score: 4 },
            { text: "선크림을 매일 바르고 가급적 햇빛을 보지 않습니다.(그 이유가 위의 현상 때문이라면 4번을 체크해주세요)", score: 2.5 },
        ],
    },
    {
        question: "6.기미, 종 옅거나 어두운 갈색 또는 회색의 스팟이 있다고 진단받은 적이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "그런 적이 있지만 지금은 없습니다.", score: 2 },
            { text: "지금도 있습니다.", score: 3 },
            { text: "심각하게 많습니다.", score: 4 },
            { text: "잘 모르겠습니다.", score: 2.5 },
        ],
    },
    {
        question: "7.얼굴, 가슴, 등 또는 팔에 작은 갈색 스팟들을 가지고 있거나 가졌던 적이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "약간 있습니다.(1~5개)", score: 2 },
            { text: "많이 있습니다.(6~15개)", score: 3 },
            { text: "엄청 많습니다.(16개 이상)", score: 4 },
        ],
    },
    {
        question: "8.몇 달 만에 처음으로 햇빛에 노출되었을 때 피부는 어떻습니까?",
        options: [
            { text: "빨갛게 변합니다.", score: 1 },
            { text: "붉게 변하고나서 어두워집니다.", score: 2 },
            { text: "점점 어두워집니다.", score: 3 },
            { text: "피부가 검거나 검게 변했다는 것을 잘 모르겠습니다.", score: 4 },
        ],
    },
    {
        question: "9.몇 일 동안 지속적으로 햇볕을 본다면 무슨 일이 일어납니까?",
        options: [
            { text: "선번과 물집이 나타나나 피부 색은 변화하지 않습니다.", score: 1 },
            { text: "피부가 좀 더 어두워 집니다.", score: 2 },
            { text: "피부가 이미 검은 편입니다.", score: 3 },
            { text: "잘 모르겠습니다.", score: 4 },
        ],
    },
    {
        question: "10.염색을 하지 않았을 때 원래 머리색은 무슨 색 입니까?",
        options: [
            { text: "금발입니다.", score: 1 },
            { text: "갈색입니다.", score: 2 },
            { text: "검정색입니다.", score: 3 },
            { text: "붉은색입니다.", score: 4 },
        ],
    },
    {
        question: "태양에 노출된 부분에 다크스팟이 잘 생깁니까?",
        options: [
            { text: "아니오.", score: 0 },
            { text: "네, 잘 생깁니다.", score: 5 },
        ],
    },
];

const questionsPart4 = [
    {
        question: "1.얼굴에 주름이 있습니까?",
        options: [
            { text: "아니오, 웃거나 찡그리거나 눈썹을 들어올려도 주름이 생기지 않습니다.", score: 1 },
            { text: "표정을 지을 때만 생깁니다.", score: 2 },
            { text: "표정을 지을 때도 생기고 표정을 짓지 않아도 주름이 있습니다.", score: 3 },
            { text: "별다른 표정을 짓고 있지 않아도 주름이 많이 있습니다.", score: 4 },
        ],
    },
    {
        question: "(※2~7번을 답할 때 자신만을 바라보지 말고 직계가족이나 먼 친척까지도 생각하면서 답변해주세요.)  2.당신의 어머니의 피부 나이는 얼마로 보이십니까?",
        options: [
            { text: "나이보다 5~10년 어려 보입니다.", score: 1 },
            { text: "나이 그대로 보입니다.", score: 2 },
            { text: "5년 정도 더 나이 들어 보입니다.", score: 3 },
            { text: "5년 이상 더 나이들어 보입니다.", score: 4 },
            { text: "알아볼 수 있는 문제가 아닙니다.(입양 또는 전혀 기억이 안남)", score: 2.5 },
        ],
    },
    {
        question: "3.당신의 아버지의 피부 나이는 얼마로 보이십니까?",
        options: [
            { text: "나이보다 5~10년 어려 보입니다.", score: 1 },
            { text: "나이 그대로 보입니다.", score: 2 },
            { text: "5년 정도 더 나이 들어 보입니다.", score: 3 },
            { text: "5년 이상 더 나이들어 보입니다.", score: 4 },
            { text: "알아볼 수 있는 문제가 아닙니다.(입양 또는 전혀 기억이 안남)", score: 2.5 },
        ],
    },
    {
        question: "4.당신의 외할머니의 피부 나이는 얼마로 보이십니까?",
        options: [
            { text: "나이보다 5~10년 어려 보입니다.", score: 1 },
            { text: "나이 그대로 보입니다.", score: 2 },
            { text: "5년 정도 더 나이 들어 보입니다.", score: 3 },
            { text: "5년 이상 더 나이들어 보입니다.", score: 4 },
            { text: "알아볼 수 있는 문제가 아닙니다.(입양 또는 전혀 기억이 안남)", score: 2.5 },
        ],
    },
    {
        question: "5.당신의 외할아버지의 피부 나이는 얼마로 보이십니까?",
        options: [
            { text: "나이보다 5~10년 어려 보입니다.", score: 1 },
            { text: "나이 그대로 보입니다.", score: 2 },
            { text: "5년 정도 더 나이 들어 보입니다.", score: 3 },
            { text: "5년 이상 더 나이들어 보입니다.", score: 4 },
            { text: "알아볼 수 있는 문제가 아닙니다.(입양 또는 전혀 기억이 안남)", score: 2.5 },
        ],
    },
    {
        question: "6.당신의 친할머니의 피부 나이는 얼마로 보이십니까?",
        options: [
            { text: "나이보다 5~10년 어려 보입니다.", score: 1 },
            { text: "나이 그대로 보입니다.", score: 2 },
            { text: "5년 정도 더 나이 들어 보입니다.", score: 3 },
            { text: "5년 이상 더 나이들어 보입니다.", score: 4 },
            { text: "알아볼 수 있는 문제가 아닙니다.(입양 또는 전혀 기억이 안남)", score: 2.5 },
        ],
    },
    {
        question: "7.당신의 친할아버지의 피부 나이는 얼마로 보이십니까?",
        options: [
            { text: "나이보다 5~10년 어려 보입니다.", score: 1 },
            { text: "나이 그대로 보입니다.", score: 2 },
            { text: "5년 정도 더 나이 들어 보입니다.", score: 3 },
            { text: "5년 이상 더 나이들어 보입니다.", score: 4 },
            { text: "알아볼 수 있는 문제가 아닙니다.(입양 또는 전혀 기억이 안남)", score: 2.5 },
        ],
    },
    {
        question: "8. 살면서 2주 이상 피부를 태닝 했던 적이 있습니까? 만약 했다면 얼마나 반복했습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "1~5년 정도 반복했습니다.", score: 2 },
            { text: "5~10년 정도 반복했습니다.", score: 3 },
            { text: "10년 이상 반복했습니다.", score: 4 },
        ],
    },
    {
        question: "9.계절에 따라서 2주 이상 태닝 프로그램을 진행한 적이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "1~5년 정도 반복했습니다.", score: 2 },
            { text: "5~10년 정도 반복했습니다.", score: 3 },
            { text: "10년 이상 반복했습니다.", score: 4 },
        ],
    },
    {
        question: "10.거주지를 기준으로 하루에 얼마나 많이 태양에 노출됩니까?",
        options: [
            { text: "거의 없습니다. 대부분 실내에 머물고 햇빛을 많이 보는 곳이 아닙니다.", score: 1 },
            { text: "약간 그렇습니다. 햇빛이 강하지는 않으나 일반적으로 해를 보고 삽니다.", score: 2 },
            { text: "적당히 그렇습니다. 꽤 햇빛에 노출되어 지냅니다.", score: 3 },
            { text: "꽤 많습니다. 적도 인근 국가로 햇빛이 쨍쨍한 지역에 삽니다.", score: 4 },
        ],
    },
    {
        question: "11.본인은 겉보기에 나이가 어느 정도 되어 보입니까?",
        options: [
            { text: "나이보다 5~10년 젊어 보입니다.", score: 1 },
            { text: "나이 그대로 보입니다.", score: 2 },
            { text: "5년 정도 더 나이 들어 보입니다.", score: 3 },
            { text: "5년 이상 더 나이들어 보입니다.", score: 4 },
        ],
    },
    {
        question: "12. 최근 5년동안 실외 스포츠나 활동 등으로 피부를 햇빛에 오래도록 노출한 적이 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "한 달에 한 번 있습니다.", score: 2 },
            { text: "일주일에 한 번 있습니다.", score: 3 },
            { text: "매일 그렇습니다.", score: 4 },
        ],
    },
    {
        question: "13.태닝을 받는다면 얼마나 자주 방문합니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "1~5번 정도 방문합니다.", score: 2 },
            { text: "5~10번 정도 방문합니다.", score: 3 },
            { text: "상당히 많이 방문합니다.", score: 4 },
        ],
    },
    {
        question: "14.살면서 흡연한 경험이 있습니까? 만약 흡연자라면 얼마나 자주 담배를 핍니까? 혹은 담배 피는 환경에 얼마나 자주 노출 되어 있습니까?",
        options: [
            { text: "없습니다.", score: 1 },
            { text: "몇 보루 정도 폈습니다.", score: 2 },
            { text: "여러 보루 폈습니다.", score: 3 },
            { text: "매일 담배를 핍니다.", score: 4 },
            { text: "흡연은 하지 않지만 흡연자와 같은 환경에 살고 있습니다.", score: 2.5 },
        ],
    },
    {
        question: "15.거주하는 곳의 공기 오염도는 어떻습니까?",
        options: [
            { text: "맑고 깨끗합니다.", score: 1 },
            { text: "맑고 깨끗한 때도 있고 그렇지 않을 때도 있습니다.", score: 2 },
            { text: "약간 오염되어 있습니다.", score: 3 },
            { text: "공기 오염이 심합니다.", score: 4 },
        ],
    },
    {
        question: "16.레타놀, 레틴-A, 디페린과 같은 비타민 페이셜 크림을 얼마나 오래 사용하셨나요?",
        options: [
            { text: "수년 동안 꾸준히 사용했습니다.", score: 1 },
            { text: "때때로 그렇습니다.", score: 2 },
            { text: "어렸을 때 여드름으로 인해 사용한 적 있습니다.", score: 3 },
            { text: "없습니다.", score: 4 },
        ],
    },
    {
        question: "17.평소 과일과 채소를 얼마나 자주 드십니까?",
        options: [
            { text: "매일 먹습니다.", score: 1 },
            { text: "하루에 한 번 먹습니다.", score: 2 },
            { text: "때때로 챙겨 먹습니다.", score: 3 },
            { text: "아예 먹지 않습니다.", score: 4 },
        ],
    },
    {
        question: "18.하루 먹는 것 중에서 과일과 채소가 차지하는 비율은 얼마나 됩니까?",
        options: [
            { text: "75~100%", score: 1 },
            { text: "25~75%", score: 2 },
            { text: "10~15%", score: 3 },
            { text: "0~10%", score: 4 },
        ],
    },
    {
        question: "19.본연의 피부색은 어떻습니까?",
        options: [
            { text: "어둡습니다.", score: 1 },
            { text: "중간 톤입니다.", score: 2 },
            { text: "밝은 톤입니다.", score: 3 },
            { text: "매우 밝은 톤입니다.", score: 4 },
        ],
    },
    {
        question: "20.당신의 인종은 어떻게 됩니까?",
        options: [
            { text: "아프리칸, 아메리칸", score: 1 },
            { text: "아시안", score: 2 },
            { text: "라틴", score: 3 },
            { text: "코카시언", score: 4 },
        ],
    },
    {
        question: "만 65세가 넘었으셨습니까?",
        options: [
            { text: "아니오.", score: 0 },
            { text: "네, 그렇습니다.", score: 5 },
        ],
    },
];

const partTitles = [
    "Part 1: 건성(D) - 지성(O)",
    "Part 2: 민감성(S) - 저항성(R)",
    "Part 3: 색소성(P) - 비색소성(N)",
    "Part 4: 주름(W) - 탄력(T)",
];

const DiagnosisSkin: React.FC = () => {
    const totalQuestions = questionsPart1.length + questionsPart2.length + questionsPart3.length + questionsPart4.length;
    const [part, setPart] = useState(1);
    const [answers, setAnswers] = useState<number[]>(Array(totalQuestions).fill(null));


    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [part]);

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
        
        if (part1Score >= 34) {
            result += "약지성피부(O)";
        } else if (part1Score >= 27) {
            result += "약간 지성피부";
        } else if (part1Score >= 17) {
            result += "약간 건성피부";
        } else {
            result += "건성피부(D)";
        }

        result += ", ";

        if (part2Score >= 34) {
            result += "매우 민감피부(S)";
        } else if (part2Score >= 30) {
            result += "약간 민감 피부";
        } else if (part2Score >= 25) {
            result += "약간 저항성이 있는 피부";
        } else {
            result += "저항성이 강한 피부(R)";
        }

        result += ", ";

        if (part3Score >= 31) {
            result += "과색소침착피부(P)";
        } else {
            result += "비과색소침착피부(N)";
        }

        result += ", ";

        if (part4Score >= 41) {
            result += "주름에 취약한 피부(W)";
        } else {
            result += "탄력 있는 피부(T)";
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

export default DiagnosisSkin;