import { useSearchParams } from "react-router-dom";
import ErrorLayout from "../@Layout/ErrorLayout";

import RecordCalendarPage from "./RecordCalendarPage";
import RecordTrailsPage from "./RecordTrailsPage";

export default function RecordTabLayout() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  if (tab === "calendar" || tab === null) {
  // if (tab === "calendar") {
    return (
      <RecordCalendarPage />
    )
  } else if (tab === "mytrails") {
    return (
      <RecordTrailsPage />
    )
  } 
  else {
    return (
      // FIXME 이 부분 상하단 탭 숨기기..?
      <ErrorLayout />
    )
  }
}