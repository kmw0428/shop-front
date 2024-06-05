import React from "react";

const SclapResult: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const result = queryParams.get('result');
    const letters = result ? result.split(", ") : [];

    // 각 결과값의 타입을 정의합니다.
    const sclapTypes: { [key: string]: string } = {
        "타입(알파벳)": "타입 설명",
        "타입1(알파벳)": "타입 설명",
        //추가 가능
    };

    // 각 타입별 추천 제품을 정의합니다. 같은 방법으로 추가 가능
    const productRecommendations: { [key: string]: { name: string, image: string, link: string }[] } = {
        "타입": [
            { name: "00 추천 : 샴푸1", image: "", link: "" },
        ],
        "타입1": [
            { name: "00 추천 : 샴푸2", image: "", link: "" },
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
            <h2> 회원님의 두피 타입은 [ {letters.join("")} ] 입니다.</h2>
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
