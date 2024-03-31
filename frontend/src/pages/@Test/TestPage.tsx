// import Trail from "@/components/@common/Trail"
import MainHeader from "@/components/@common/MainHeader";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import PublicToggle from "@/components/Record/PublicToggle";

import Trail from "@/components/@common/Trail"
import testImg from "@/assets/image/testmap.png";
import ComponetsTest from "./ComponetsTest";

// import TrailInfo from "@/components/@common/TrailInfo";



export default function TestPage() {
  // const data = {
  //   "data": {
  //       "distance": 0.0,
  //       "siDo": "구미시",
  //       "starRanking": 0,
  //       "coordinateList": [
  //           {
  //               "la": 36.03694144,
  //               "lo": 128.414722522
  //           }
  //       ],
  //       "facilityList": {
  //           "police": [],
  //           "restaurant": [
  //               "{\"phone\":\"054 9741963\",\"place\":\"첫집매운탕\",\"distribution\":\"탕류(보신용)\",\"lat\":36.02075708,\"log\":128.3937178,\"source\":\"restaurant\"}",
  //               "{\"phone\":\"054 9752590\",\"address\":\"경상북도 칠곡군 석적읍 석적로 649\",\"place\":\"칠기칼국수\",\"distribution\":\"한식\",\"lat\":36.05171723,\"log\":128.4089434,\"source\":\"restaurant\"}"
  //           ],
  //       },
  //       "public": false,
  //       "like": false
  //   },
  //   "msg": "데이터 생성 성공"
  // }

  // data.data.facilityList.restaurant = data.data.facilityList.restaurant.map(str => JSON.parse(str));
  // console.log(data)


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

        <div css={btnArea}>
          <Btn path={"text"} name={"상세테스트(text)"}></Btn>
          <Btn path={"img"} name={"상세테스트(image)"}></Btn>
          <Btn path={"none"} name={"상세테스트(none)"}></Btn>
        </div>
      </div>
      <ComponetsTest />
    </div>
  )
}