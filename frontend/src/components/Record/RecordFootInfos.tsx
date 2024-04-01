import { css } from "@emotion/react";
import TrailInfo from "@/components/@common/TrailInfo";
import { backgroundTheme } from "@/constants/ColorScheme";
import { useContext } from "react";
import { TrailContext } from "@/store/Record/TrailDetail";

interface RecordFootInfoProps {
  info?: React.ReactNode;
}

const RecordFootInfos: React.FC<RecordFootInfoProps> = ({info}) => {
  const { 
    trail, 
    // setTrail
  } = useContext(TrailContext);
  const trailAddress = trail.address.split(" ");
  const [trailName, trailValue] = [trailAddress.slice(0, 2).join(" "), trailAddress[2]];

  // FIXME info.. children..
  console.log(info)

  return (
    <div css={wrapper}>
      {/* {info} */}
      <TrailInfo name={"시간"} value={trail.runtime}/>
      <TrailInfo name={"거리(km)"} value={trail.runtime}/>
      <TrailInfo name={trailName} value={trailValue}/>
      {/* <TrailInfo name={"동네"} value={trailValue}/> */}  {/* FIXME */}
    </div>
  )
}

const wrapper = css(
  {
    display: "flex",
    height: "20vw",
    justifyContent: "center",
    alignItems: "center",
    gap: "3.7vw",
    '@media(min-width: 430px)': {
      height: "96px",
      gap: "16px",
    },
  },
  backgroundTheme.basic,
)

export default RecordFootInfos;



{/* <RecordFootInfos info={
  <>
  <TrailInfo name={"시간"} value={"1:05:15"}/>
  <TrailInfo name={"거리(km)"} value={"4.2"}/>
  <TrailInfo name={"동네"} value={"개봉동"}/>
  </>
}/> */}