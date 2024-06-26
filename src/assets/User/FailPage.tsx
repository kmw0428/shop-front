import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./FailPage.css"; // 추가한 CSS 파일 임포트

export function FailPage() {
  const [searchParams] = useSearchParams();

  return (
    <div id="info" className="fail-box_section">
      <img
        width="100px"
        src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
        alt="에러 이미지"
      />
      <h2>결제를 실패했어요</h2>

      <div className="p-grid typography--p">
        <div className="p-grid-col text--left">
          <b>에러메시지</b>
        </div>
        <div className="p-grid-col text--right" id="message">
          {`${searchParams.get("message")}`}
        </div>
      </div>
      <div className="p-grid typography--p">
        <div className="p-grid-col text--left">
          <b>에러코드</b>
        </div>
        <div className="p-grid-col text--right" id="code">
          {`${searchParams.get("code")}`}
        </div>
      </div>

      <div className="p-grid-col">
        <Link
          to="https://docs.tosspayments.com/guides/payment-widget/integration"
          target="_blank"
          className="button p-grid-col5"
        >
          연동 문서
        </Link>
        <Link
          to="https://discord.gg/A4fRFXQhRu"
          target="_blank"
          className="button p-grid-col5"
        >
          실시간 문의
        </Link>
      </div>
    </div>
  );
}
