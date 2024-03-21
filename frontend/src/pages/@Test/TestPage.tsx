import Trail from "@/components/@common/Trail"
import MainHeader from "@/components/@common/MainHeader";
import { css } from "@emotion/react";

export default function TestPage() {
  // [API]
  // lat: 위도, lon: 경도
  const [lat, lon] = [37.506320759000715, 127.05368251210247];

  // emotion
  const pageSetting = css({
    // height: "100vh"
  })

  const trails = css({
    margin: "6vw 0",
    display: "inline-flex",
    flexDirection: "column",
    gap: "3.5vw",
  })

  return (
    <div css={pageSetting}>
      <MainHeader title={"테스트 페이지"} />
      <div css={trails}>
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
        <Trail lat={lat} lon={lon} />
      </div>
    </div>
  )
}