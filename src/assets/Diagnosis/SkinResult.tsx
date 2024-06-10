import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axiosInstance 사용
import "./Result.css";

const SkinResult: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const part1 = queryParams.get("part1");
  const part2 = queryParams.get("part2");
  const part3 = queryParams.get("part3");
  const part4 = queryParams.get("part4");
  const result = queryParams.get("result");
  const letters = result ? result.split(", ") : [];
  const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 사용자 ID 가져오기
  const navigate = useNavigate();

  // 각 결과값의 타입을 정의합니다.
  const skinTypes: { [key: string]: string } = {
    O: "지성 - Oily : 피지 분비량이 많아 번들거리고 여드름이 자주 생기는 타입",
    D: "건성 - Dry : 피지 분비량과 수분 보유량 모두 적어 거칠고 각질과 주름이 잘 생기는 타입",
    S: "민감성 - Sensitive : 피부가 얇고 섬세해 외부 자극에 쉽게 반응하는 타입",
    R: "저항성 - Resistant : 피부 장벽이 견고해 외부적인 스트레스에 대해 견디는 힘이 강한 타입",
    P: "색소성 - Pigmented : 멜라닌 활성도가 높아 기미, 주근깨 혹은 잡티 등 눈에 보이는 색소가 많은 타입",
    N: "비색소성 - Non-Pigmented : 멜라닌 활성도가 낮아 눈에 보이는 색소가 적은 타입",
    W: "주름성 - Wrinkled : 피부 결이 고르지 않고 주름이 많은 타입",
    T: "탄력성 - Tight : 피부 결이 고르고 주름이 적어 탄력이 있는 타입",
  };

  // 각 타입별 추천 제품을 정의합니다. 같은 방법으로 추가 가능
  const productRecommendations: {
    [key: string]: { name: string; image: string; link: string }[];
  } = {
    O: [{ name: "O 지성 : 로션1", image: "", link: "" }],
    D: [{ name: "D 건성 : 로션2", image: "", link: "" }],
    S: [{ name: "S 민감성 : 로션3", image: "", link: "" }],
    R: [{ name: "R 저항성 : 로션4", image: "", link: "" }],
    P: [{ name: "P 색소성 : 로션5", image: "", link: "" }],
    N: [{ name: "N 비색소성 : 로션6", image: "", link: "" }],
    W: [{ name: "W 주름성 : 로션7", image: "", link: "" }],
    T: [{ name: "T 탄력성 : 로션8", image: "", link: "" }],
  };

  const handleSave = async () => {
    if (userId) {
      try {
        const skinType = `${part1}, ${part2}, ${part3}, ${part4}, ${result}`;
        const data = { skinType };

        console.log('Saving skin type with data:', data); // 디버깅용 로그

        await axios.put(
          `http://localhost:8080/api/users/${userId}`,
          JSON.stringify(data),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        alert("피부 타입이 성공적으로 저장되었습니다.");
      } catch (error) {
        console.error("Failed to save skin type:", error);
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const handleRetry = () => {
    navigate("/diagnosisSkin"); // 두피 테스트 페이지로 이동
  };


  // 결과 값에 대응하는 피부 타입을 가져오는 함수
  const getSkinTypeDescriptions = (letters: string[]) => {
    return letters.map((letter) => ({
      letter,
      description: skinTypes[letter],
    }));
  };

  /// 추천 상품을 가져오는 함수
  const getProductRecommendations = (letters: string[]) => {
    return letters.reduce(
      (acc: { name: string; image: string; link: string }[], letter) => {
        if (productRecommendations[letter]) {
          acc.push(...productRecommendations[letter]);
        }
        return acc;
      },
      []
    );
  };

  const skinTypeDescriptions = getSkinTypeDescriptions(letters);
  const recommendations = getProductRecommendations(letters);

  return (
    <div className="result-container">
      <h1 className="result-title">피부 진단 결과</h1>
      <div className="content-background">
        <h2 className="result-name">
          {" "}
          회원님의 피부 MBTI 는{" "}
          <span className="highlight">[ {letters.join("")} ]</span> 입니다.
        </h2>
        <div className="result-descriptions">
          {skinTypeDescriptions.map((skinType) => (
            <div key={skinType.letter}>
              <h3 className="highlight-h3">&lt; {skinType.letter} &gt;</h3>
              <p>▪ {skinType.description}</p>
            </div>
          ))}
        </div>
        <div className="result-recommendations">
          <h2 className="result-name">
            {" "}
            <span className="highlight">{letters.join("")}</span> 추천 제품{" "}
          </h2>
          <div className="result-grid">
            {recommendations.map((product, index) => (
              <div key={index}>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      <div className="button-container">
        <button onClick={handleSave} className="save-button">저장하기</button>
        <button onClick={handleRetry} className="retry-button">다시하기</button>
      </div>
      </div>
    </div>
  );
};

export default SkinResult;
