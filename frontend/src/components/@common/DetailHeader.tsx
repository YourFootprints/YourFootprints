import { useNavigate } from "react-router-dom";
import "@/index.css";
import { css } from "@emotion/react";
import { svgTheme, backgroundTheme } from "@/constants/ColorScheme";
import Back from "@/assets/@common/ArrowLeft.svg?react"; // 뒤로가기
/*

// [REMOVE]
- [필수] title에 (상세 페이지)제목 작성해주세요
- [필수] backURL에 뒤로가기 버튼을 눌렀을때 이동할 페이지 주소만 적어주세요 -> 예: backURL="/record"
- [선택] backConfirm: 뒤로 가기 전 확인이 필요한 경우, (예: 수정페이지) confirm에 들어갈 문장을 적어주세요
  - 예: backConfirm="뒤로 가시겠습니까?"
  - 예: backConfirm={(isChange)?"수정된 내용은 저장되지 않습니다. 뒤로 가시겠습니까?":null}
    - 수정된 내용이 있을 때(isChange===true)만 confirm 창 뜨도록
- [선택] content에 헤더 오른쪽에 들어갈 html 태그 작성해주세요 (없는 경우만 작성 X)

<DetailHeader title={"테스트 상세페이지"} backURL="/record" backConfirm="뒤로 가시겠습니까?" content={<img src={}></img>} />
<DetailHeader title={"테스트 상세페이지"} backURL="/record" content={<div>"완료"</div>} />
<DetailHeader title={"테스트 상세페이지"} />

*/

interface DetailHeaderProps {
  title: string;
  backURL: string;
  backConfirm?: string | null;
  content?: React.ReactNode;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  backURL,
  backConfirm,
  content,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    // if (!(backConfirm && !window.confirm(backConfirm))) {
    //   navigate(backURL)
    // }

    if (backConfirm && !window.confirm(backConfirm)) {
      // 뒤로가기 실행하지 않음
    } else {
      navigate(backURL);
    }
  };

  return (
    <div css={box}>
      <div css={item.left}>
        <Back css={svgTheme.stroke} onClick={goBack} />
      </div>
      <div css={item.center}>
        <span>{title}</span>
      </div>
      <div css={item.right}>{content}</div>
    </div>
  );
};

const box = css(
  {
    width: "100%",
    height: "60px",
    fontSize: "20px", // 높이와 글자크기는 고정
    borderBottom: "1px solid var(--gray-100)",
    top: "0",
    position: "sticky",
    zIndex: "10",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    lineHeight: "60px",
    boxSizing: "border-box",
    padding: "0 3.5%",
  },
  backgroundTheme.basic
);

const item = {
  left: css({
    flex: "1",
    display: "flex",
    cursor: "pointer",
  }),
  center: css({
    flex: "3",
  }),
  right: css({
    flex: "1",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "16px",
    cursor: "pointer",
  }),
};

export default DetailHeader;
