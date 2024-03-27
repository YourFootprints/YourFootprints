import Trail from "@/components/@common/Trail";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import testImg from "@/assets/image/testmap.png";

const PageCss = css`
  width: 100%;
  height: 100vh;
`;

const ProfileCss = css`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeaderWrapper = css`
  width: 90%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImageWrapper = css`
  height: 200px;
  width: 200px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ItemCss = css`
  width: 86px;
  height: 97px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BigCss = css`
  margin: 0;
  font-size: 20px;
  font-family: exBold;
  min-height: 30px;
  line-height: 30px;
`;
const SmallCss = css`
  margin: 0;
  font-size: 12px;
  color: var(--gray-200);
`;

const RecommandCss = css`
  overflow-x: scroll;
  overflow: hidden;
  display: flex;
  gap: 2px;
`;

export default function HomePage() {
  const navigate = useNavigate();
  const handleClickStartrun = () => {
    navigate("startrun");
  };
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
          <div css={ItemCss}>
            <p css={BigCss}>1:05:15</p>
            <p css={SmallCss}>시간</p>
          </div>
          <div css={ItemCss}>
            <p css={BigCss}>4.2</p>
            <p css={SmallCss}>거리(km)</p>
          </div>
          <div css={ItemCss}>
            <p css={BigCss}>2405</p>
            <p css={SmallCss}>kcal</p>
          </div>
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
          <div
            onClick={handleClickStartrun}
            css={{ width: "100%", fontFamily: "bold" }}
          >
            산책 시작
          </div>
        </div>
      </div>
      <div>추천은 수정예정</div>
      <div id="recommand" css={RecommandCss}>
        <div css={{ transform: "scale(0.7)", minWidth: "400px" }}>
          <Trail url="startrun" imgSrc={testImg} />
        </div>
        <div css={{ transform: "scale(0.7)" }}>
          <Trail url="startrun" imgSrc={testImg} />
        </div>
      </div>
    </div>
  );
}
