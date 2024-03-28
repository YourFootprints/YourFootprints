import { css } from "@emotion/react";
// import TrailInfo from "./TrailInfo";

// const defaultWrapper = {
//   width: "100%",
//   height: "95px",
//   backgroundColor: "white",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "1rem",
// };

const InfoWrapper = css({
  width: "85%",
  height: "15%",
  marginTop: "8%",
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  borderRadius: "10px",
  boxShadow: "1px 1px 15px 1px rgba(255, 255, 255, 0.8) inset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

interface FootInfoProps {
  info: React.ReactNode;
}
export default function FootInfos({
  info,
}: FootInfoProps) {
  return (
    // <div css={wrapperCss}>
    <div css={InfoWrapper}>
      {info}
      {/* <FootInfo name={"시간"} value={"1:05:15"}/>
      <FootInfo name={"거리"} value={"4.2"}/>
      <FootInfo name={"칼로리"} value={"구봉동?"}/>
      <FootInfo name={"칼로리"} value={"구봉동?"}/> */}
    </div>
  );
}
