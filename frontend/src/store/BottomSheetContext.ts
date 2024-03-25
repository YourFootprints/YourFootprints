import { createContext } from "react";

export const BottomSheetContext = createContext({
  title: "",
  content: "",
  isFilter: false,
});
