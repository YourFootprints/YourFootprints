import DetailHeader from "@/components/@common/DetailHeader";
import { TrailHeader } from "@/components/Record/TrailHeader";
import testImg from "@/assets/image/testmap.png";
import { useState, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import '@/index.css'
import RecordFootInfos from "@/components/Record/RecordFootInfos";
import GrayBar from "@/components/@common/GrayBar";
import Reviews from "@/components/Record/Reviews";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import PencilIcon from "@/assets/Record/PencilCircle.svg?react"
import CanvasMapWrap from "@/components/Record/CanvasMapWrap";
import { backgroundTheme } from "@/constants/ColorScheme";
import MainHeader from "@/components/@common/MainHeader";


interface CustomMapContextType {
  isDraw: boolean;
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>;
  editMap: boolean;
  setEditMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomMapContext = createContext<CustomMapContextType>({
  isDraw: false,
  setIsDraw: () => {},
  editMap: false,
  setEditMap: () => {},
})

export default function RecordEditPage() {
  const {id: recordId} = useParams();
  const navigate = useNavigate();
  
  const [isChange, setIsChange] = useState(false);  // 산책로명, 산책평가, 메모, 이미지 하나라도 바뀌면 true
  const [isDraw, setIsDraw] = useState(false);  // 이미지 바뀌면(그림 그려지면) true
  const [editName, setEditName] = useState(false);
  const [editMap, setEditMap] = useState(false);
  

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
    <div css={[backgroundTheme.custom, {minHeight: "100vh"}]}>
      {editMap?
        <MainHeader title="내 발자취" />
        :<DetailHeader 
          title={"내 발자취"}
          backURL={`/record/${recordId}`}
          backConfirm={(isChange)?"수정된 내용은 저장되지 않습니다. 뒤로 가시겠습니까?":null}
          content={<SaveButton />}
        />
      }
      <div onClick={()=>setEditName(true)}>
        <TrailHeader title={"산책로 이름"} date={"2024.03.06 20:46"} />
      </div>
      <div>
        {editMap?
          // 지도 편집 화면
          <CustomMapContext.Provider value={{isDraw, setIsDraw, editMap, setEditMap}}>
            <CanvasMapWrap imgSrc={testImg} />
          </CustomMapContext.Provider>
          :
          // 일반 화면
          <>
            <div css={map.wrap}>
              <img css={map.img} src={testImg} />
              <div css={map.editBtn} onClick={()=>{setEditMap(true)}}>
                <PencilIcon />
                <div>편집하기</div>
              </div>
            </div>

            <RecordFootInfos />
            <GrayBar />
            <Reviews page={"edit"} />
            {editName && 
            <BottomSheet
              closeBottom={() => {
                setEditName(false);
              }}
              title="기록 이름"
              content="하이"  // [API]
              isFilter={false}
            />
            }

            {/* FIXME API연결 후 삭제 */}
            <div css={{height:"250px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <strong>저장 버튼 테스트</strong>
              <sub>아래 내용을 수정하면 저장버튼이 활성화됩니다</sub>
              <p></p>
              <input onChange={()=>setIsChange(true)}/>
            </div>
            {/* --------------------- */}
          </>
        }
      </div>
    </div>
  )
}

const map = {
  wrap: css({
    width: "100%",
    height: "80vw",
    position: "relative",
    '@media(min-width: 430px)': {
      height: "350px",
    }
  }),
  img: css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }),
  editBtn: css({
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate( -50%, -50% )",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    "div": {
      color: "white",
      fontFamily: "bold",
      fontSize: "12px",
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