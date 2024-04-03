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
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/@common/Loading";
import Map from "@/components/Record/Map";

// 기록 상세 페이지
export default function RecordTrailDetailPage() {
  const {id: recordId} = useParams();
  const [openKebabMenu, setOpenKebabMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [record, setRecord] = useState<RecordDetailType>(recordState);

  const {data: recordData, isLoading} = useQuery({
    queryKey: ['record', recordId],
    queryFn: () => getRecordDetail(recordId)
  })

  const [copyMap, setCopyMap] = useState<any>(null);
  const handleCopyMap = (value: any) => {
    setCopyMap(value);
  };

  useEffect(()=>{
    if (recordData) {
      setRecord(recordData)
    }
  },[recordData])

  if (isLoading) {
    return(
      <Loading />
    )
  }

  // 폴리라인
  const areaList = record?.coordinateList.map(
    (rec: any) => new window.kakao.maps.LatLng(rec.la, rec.lo)
  );

  const polyline = new window.kakao.maps.Polyline({
    path: areaList,
    strokeWeight: 7.5,
    strokeColor: "#4394EE",
    strokeOpacity: 0.8,
    strokeStyle: "solid",
  });

  polyline.setMap(copyMap);

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
          <Map 
            width="100%"
            height="100%"
            lat={record?.centralCoordinatesLa}
            lng={record?.centralCoordinatesLo}
            handleCopyMap={handleCopyMap}
          />
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
}