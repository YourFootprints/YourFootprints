import { css } from "@emotion/react";
import Lottie from "react-lottie";
import {
  loadingOptions,
  loadingfootOptions,
} from "@/assets/lotties/lottiesOptions";

const foot = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const minifoot = css({});

export default function Loading() {
  return (
    <div>
      <div css={foot}>
        <Lottie options={loadingfootOptions} />
      </div>
      <h2>로딩중입니다...</h2>
      <div css={minifoot}>
        <Lottie options={loadingOptions} />
      </div>
    </div>
  );
}
