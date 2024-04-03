import "@/index.css";
import { css } from "@emotion/react";
import { backgroundTheme, fontTheme } from "@/constants/ColorScheme";
import { useContext, useEffect } from "react";
import { KebabContext } from "@/store/Record/Kebab";
import KakaoLogo from "@/assets/Record/KakaoLogo.svg?react";
import CancelBtn from "@/assets/Record/XButton.svg?react";

declare global {
  interface Window {
    Kakao: any;
  }
}

// 카카오 SDK를 로드하는 함수
const loadKakaoSDK = () => {
  return new Promise<void>((resolve) => {
    const kakaoScript = document.createElement("script");
    kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
    kakaoScript.onload = () => {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_API_KEY);
      resolve();
    };
    document.head.appendChild(kakaoScript);
  });
};

export default function ShareModal() {
  const { showModal, setShowModal } = useContext(KebabContext);

  const style = {
    container: css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
    bg: css({
      position: "fixed",
      overflow: "hidden",
      background: "rgb(0, 0, 0, 0.2)",
      width: "100vw",
      height: "100vh",
      top: "0",
      zIndex: "15",
      "@media(min-width: 430px)": {
        width: "430px",
      },
    }),
    box: css(
      {
        position: "fixed",
        width: "90vw",
        height: "30vh",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0px 0px 4px 0px rgb(136, 136, 136, 0.8)",
        borderRadius: "10px",
        padding: "5vw",
        boxSizing: "border-box",
        zIndex: "25",
        // display: "flex",
        // flexDirection: "column",
        "@media(min-width: 430px)": {
          width: "386px",
          padding: "21.5px",
        },

        img: {
          width: "60vw",
          height: "40vh",
          borderRadius: "5px",
          objectFit: "cover",
          "@media(min-width: 430px)": {
            width: "257px",
          },
        },
      },
      backgroundTheme.custom
    ),
  };

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "나 오늘 산책했어, 너도 발자국을 찍어봐! 😊",
        imageUrl: "frontend/public/logotest.jpg",
        link: {
          mobileWebUrl: `${import.meta.env.VITE_API_BASE_URL}/login`,
          webUrl: `${import.meta.env.VITE_API_BASE_URL}/login`,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: `${import.meta.env.VITE_API_BASE_URL}/login`,
            webUrl: `${import.meta.env.VITE_API_BASE_URL}/login`,
          },
        },
      ],
    });
  };

  useEffect(() => {
    loadKakaoSDK();
  }, []);

  return (
    <div css={style.container}>
      <div
        css={style.bg}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setShowModal(!showModal);
          }
        }}
      >
        <div css={style.box}>
          <div css={[{fontFamily:"bold", fontSize: "130%"}, fontTheme]}>공유하기</div>
          <hr css={{marginBottom: "2rem"}} />
          <div css={{display:"flex", justifyContent:"center", gap:"1rem"}}>
            <KakaoLogo onClick={shareKakao} />
            <CancelBtn
              onClick={(e) => {
                e.preventDefault;
                setShowModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
