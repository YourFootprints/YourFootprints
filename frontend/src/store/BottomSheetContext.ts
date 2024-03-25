import { createContext } from "react";

export const BottomSheetContext = createContext({
  title: "",
  content: "",
  isFilter: false,
  closeBottom: () => {},
  onChangeValue: (_e: React.ChangeEvent<HTMLTextAreaElement>) => {},
});
