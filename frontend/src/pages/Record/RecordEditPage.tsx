import DetailHeader from "@/components/@common/DetailHeader";
import { TrailHeader } from "@/components/Record/TrailHeader";
import testImg from "@/assets/image/testmap.png";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import '@/index.css'
import RecordFootInfos from "@/components/Record/RecordFootInfos";
import TrailInfo from "@/components/@common/TrailInfo";
import GrayBar from "@/components/@common/GrayBar";
import Reviews from "@/components/Record/Reviews";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";

export default function RecordEditPage() {
  const [isChange, setIsChange] = useState(false);
  const [editName, setEditName] = useState(false);
  
  const {id: recordId} = useParams();
  const navigate = useNavigate();

  const SaveButton = () => {
    if (isChange) {
      return (
        <div 
          css={header.change}
          onClick={()=>{
            // [API] 산책로이름, 이미지, 산책평가, 메모 저장
            alert("저장되었습니다.");
            navigate(`/record/${recordId}`);
        }}>
          저장
        </div>
      )
    } else {
      return (
        <div css={header.none}>저장</div>
      )
    }
  }


  return (
    <div>
      <DetailHeader 
        title={"내 발자취"}
        backURL={`/record/${recordId}`}
        backConfirm={(isChange)?"수정된 내용은 저장되지 않습니다. 뒤로 가시겠습니까?":null}
        content={
          <SaveButton />
        }
      />
      <div onClick={()=>setEditName(true)}>
        <TrailHeader title={"산책로 이름"} date={"2024.03.06 20:46"} />
      </div>
      <div>
        <img css={style.map} src={testImg} onClick={()=>{ navigate("") }} />
        <RecordFootInfos info={
          <>
          <TrailInfo name={"시간"} value={"1:05:15"}/>
          <TrailInfo name={"거리(km)"} value={"4.2"}/>
          <TrailInfo name={"동네"} value={"개봉동"}/>
          </>
        }/>
        <GrayBar />
        <Reviews page={"edit"} />

      </div>

      {editName && <BottomSheet
        closeBottom={() => {
          setEditName(false);
        }}
        title="기록 이름"
        content="하이"  // [API]
        isFilter={false}
      />}
      

      {/* FIXME API연결 후 삭제 */}
      <div css={{height:"250px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <strong>저장 버튼 테스트</strong>
        <sub>아래 내용을 수정하면 저장버튼이 활성화됩니다</sub>
        <p></p>
        <input onChange={()=>setIsChange(true)}/>
      </div>
      {/* --------------------- */}

    </div>
  )
}

const style = {
  map: css({
    width: "100%",
    height: "80vw",
    objectFit: "cover",
    '@media(min-width: 430px)': {
      height: "350px",
    }
  })
}

const header = {
  change: css({
    color: "var(--main-color)",
    cursor: "pointer",
  }),
  none: css({
    color: "var(--gray-100)",
  })
}