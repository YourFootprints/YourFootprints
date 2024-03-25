// import * as React from "react";
// import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { css } from "@emotion/react"
import { useNavigate } from "react-router-dom";
import RecordTabLayout from "./RecordTabLayout";

export default function RecordPage() {
	const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    navigate(
      {
        pathname: '/record',
        search: `?tab=${tab}`,
      },
      { replace: true }
    );
  };

  const tab = css({
    cursor: "pointer"
  })

  return(
    <div>
      {/* FIXME 탭헤더 공통컴포넌트 들어갈 부분 */}
      <div style={{height: "60px", display:"flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid var(--gray-100)"}}>
        <div css={tab} onClick={()=>{handleTabClick("calendar")}}>캘린더</div>
        <div css={tab} onClick={()=>{handleTabClick("mytrails")}}>산책목록</div>
      </div>

      <RecordTabLayout />
    </div>
  )
}