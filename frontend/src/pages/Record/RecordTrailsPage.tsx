import { css } from "@emotion/react"
import Trail from "@/components/@common/Trail"
import testImg from "@/assets/image/testmap.png";
// import { getTrails } from "@/services/Record";
// import { useState } from "react";

export default function RecordTrailsPage() {
  // const [trails, setTrails] = useState([]);

  // async function getData() {
  //   try {
  //     await getTrails(token)
  //     .then((res)=>setTrails(res))
  //     .catch((err)=>console.log(err));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div css={style.page}>
      <div css={style.trails}>
        {/* [API] */}
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
      
      </div>
    </div>
  );
}

const style = {
  page: css({
    margin: "6% 0",
  }),
  trails: css({
    display: "inline-flex",
    flexDirection: "column",
    gap: "3.5vw",
    "@media(min-width: 430px)": {
      gap: "16px",
    },
  })
};