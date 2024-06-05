import React from "react";
import "./Result.css";

const SkinResult: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const result = queryParams.get('result');
    const letters = result ? result.split(", ") : [];

    // 각 결과값의 타입을 정의합니다.
    const skinTypes: { [key: string]: string } = {
        "O": "지성 - Oily : 피지 분비량이 많아 번들거리고 여드름이 자주 생기는 타입",
        "D": "건성 - Dry : 피지 분비량과 수분 보유량 모두 적어 거칠고 각질과 주름이 잘 생기는 타입",
        "S": "민감성 - Sensitive : 피부가 얇고 섬세해 외부 자극에 쉽게 반응하는 타입",
        "R": "저항성 - Resistant : 피부 장벽이 견고해 외부적인 스트레스에 대해 견디는 힘이 강한 타입",
        "P": "색소성 - Pigmented : 멜라닌 활성도가 높아 기미, 주근깨 혹은 잡티 등 눈에 보이는 색소가 많은 타입",
        "N": "비색소성 - Non-Pigmented : 멜라닌 활성도가 낮아 눈에 보이는 색소가 적은 타입",
        "W": "주름성 - Wrinkled : 피부 결이 고르지 않고 주름이 많은 타입",
        "T": "탄력성 - Tight : 피부 결이 고르고 주름이 적어 탄력이 있는 타입",
    };

    // 각 타입별 추천 제품을 정의합니다. 같은 방법으로 추가 가능
    const productRecommendations: { [key: string]: { name: string, image: string, link: string }[] } = {
        "O": [
            { name: "O 추천 : 로션1", image: "", link: "" },
        ],
        "D": [
            { name: "D 추천 : 로션2", image: "", link: "" },           
        ],
        "S": [
            { name: "S 추천 : 로션3", image: "", link: "" },            
        ],
        "R": [
            { name: "R 추천 : 로션4", image: "", link: "" },            
        ],
        "P": [
            { name: "P 추천 : 로션5", image: "", link: "" },            
        ],
        "N": [
            { name: "N 추천 : 로션6", image: "", link: "" },           
        ],
        "W": [
            { name: "W 추천 : 로션7", image: "", link: "" },           
        ],
        "T": [
            { name: "T 추천 : 로션8", image: "", link: "" },            
        ],
    };


    // 결과 값에 대응하는 피부 타입을 가져오는 함수
    const getSkinTypeDescriptions = (letters: string[]) => {
        return letters.map(letter => ({
            letter,
            description: skinTypes[letter]
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

    const skinTypeDescriptions = getSkinTypeDescriptions(letters);
    const recommendations = getProductRecommendations(letters);

    return (
        <div className="result-container">
            <h1>피부 진단 결과</h1>
            <h2> 회원님의 피부 MBTI 는 [ {letters.join("")} ] 입니다.</h2>
            <div className="result-descriptions">
                {skinTypeDescriptions.map((skinType) => (
                    <div key={skinType.letter}>
                        <h3>[ {skinType.letter} ]</h3>
                        <p>▪ {skinType.description}</p>
                    </div>
                ))}
            </div>
            <div className="result-recommendations">
                <h2>✨ {letters.join("")} 추천 제품 ✨</h2>
                <div className="result-grid">
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

export default SkinResult;
