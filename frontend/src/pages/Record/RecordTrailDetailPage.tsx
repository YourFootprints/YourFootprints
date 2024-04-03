import "@/index.css";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import DetailHeader from "@/components/@common/DetailHeader";
import GrayBar from "@/components/@common/GrayBar";
import TrailHeader from "@/components/Record/TrailHeader";
import KebabIcon from "@/components/Record/KebabIcon";
import KebabMenu from "@/components/Record/KebabMenu";
import Reviews from "@/components/Record/Reviews";
import ShareModal from "@components/Record/ShareModal";
import RecordFootInfos from "@/components/Record/RecordFootInfos";
import { getRecordDetail } from "@/services/Record";
import { KebabContext } from "@/store/Record/Kebab";
import { recordState, RecordDetailType, RecordContext } from "@/store/Record/RecordDetail";

// 기록 상세 페이지
export default function RecordTrailDetailPage() {
  const {id: recordId} = useParams();
  const [openKebabMenu, setOpenKebabMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [record, setRecord] = useState<RecordDetailType>(recordState);

  async function fetchRecordDetail() {
    console.log('하하하')
    try {
      const recordData = await getRecordDetail(recordId);
      setRecord(recordData);
      console.log(recordData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchRecordDetail();
  },[])

  return(
    <div css={page}>
      <KebabContext.Provider value={{openKebabMenu, setOpenKebabMenu, showModal, setShowModal}}>
        <DetailHeader title={"내 발자취"} backURL={"/record"} content={<KebabIcon />} />
        {openKebabMenu && <KebabMenu />}
        {showModal && <ShareModal />}
      </KebabContext.Provider>

      <RecordContext.Provider value={{record, setRecord}}>
        <TrailHeader id={recordId} record={record} />
          <div css={map.wrap}>
            <img css={map.img} src={record.trailsImg} />  {/* 지도이미지 */}
          </div>
          <RecordFootInfos />
          <GrayBar />
          <Reviews />
      </RecordContext.Provider>
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