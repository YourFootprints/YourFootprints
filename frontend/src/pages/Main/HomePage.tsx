import Trail from "@/components/@common/Trail";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import testImg from "@/assets/image/testmap.png";
import FootInfo from "@/components/@common/FootInfo";

const PageCss = css({
  width: "100%",
  height: "100vh",
});

const ProfileCss = css({
  width: "100%",
  height: "60%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProfileHeaderWrapper = css({
  width: "90%",
  height: "15%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ProfileImageWrapper = css({
  height: "200px",
  width: "200px",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.55)",
  boxShadow: "1px 1px 15px 5px #8888",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
});

const ImageWrapper = css({
  height: "90%",
  width: "90%",
  borderRadius: "100%",
});

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

const ItemCss = css({
  width: "86px",
  height: "97px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const BigCss = css({
  margin: "0",
  fontSize: "20px",
  fontFamily: "exBold",
  minHeight: "30px",
  lineHeight: "30px",
});
const SmallCss = css({
  margin: "0",
  fontSize: "12px",
  color: "var(--gray-200)",
});

const RecommandCss = css({
  overflowX: "scroll",
  overflow: "hidden",
  display: "flex",
  gap: "2px",
});

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
        <FootInfo
          first="시간"
          second="거리(km)"
          third="칼로리"
          isStar={false}
          wrapperCss={InfoWrapper}
        />
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
