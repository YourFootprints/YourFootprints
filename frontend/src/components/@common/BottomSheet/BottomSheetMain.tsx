import { BottomSheetContext } from "@/store/BottomSheetContext";
import { css } from "@emotion/react";
import { useContext } from "react";

const mainCss = css({
  width: '100%',
  height: '40%',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid var(--gray-100)',
});
const contentCss = css({
  width: '90%',
  height: '90%',
  display: 'flex',
  fontSize: '1.125rem',
  overflowY: 'scroll',
  overflow: 'hidden',
  border: 'none',
  resize: 'none',
  '::placeholder': {
    color: 'var(--gray-100)',
  },
  ':focus': {
    outline: 'none',
  },
});

export default function BottomSheetMain() {
  const { content, onChangeValue } = useContext(BottomSheetContext);
  return (
    <div css={mainCss}>
      <textarea
        onChange={(e) => onChangeValue(e.target.value)}
        placeholder="내용을 입력하세요."
        css={contentCss}
        value={content}
      />
    </div>
  );
}
