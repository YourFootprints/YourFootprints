import { BottomSheetContext } from "@/store/BottomSheetContext";
import Backdrop from "./Backdrop";
import Bottom from "./Bottom";
import { useState } from "react";

interface BottomSheetType {
  title: string;
  content: string;
  isFilter: boolean;
  closeBottom : () => void
}

export default function BottomSheet({
  title,
  content,
  isFilter,
  closeBottom
}: BottomSheetType) {
  const [contents, setContents] = useState({
    title: title,
    content: content,
    isFilter: isFilter,
  });

  const onChangeValue = (content: string) => {
    setContents((pre) => ({ ...pre, content: content }));
  };

  const CtxValue = {
    ...contents,
    onChangeValue,
    closeBottom
  };

  return (
    <BottomSheetContext.Provider value={CtxValue}>
      <Backdrop>
        <Bottom />
      </Backdrop>
    </BottomSheetContext.Provider>
  );
}
