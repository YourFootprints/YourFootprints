import { BottomSheetContext } from "@/store/BottomSheetContext";
import { css } from "@emotion/react";
import { useContext } from "react";

const headerCss = css`
  width: 100%;
  height: 10%;
  border-radius: 20px 20px 0 0;
  background-color: white;
  font-size: 1.25rem;
  font-family: "bold";
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--gray-100);
`;
export default function BottomSheetHeader() {
  const { title } = useContext(BottomSheetContext);
  return <div css={headerCss}>{title}</div>;
}
