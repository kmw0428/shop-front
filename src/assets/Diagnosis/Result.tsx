import React from "react";

const Result: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const score = queryParams.get('score')

    return(
        <div>
            <h2>결과</h2>
            <p>총 점수: {score}</p>
        </div>
    )
}

export default Result;