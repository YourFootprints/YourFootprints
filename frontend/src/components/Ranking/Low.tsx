import { css } from "@emotion/react";
import { backgroundTheme } from "@/constants/ColorScheme";
import Profile from "@/components/Ranking/Profile";

interface LowProps {
  rank: string;     // 순위
  img: string;      // img 주소
  nickname: string; // 닉네임
  foots: number;    // 발자국 수
}

const Low: React.FC<LowProps> = ({rank, img, nickname, foots}) => {
  return (
    <div css={style.box}>
      <div css={info.rank}>{rank}</div>
      <div css={style.profile}>
        <Profile
          size="9.3vw" 
          mxSize="40px" 
          img={img} 
          bg={"rgba(255, 255, 255, 0.2)"}
          shadow="0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
        />
      </div>
      <div css={style.mnBox}>
        <div css={info.nickname}>{nickname}</div>
        <div css={info.foots}>{foots} 발자국</div>
      </div>
    </div>
  )
}

const style = {
  box: css(
    {
      width: "44.8vw",
      height: "18.6vw",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      padding: "0 2%",
      boxSizing: "border-box",
      '@media(min-width: 430px)': {
        width: "193px",
        height: "80px",
      }
    },
    backgroundTheme.basic,
  ),
  mnBox: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }),
  profile: css({
    minWidth: "22%",
    margin: "0 2.5%",
  })
}

const info = {
  rank: css({
    minWidth: "12%",
    fontFamily: "bold",
    fontSize: "3.2vw",
    '@media(min-width: 430px)': {
      fontSize: "14px",
    }
  }),
  nickname: css({
    fontFamily: "bold",
    fontSize: "2.8vw",
    '@media(min-width: 430px)': {
      fontSize: "12px",
    }
  }),
  foots: css({
    fontSize: "2.3vw",
    color: "var(--gray-200)",
    '@media(min-width: 430px)': {
      fontSize: "10px",
    }
  })
}

export default Low;