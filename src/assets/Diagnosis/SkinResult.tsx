import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axiosInstance 사용
import "./Result.css";
import Swal from "sweetalert2";

const SkinResult: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const part1 = queryParams.get("part1");
  const part2 = queryParams.get("part2");
  const part3 = queryParams.get("part3");
  const part4 = queryParams.get("part4");
  const result = queryParams.get("result");
  const letters = result ? result.split(", ") : [];
  const userId = localStorage.getItem("userId");
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

  // 각 타입별 추천 제품의 ID를 정의합니다.
  const productRecommendations: { [key: string]: { id: string }[] } = {
    O: [{ id: "665ebf862ad1bef1fa84d4f0" }, { id: "665ebf862ad1bef1fa84d4f2" }, { id: "665ebf862ad1bef1fa84d4f3" }, { id: "665ebf862ad1bef1fa84d4f6" }, { id: "665ebf862ad1bef1fa84d4f9" }, { id: "665ebf862ad1bef1fa84d4fc" }, { id: "665ebf862ad1bef1fa84d500" }, { id: "665ebf862ad1bef1fa84d4dc" }],
    D: [{ id: "665ebf862ad1bef1fa84d4f1" }, { id: "665ebf862ad1bef1fa84d4f4" }, { id: "665ebf862ad1bef1fa84d4f5" }, { id: "665ebf862ad1bef1fa84d4f7" }, { id: "665ebf862ad1bef1fa84d4f8" }, { id: "665ebf862ad1bef1fa84d4fa" }, { id: "665ebf862ad1bef1fa84d4fb" }, { id: "665ebf862ad1bef1fa84d4fd" }, { id: "665ebf862ad1bef1fa84d4ff" }, { id: "665ebf862ad1bef1fa84d4d5" }, { id: "665ebf862ad1bef1fa84d4d6" }, { id: "665ebf862ad1bef1fa84d4d8" }, { id: "665ebf862ad1bef1fa84d4db" }, { id: "665ebf862ad1bef1fa84d4e7" }, { id: "665ebf862ad1bef1fa84d4e9" }, { id: "665ebf862ad1bef1fa84d4ea" }, { id: "665ebf862ad1bef1fa84d4ed" }, { id: "665ebf862ad1bef1fa84d4ee" }, { id: "665ebf862ad1bef1fa84d4e3" }],
    S: [{ id: "665ebf862ad1bef1fa84d4f0" }, { id: "665ebf862ad1bef1fa84d4f2" }, { id: "665ebf862ad1bef1fa84d4f4" }, { id: "665ebf862ad1bef1fa84d4f5" }, { id: "665ebf862ad1bef1fa84d4f6" }, { id: "665ebf862ad1bef1fa84d4f9" }, { id: "665ebf862ad1bef1fa84d4fd" }, { id: "665ebf862ad1bef1fa84d500" }, { id: "665ebf862ad1bef1fa84d4d5" }, { id: "665ebf862ad1bef1fa84d4d9" }, { id: "665ebf862ad1bef1fa84d4db" }, { id: "665ebf862ad1bef1fa84d4dc" }, { id: "665ebf862ad1bef1fa84d4e6" }, { id: "665ebf862ad1bef1fa84d4ea" }, { id: "665ebf862ad1bef1fa84d4ec" }, { id: "665ebf862ad1bef1fa84d4ed" }, { id: "665ebf862ad1bef1fa84d4ee" }, { id: "665ebf862ad1bef1fa84d4e1" }, { id: "665ebf862ad1bef1fa84d4e4" }],
    R: [{ id: "665ebf862ad1bef1fa84d4f3" }, { id: "665ebf862ad1bef1fa84d4f7" }, { id: "665ebf862ad1bef1fa84d4fe" }, { id: "665ebf862ad1bef1fa84d4ff" }],
    P: [{ id: "665ebf862ad1bef1fa84d4ef" }, { id: "665ebf862ad1bef1fa84d4f8" }, { id: "665ebf862ad1bef1fa84d500" }, { id: "665ebf862ad1bef1fa84d4d4" }, { id: "665ebf862ad1bef1fa84d4d8" }, { id: "665ebf862ad1bef1fa84d4e8" }, { id: "665ebf862ad1bef1fa84d4e9" }],
    N: [{ id: "665ebf862ad1bef1fa84d4fe" }, { id: "665ebf862ad1bef1fa84d4ff" }],
    W: [{ id: "665ebf862ad1bef1fa84d4ef" }, { id: "665ebf862ad1bef1fa84d4f3" }, { id: "665ebf862ad1bef1fa84d4f4" }, { id: "665ebf862ad1bef1fa84d4f5" }, { id: "665ebf862ad1bef1fa84d4fa" }, { id: "665ebf862ad1bef1fa84d4fb" }, { id: "665ebf862ad1bef1fa84d4fc" }, { id: "665ebf862ad1bef1fa84d4d4" }, { id: "665ebf862ad1bef1fa84d4d6" }, { id: "665ebf862ad1bef1fa84d4d7" }, { id: "665ebf862ad1bef1fa84d4da" }, { id: "665ebf862ad1bef1fa84d4e7" }, { id: "665ebf862ad1bef1fa84d4e8" }, { id: "665ebf862ad1bef1fa84d4eb" }, { id: "665ebf862ad1bef1fa84d4ed" }, { id: "665ebf862ad1bef1fa84d4e4" }],
    T: [{ id: "665ebf862ad1bef1fa84d4f2" }, { id: "665ebf862ad1bef1fa84d4f9" }, { id: "665ebf862ad1bef1fa84d4fd" }, { id: "665ebf862ad1bef1fa84d4dc" }],
  };

  const handleSave = async () => {
    if (userId) {
      try {
        const skinType = `${part1}, ${part2}, ${part3}, ${part4}, ${result}`;
        const data = { skinType };

        console.log("Saving skin type with data:", data);

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
          text: "피부 타입이 성공적으로 저장되었습니다.",
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
    navigate("/diagnosisSkin");
  };

  // 결과 값에 대응하는 피부 타입을 가져오는 함수
  const getSkinTypeDescriptions = (letters: string[]) => {
    return letters.map((letter) => ({
      letter,
      description: skinTypes[letter],
    }));
  };

  // 추천 제품을 무작위로 선택하여 가져오는 함수
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

  const skinTypeDescriptions = getSkinTypeDescriptions(letters);

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

export default SkinResult;
