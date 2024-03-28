// import Trail from "@/components/@common/Trail"
import MainHeader from "@/components/@common/MainHeader";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import PublicToggle from "@/components/Record/PublicToggle";

import Trail from "@/components/@common/Trail"
import testImg from "@/assets/image/testmap.png";
import ComponetsTest from "./ComponetsTest";

import FootInfos from "@/components/@common/FootInfos";
import TrailInfo from "@/components/@common/TrailInfo";



export default function TestPage() {
  interface BtnProps {
    path: string;
    name: string;
  }


  const Btn: React.FC<BtnProps> = ({ path, name }) => {
    const style = css({
      width: "100%",
      height: "40px",
    })
    return (
      <button css={style} onClick={()=>navigate(`/testdetail/${path}`)}>
        {name}
      </button>
    );
  }

  // [API]
  // lat: 위도, lon: 경도
  // const [lat, lon] = [37.506320759000715, 127.05368251210247];
  const navigate = useNavigate();

  // emotion
  const pageSetting = css({
    // height: "100%"
  })

  const trails = css({
    margin: "6vw 0",
    display: "inline-flex",
    flexDirection: "column",
    gap: "3.5vw",
    '@media(min-width: 430px)': {
      margin: "26px 0",
      gap: "16px",
    }
  })

  const btnArea = css({
    display: "inline-flex",
    margin: "0 6%",
    gap: "3%"
  })

  return (
    <div css={pageSetting}>
      <MainHeader title={"테스트 페이지"} />
      <PublicToggle isPublic={false} />
      <div css={trails}>
        <div style={{transform: "scale(0.5)",}}>
          <Trail url={`/record/${1}`} imgSrc={testImg} />
        </div>
        {/* <Trail lat={lat} lon={lon} url={"/"} />
        <Trail lat={37.29744966074975} lon={126.91333552247836} url={"/"} />
        <Trail lat={37.40037932914246} lon={126.94565339459547} url={"/"} />
        <Trail lat={37.51911063254892} lon={126.87081875110462} url={"/"} />
        <Trail lat={36.98280004934087} lon={127.93525061884748} url={"/"} />
        <Trail lat={37.32800049340874} lon={126.93525061884748} url={"/"} />
        <Trail lat={37.56800049340874} lon={126.83525061884748} url={"/"} /> */}

        <div css={btnArea}>
          <Btn path={"text"} name={"상세테스트(text)"}></Btn>
          <Btn path={"img"} name={"상세테스트(image)"}></Btn>
          <Btn path={"none"} name={"상세테스트(none)"}></Btn>
        </div>
      </div>

      <FootInfos 
        info = {
          <>
          <TrailInfo name={"시간"} value={"10:25:10"}/>
          <TrailInfo name={"km"} value={"42.5"}/>
          <TrailInfo name={"2,405"} value={"kcal"}/>
          <TrailInfo name={"별점"} value={"4.0"} isStar={true}/>
          </>
        }
      />
      <ComponetsTest />
    </div>
  )
}