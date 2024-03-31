import { css } from "@emotion/react";
import { backgroundTheme } from "@/constants/ColorScheme";
import { RankColor } from "@/constants/RankColor";
import Profile from "@/components/Ranking/Profile";

interface TopProps {
  rank: string;     // 순위
  img: string;      // img 주소
  nickname: string; // 닉네임
  foots: number;    // 발자국 수
}

const Top: React.FC<TopProps> = ({rank, img, nickname, foots}) => {
  return (
    <div css={style.box}>
      <div css={bg.box}>
        <div css={bg.blur} />
        <img css={bg.img} src={img} />
      </div>
      <div css={style.profile}>
        <Profile
          size="13.5vw" 
          mxSize="58px" 
          img={img} 
          bg={RankColor[rank].border}
          shadow="0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
        />
      </div>
      <div css={info.box}>
        <div css={[{color:RankColor[rank].font}, info.rank]}>{rank}</div>
        <div css={info.nickname}>{nickname}</div>
        <div css={info.foots}>{foots} 발자국</div>
      </div>
    </div>
  )
}

const style = {
  box: css(
    {
      width: "28.8vw",
      height: "34.8vw",
      borderRadius: "5px",
      position: "relative",
      '@media(min-width: 430px)': {
        width: "124px",
        height: "150px",
      }
    },
    backgroundTheme.basic,
  ),
  profile: css({
    top: "35%",
    left: "50%",
    transform: "translate( -50%, -50% )",
    zIndex: "5",
    position: "absolute",
  })
}

const bg = {
  box: css({
    width: "100%",
    height: "46.6%",
    position: "relative",
  }),
  img: css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate( -50%, -50% )",
  }),
  blur: css({
    width: "100%",
    height: "100%",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(2.5px)",
    position: "absolute",
    zIndex: "3",
  }),
}

const info = {
  box: css({
    paddingTop: "14%",
  }),
  rank: css({
    fontFamily: "exbold",
    fontSize: "3.8vw",
    '@media(min-width: 430px)': {
      fontSize: "16px",
    }
  }),
  nickname: css({
    fontFamily: "bold",
    fontSize: "3vw",
    margin: "1.5%",
    '@media(min-width: 430px)': {
      fontSize: "13px",
    }
  }),
  foots: css({
    fontSize: "2.8vw",
    color: "var(--gray-200)",
    '@media(min-width: 430px)': {
      fontSize: "12px",
    }
  })
}

export default Top;
