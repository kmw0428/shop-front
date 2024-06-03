import React from "react";

const SclapResult: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const score = queryParams.get('score')

    return(
        <div>
            <p>총 점수: {score}</p>
            <h2>00님의 두피 타입은 0000 입니다.</h2>
            <p>간단한 설명 . . .</p>
            <p>맞춤 성분</p>
            <p>맞춤 상품</p>
        </div>
    )
}

export default SclapResult;