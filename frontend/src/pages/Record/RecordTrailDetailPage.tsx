import DetailHeader from "@/components/@common/DetailHeader";
import { css } from "@emotion/react";
import "@/index.css";
import testImg from "@/assets/image/testmap.png";
import { useParams, useNavigate } from "react-router-dom";
// import * as React from 'react';
import { createContext, useState } from 'react'
import KebabIcon from "@/components/Record/KebabIcon";
import KebabMenu from "@/components/Record/KebabMenu";
import { TrailHeader } from "@/components/Record/TrailHeader";
import ShareModal from "@components/Record/ShareModal";
import RecordFootInfos from "@/components/Record/RecordFootInfos";
import GrayBar from "@/components/@common/GrayBar";
import Reviews from "@/components/Record/Reviews";

interface KebabContextType {
  openKebabMenu: boolean;
  setOpenKebabMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KebabContext = createContext<KebabContextType>({
  openKebabMenu: false,
  setOpenKebabMenu: () => {},
  showModal: false,
  setShowModal: () => {},
})

// 기록 상세 페이지
export default function RecordTrailDetailPage() {
  const navigate = useNavigate();
  const [openKebabMenu, setOpenKebabMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const {id: recordId} = useParams();
  console.log(recordId)

  return(
    <div css={page}>
      <KebabContext.Provider value={{openKebabMenu, setOpenKebabMenu, showModal, setShowModal}}>
        <DetailHeader title={"내 발자취"} backURL={"/record"} content={<KebabIcon />} />
        {openKebabMenu?<KebabMenu />:<></>}
        {showModal?<ShareModal />:<></>}
      </KebabContext.Provider>

      <TrailHeader title={"산책로 이름"} date={"2024.03.06 20:46"} isPublic={false} />
      <div>  {/* 내용 */}
        {/* [API] */}
        {/* FIXME navigate 지도클릭 페이지(피그마 참고) */}
        <div css={map.wrap}>
          <img css={map.img} src={testImg} onClick={()=>{ navigate("") }} />  {/* 지도이미지 */}
        </div>
        <RecordFootInfos />
        <GrayBar />
        <Reviews />
      </div>
    </div>
  )
}


/* emotion */
const page = css({
  paddingBottom: "84px",
})

const map = {
  // 지도 이미지
  wrap: css({
    width: "100%",
    height: "80vw",
    '@media(min-width: 430px)': {
      height: "350px",
    }
  }),
  img: css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
  })
}