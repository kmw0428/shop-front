import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SuccessPage.css"; // 추가된 부분

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [, setResponseData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    const orderIdsParam = searchParams.get("orderIds");
    console.log("Received orderIdsParam:", orderIdsParam);  // 로그 추가
    const orderIds = searchParams.get("orderIds")?.split(',') || [];

    const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    async function confirm() {
      const response = await fetch(
        "https://api.tosspayments.com/v1/payments/confirm",
        {
          method: "POST",
          headers: {
            Authorization: encryptedSecretKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        console.log(json);
        navigate(`/fail?code=${json.code}&message=${json.message}`);
        return;
      }

      try {
        console.log("Merging orders with userId:", userId, "orderIds:", orderIds, "status: PAID");

        await axios.put(`https://shoppingback-ltd0.onrender.com/orders/merge`, {
          userId,
          orderIds,
          status: "PAID",
        });

        console.log("Successfully merged orders");
      } catch (error) {
        console.error("Failed to update order status or merge orders:", error);
      }

      return json;
    }
    confirm().then((data) => {
      setResponseData(data);
    });
  }, [searchParams, userId]);

  const numericOrderId = Number(searchParams.get("orderId"));

  return (
    <>
      <div className="success-box_section">
        <img
          width="100px"
          src="/successicon.png"
          alt="결제 완료"
        />
        <h2 className="success-h2">결제를 완료했어요</h2>
        <div className="success-grid success-typography--p">
          <div className="success-grid-col success-text--left">
            <b>결제금액</b>
          </div>
          <div className="success-grid-col success-text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="success-grid success-typography--p">
          <div className="success-grid-col success-text--left">
            <b>주문번호</b>
          </div>
          <div className="success-grid-col success-text--right" id="orderId">
            {isNaN(numericOrderId) ? "Invalid Order ID" : numericOrderId.toLocaleString()}
          </div>
        </div>
        <div className="success-grid success-typography--p">
          <div className="success-grid-col success-text--left">
            <b>paymentKey</b>
          </div>
          <div
            className="success-grid-col success-text--right"
            id="paymentKey"
            style={{ whiteSpace: "initial", width: "250px" }}
          >
            {`${searchParams.get("paymentKey")}`}
          </div>
        </div>
        <div className="success-grid-col">
          <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button className="success-button success-button-col5">연동 문서</button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="success-button success-button-secondary success-button-col5">
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
