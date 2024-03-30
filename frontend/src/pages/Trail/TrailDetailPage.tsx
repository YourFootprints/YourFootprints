import DetailHeader from "@/components/@common/DetailHeader";
import MapBox from "@/components/@common/MapBox";
import { css } from "@emotion/react";
import { useState } from "react";

const WrapperCss = css({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function TrailDetailPage() {
  const [copyMap, setCopyMap] = useState<any>(null);
  const handleCopyMap = (value: any) => {
    setCopyMap(value);
  };
  return (
    <div css={WrapperCss}>
      <DetailHeader title="ㅇㅇ님의 발자국" backURL="/" />
      <MapBox
        width="100%"
        height="40%"
        lat={33.450701}
        lng={126.570667}
        handleCopyMap={handleCopyMap}
      />
    </div>
  );
}
