import { css } from "@emotion/react";
import TrailInfo from "@/components/@common/TrailInfo";

interface RecordFootInfoProps {
  info?: React.ReactNode;
}

const RecordFootInfos: React.FC<RecordFootInfoProps> = ({info}) => {
  const wrapper = css({
    display: "flex",
    height: "20vw",
    justifyContent: "center",
    alignItems: "center",
    gap: "3.7vw",
    '@media(min-width: 430px)': {
      height: "96px",
      gap: "16px",
    },
  })

  // FIXME info.. children..
  console.log(info)

  return (
    <div css={wrapper}>
      {/* {info} */}
      <TrailInfo name={"시간"} value={"1:05:15"}/>
      <TrailInfo name={"거리(km)"} value={"4.2"}/>
      <TrailInfo name={"동네"} value={"개봉동"}/>
    </div>
  )
}

export default RecordFootInfos;



{/* <RecordFootInfos info={
  <>
  <TrailInfo name={"시간"} value={"1:05:15"}/>
  <TrailInfo name={"거리(km)"} value={"4.2"}/>
  <TrailInfo name={"동네"} value={"개봉동"}/>
  </>
}/> */}