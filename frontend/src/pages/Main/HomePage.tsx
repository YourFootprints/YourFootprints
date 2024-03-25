import BottomSheetContent from "@/components/@common/BottomSheet/BottomSheet";
import FootInfo from "@/components/@common/FootInfo";
import UnderLineButton from "@/components/@common/UnderLineButton";
import { css } from "@emotion/react";
import { useState } from "react";

const PageCss = css`
  width: 100%;
  height: 100vh;
`;

const ProfileCss = css`
  width: calc(100% - 32px);
  margin: 16px;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeaderWrapper = css`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImageWrapper = css`
  height: 40%;
  width: 45%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 1px 1px 15px 5px #8888;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ImageWrapper = css`
  height: 90%;
  width: 90%;
  border-radius: 100%;
`;

const InfoWrapper = css`
  width: 85%;
  height: 15%;
  margin-top: 8%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 1px 1px 15px 1px rgba(255, 255, 255, 0.8) inset;
`;

export default function HomePage() {
  const [test, setTest] = useState(false);
  return (
    <div css={[PageCss]}>
      <div
        css={[
          ProfileCss,
          {
            backgroundImage: "url(src/assets/image/sample1.png)",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          },
        ]}
      >
        <div css={ProfileHeaderWrapper}>
          <div>14˚</div>
          <div>토글</div>
        </div>
        <div css={ProfileImageWrapper}>
          <div
            css={[
              ImageWrapper,
              {
                backgroundImage: "url(src/assets/image/profile.jpg)",
                backgroundPosition: "center center",
                backgroundSize: "cover",
              },
            ]}
          >
            <img src="" alt="" />
          </div>
        </div>
        <div css={InfoWrapper}>
          {/* <div css={ItemCss}>
            <p css={BigCss}>1:05:15</p>
            <p css={SmallCss}>시간</p>
          </div>
          <div css={ItemCss}>
            <p css={BigCss}>4.2</p>
            <p css={SmallCss}>거리(km)</p>
          </div>
          <div css={ItemCss}>
            <p css={BigCss}>구봉동</p>
            <p css={SmallCss}>서울시 개로구</p>
          </div> */}
        </div>
        <div
          css={[
            InfoWrapper,
            {
              height: "13%",
              margin: "5%",
              fontSize: "1.5rem",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              borderRadius: "25px",
            },
          ]}
        >
          <div css={{ width: "100%", fontFamily: "bold" }}>산책 시작</div>
        </div>
      </div>
      <UnderLineButton first="편의시설" second="안전시설" />
      <FootInfo isStar={false} />
      {test && (
        <BottomSheetContent
          closeBottom={() => {
            setTest(false);
          }}
          title="내용"
          content="하이"
          isFilter={false}
        />
      )}
      <div
        onClick={() => {
          setTest(true);
        }}
      >
        테스트
      </div>
    </div>
  );
}
