import { css } from "@emotion/react"
import Trail from "@/components/@common/Trail"
import testImg from "@/assets/image/testmap.png";

export default function RecordTrailsPage() {
  // FIXME 하단탭 가려지는 부분 .. marginBottom
  const page = css({
    margin: "6% 0",
    // marginTop: "6%",
    // marginBottom: "84px"
  })

  const trails = css({
    marginBottom: "84px",
    display: "inline-flex",
    flexDirection: "column",
    gap: "3.5vw",
    '@media(min-width: 430px)': {
      gap: "16px",
    }
  })

  return (
    <div css={page}>
      <div css={trails}>
        {/* [API] */}
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        <Trail url={`/record/${1}`} imgSrc={testImg} />
        
        {/* <Trail lat={37.29744966074975} lon={126.91333552247836} url={`/record/${1}`} imgSrc={testImg} />
        <Trail lat={37.40037932914246} lon={126.94565339459547} url={`/record/${1}`} imgSrc={testImg} />
        <Trail lat={37.51911063254892} lon={126.87081875110462} url={`/record/${1}`} imgSrc={testImg} />
        <Trail lat={36.98280004934087} lon={127.93525061884748} url={`/record/${1}`} imgSrc={testImg} />
        <Trail lat={37.32800049340874} lon={126.93525061884748} url={`/record/${1}`} imgSrc={testImg} />
        <Trail lat={37.56800049340874} lon={126.83525061884748} url={`/record/${1}`} imgSrc={testImg} /> */}
      </div>
    </div>
  )
}