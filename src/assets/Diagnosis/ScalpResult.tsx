import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Result.css";
import Swal from "sweetalert2";

const ScalpResult: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const part1 = queryParams.get("part1");
  const part2 = queryParams.get("part2");
  const part3 = queryParams.get("part3");
  const part4 = queryParams.get("part4");
  const result = queryParams.get("result");
  const letters = result ? result.split(", ") : [];
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const sclapTypes: { [key: string]: string } = {
    D: "건성 - Dry : 땀과 피지의 분비량은 적고 각질 형성이 빠른 타입",
    O: "지성 및 지루성 - Oily : 과도한 피지분비로 인해 모공이 막히기 쉽고 두피 모낭 속으로 피지가 쌓여 염증이나 트러블이 생기기 쉬운 타입",
    A: "탈모 진행 - Alopecia : 정상적으로 모발이 존재해야 할 부위에 모발이 없는 상태로 일반적으로 두피의 성모가 빠지는 상태",
    N: "정상 - Normal : 10~15%의 모낭이 퇴행기나 휴지기에 있어 하루 평균 50~60여 개 정도의 머리털이 빠지는 상태로 모발사이의 밀집도와 모발 굵기가 균일함",
    S: "두피 민감 - Sensitive : 두피의 염증이나 붉은기가 육안으로도 확인 가능하며 항상 두피가 부어있어 자극에 의한 손상이 쉬운 타입",
    R: "비민감 - Non-Sensitive : 유·수분이 고루 균형을 이루고 있으며 불순물이 없고 모공 주변이 깨끗한 상태",
    H: "손상 모발 - Hair damage : 잦은 시술 및 외부적 요인으로 인해 모발이 잘 엉키고 끊어지며 갈라지는 상태.",
    I: "비손상 - Intact : 모발이 굵고 강한 탄력이 있으며 큐티클이 촘촘하여 보이기에 윤기가 흐르는 상태",
  };

  const productRecommendations: { [key: string]: { id: string }[] } = {
    D: [{ id: "665ebf862ad1bef1fa84d4cf" }, { id: "665ebf862ad1bef1fa84d50e" }, { id: "665ebf862ad1bef1fa84d506" }, { id: "665ebf862ad1bef1fa84d509" }],
    O: [{ id: "665ebf862ad1bef1fa84d4cc" }, { id: "665ebf862ad1bef1fa84d4ce" }, { id: "665ebf862ad1bef1fa84d50b" }, { id: "665ebf862ad1bef1fa84d50f" }, { id: "665ebf862ad1bef1fa84d501" }],
    A: [{ id: "665ebf862ad1bef1fa84d4d1" }, { id: "665ebf862ad1bef1fa84d512" }, { id: "665ebf862ad1bef1fa84d502" }, { id: "665ebf862ad1bef1fa84d503" }],
    N: [{ id: "665ebf862ad1bef1fa84d4cc" }, { id: "665ebf862ad1bef1fa84d4cd" }, { id: "665ebf862ad1bef1fa84d4d2" }, { id: "665ebf862ad1bef1fa84d50b" }, { id: "665ebf862ad1bef1fa84d50c" }],
    S: [{ id: "665ebf862ad1bef1fa84d4d0" }, { id: "665ebf862ad1bef1fa84d4d3" }, { id: "665ebf862ad1bef1fa84d510" }, { id: "665ebf862ad1bef1fa84d511" }, { id: "665ebf862ad1bef1fa84d504" }, { id: "665ebf862ad1bef1fa84d509" }],
    R: [{ id: "665ebf862ad1bef1fa84d4cd" }, { id: "665ebf862ad1bef1fa84d4d2" }, { id: "665ebf862ad1bef1fa84d50c" }],
    H: [{ id: "665ebf862ad1bef1fa84d4cd" }, { id: "665ebf862ad1bef1fa84d4d3" }, { id: "665ebf862ad1bef1fa84d50c" }, { id: "665ebf862ad1bef1fa84d50d" }, { id: "665ebf862ad1bef1fa84d50e" }, { id: "665ebf862ad1bef1fa84d50f" }, { id: "665ebf862ad1bef1fa84d510" }, { id: "665ebf862ad1bef1fa84d511" }, { id: "665ebf862ad1bef1fa84d512" }, { id: "665ebf862ad1bef1fa84d504" }, { id: "665ebf862ad1bef1fa84d505" }, { id: "665ebf862ad1bef1fa84d506" }, { id: "665ebf862ad1bef1fa84d509" }],
    I: [{ id: "665ebf862ad1bef1fa84d4cc" }, { id: "665ebf862ad1bef1fa84d50b" }],
  };

  const handleSave = async () => {
    if (userId) {
      try {
        const scalpType = `${part1}, ${part2}, ${part3}, ${part4}, ${result}`;
        const data = { scalpType };

        console.log("Saving scalp type with data:", data);

        await axios.put(
          `http://localhost:8080/api/users/${userId}`,
          JSON.stringify(data),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        Swal.fire({
          text: "두피 타입이 성공적으로 저장되었습니다.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "저장에 실패했습니다.",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    } else {
      Swal.fire({
        title: "Warning",
        text: "로그인 후 이용해주세요.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "로그인 하러 가기",
        cancelButtonText: "취소",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  };

  const handleRetry = () => {
    navigate("/diagnosisScalp"); // 두피 테스트 페이지로 이동
  };

  const getScalpTypeDescriptions = (letters: string[]) => {
    return letters.map((letter) => ({
      letter,
      description: sclapTypes[letter.trim()],
    }));
  };

  const getProductRecommendations = async (letters: string[]) => {
    const recommendations = [];
    const uniqueProductIds = new Set();

    for (const letter of letters) {
      const products = productRecommendations[letter] || [];
      const selectedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 1); // 각 타입에서 1개의 제품을 무작위로 선택

      for (const product of selectedProducts) {
        if (!uniqueProductIds.has(product.id)) {
          uniqueProductIds.add(product.id);
          try {
            const response = await axios.get(`http://localhost:8080/products/${product.id}`);
            recommendations.push({ ...product, ...response.data });
          } catch (error) {
            console.error(`Failed to fetch product with ID ${product.id}`, error);
          }
        }
      }
    }

    // 최대 4개의 제품을 무작위로 선택
    return recommendations.sort(() => 0.5 - Math.random()).slice(0, 4);
  };

  const [recommendations, setRecommendations] = useState<
    { id: string; name: string; imageUrl: string; link: string }[]
  >([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const recs = await getProductRecommendations(letters);
      setRecommendations(recs);
    };
    fetchRecommendations();
  }, []);

  const scalpTypeDescriptions = getScalpTypeDescriptions(letters);

  return (
    <div className="result-container">
      <h1 className="result-title">두피 진단 결과</h1>
      <div className="content-background">
        <h2 className="result-name">
          {" "}
          회원님의 두피 MBTI 는{" "}
          <span className="highlight">[ {letters.join(" ")} ]</span> 입니다.
        </h2>
        <div className="result-descriptions">
          {scalpTypeDescriptions.map((scalpType) => (
            <div key={scalpType.letter}>
              <h3 className="highlight-h3">&lt; {scalpType.letter} &gt;</h3>
              <p>▪ {scalpType.description}</p>
            </div>
          ))}
        </div>
        <div className="result-recommendations">
          <h2 className="result-name">
            {" "}
            <span className="highlight">{letters.join(" ")}</span> 추천 제품{" "}
          </h2>
          <div className="result-grid">
            {recommendations.map((product) => (
              <div key={product.id}>
                <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} style={{ width: "100px" }} />
                <p>{product.name}</p>
                <a href={`/product/${product.id}`}>제품 보러 가기</a>
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleSave} className="save-button">
            저장하기
          </button>
          <button onClick={handleRetry} className="retry-button">
            다시하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScalpResult;
