import { createContext } from "react";

export const BottomSheetContext = createContext({
  title: "",
  content: "",
  isFilter: false,
  closeBottom: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChangeValue: (_content: string) => {},
});
