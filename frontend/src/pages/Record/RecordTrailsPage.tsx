import { css } from "@emotion/react";
import Trail from "@/components/@common/Trail";

export default function RecordTrailsPage() {
  // FIXME 하단탭 가려지는 부분 .. marginBottom
  const page = css({
    margin: "6% 0",
  });

  const trails = css({
    display: "inline-flex",
    flexDirection: "column",
    gap: "3.5vw",
    "@media(min-width: 430px)": {
      gap: "16px",
    },
  });

  return (
    <div css={page}>
      <div css={trails}>
        {/* [API] */}
        <Trail
          lat={37.29744966074975}
          lon={126.91333552247836}
          url={`/mytrail/${1}`}
        />
        <Trail
          lat={37.40037932914246}
          lon={126.94565339459547}
          url={`/mytrail/${1}`}
        />
        <Trail
          lat={37.51911063254892}
          lon={126.87081875110462}
          url={`/mytrail/${1}`}
        />
        <Trail
          lat={36.98280004934087}
          lon={127.93525061884748}
          url={`/mytrail/${1}`}
        />
        <Trail
          lat={37.32800049340874}
          lon={126.93525061884748}
          url={`/mytrail/${1}`}
        />
        <Trail
          lat={37.56800049340874}
          lon={126.83525061884748}
          url={`/mytrail/${1}`}
        />
      </div>
    </div>
  );
}
