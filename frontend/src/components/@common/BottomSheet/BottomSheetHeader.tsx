import { BottomSheetContext } from "@/store/BottomSheetContext";
import { css } from "@emotion/react";
import { useContext } from "react";

const headerCss = css({
  width: '100%',
  height: '10%',
  borderRadius: '20px 20px 0 0',
  backgroundColor: 'white',
  fontSize: '1.25rem',
  fontFamily: '"bold"',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid var(--gray-100)',
});
export default function BottomSheetHeader() {
  const { title } = useContext(BottomSheetContext);
  return <div css={headerCss}>{title}</div>;
}
