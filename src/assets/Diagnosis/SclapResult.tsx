import React from "react";

const SclapResult: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const result = queryParams.get('result');
    const letters = result ? result.split(", ") : [];

    // 각 결과값의 타입을 정의합니다.
    const sclapTypes: { [key: string]: string } = {
        "D": "건성 - Dry : 땀과 피지의 분비량은 적고 각질 형성이 빠른 타입",
        "O": "지성 및 지루성 - Oily : 과도한 피지분비로 인해 모공이 막히기 쉽고 두피 모낭 속으로 피지가 쌓여 염증이나 트러블이 생기기 쉬운 타입",
        "A": "탈모 진행 - Alopecia : 정상적으로 모발이 존재해야 할 부위에 모발이 없는 상태로 일반적으로 두피의 성모가 빠지는 상태",
        "N": "정상 - Normal : 10~15%의 모낭이 퇴행기나 휴지기에 있어 하루 평균 50~60여 개 정도의 머리털이 빠지는 상태로 모발사이의 밀집도와 모발 굵기가 균일함",
        "S": "두피 민감 - Sensitive : 두피의 염증이나 붉은기가 육안으로도 확인 가능하며 항상 두피가 부어있어 자극에 의한 손상이 쉬운 타입",
        "R": "비민감 - Non-Sensitive : 유·수분이 고루 균형을 이루고 있으며 불순물이 없고 모공 주변이 깨끗한 상태",
        "H": "손상 모발 - Hair damage : 잦은 시술 및 외부적 요인으로 인해 모발이 잘 엉키고 끊어지며 갈라지는 상태.",
        "I": "비손상 - Intact : 모발이 굵고 강한 탄력이 있으며 큐티클이 촘촘하여 보이기에 윤기가 흐르는 상태",
    };

    // 각 타입별 추천 제품을 정의합니다. 같은 방법으로 추가 가능
    const productRecommendations: { [key: string]: { name: string, image: string, link: string }[] } = {
        "D": [
            { name: "D 추천 : 샴푸1", image: "", link: "" },
        ],
        "O": [
            { name: "O 추천 : 샴푸2", image: "", link: "" },
        ],
        "A": [
            { name: "A 추천 : 샴푸1", image: "", link: "" },
        ],
        "N": [
            { name: "N 추천 : 샴푸2", image: "", link: "" },
        ],
        "S": [
            { name: "S 추천 : 샴푸1", image: "", link: "" },
        ],
        "R": [
            { name: "R 추천 : 샴푸2", image: "", link: "" },
        ],
        "H": [
            { name: "H 추천 : 샴푸1", image: "", link: "" },
        ],
        "I": [
            { name: "I 추천 : 샴푸2", image: "", link: "" },
        ],

    };


    // 결과 값에 대응하는 피부 타입을 가져오는 함수
    const getsclapTypeDescriptions = (letters: string[]) => {
        return letters.map(letter => ({
            letter,
            description: sclapTypes[letter]
        }));
    };

    /// 추천 상품을 가져오는 함수
    const getProductRecommendations = (letters: string[]) => {
        return letters.reduce((acc: { name: string, image: string, link: string }[], letter) => {
            if (productRecommendations[letter]) {
                acc.push(...productRecommendations[letter]);
            }
            return acc;
        }, []);
    };

    const sclapTypeDescriptions = getsclapTypeDescriptions(letters);
    const recommendations = getProductRecommendations(letters);

    return (
        <div>
            <h1>두피 진단 결과</h1>
            <h2> 회원님의 두피 MBTI 는 [ {letters.join("")} ] 입니다.</h2>
            <div>
                {sclapTypeDescriptions.map((sclapType) => (
                    <div key={sclapType.letter}>
                        <h3>{sclapType.letter}</h3>
                        <p>▪ {sclapType.description}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2>✨ {letters.join("")} 추천 상품(제품) ✨</h2>
                <div>
                    {recommendations.map((product, index) => (
                        <div key={index}>
                            <img src={product.image} alt={product.name} />
                            <p>{product.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SclapResult;
