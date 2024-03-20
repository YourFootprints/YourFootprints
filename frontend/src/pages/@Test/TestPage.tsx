import Trail from "@/components/@common/Trail"
import { css } from "@emotion/react";

export default function TestPage() {
  // [API]
  // lat: 위도, lon: 경도
  const [lat, lon] = [37.506320759000715, 127.05368251210247];

  // emotion
  const pageSetting = css({
    height: "100vh"
  })

  return (
    <div css={pageSetting}>
      <Trail lat={lat} lon={lon} />
    </div>
  )
}