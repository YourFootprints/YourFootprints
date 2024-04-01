import DetailHeader from "@/components/@common/DetailHeader";
import { TrailHeader } from "@/components/Record/TrailHeader";
import { useEffect, useState, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import "@/index.css";
import RecordFootInfos from "@/components/Record/RecordFootInfos";
import GrayBar from "@/components/@common/GrayBar";
import Reviews from "@/components/Record/Reviews";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import PencilIcon from "@/assets/Record/PencilCircle.svg?react";
import CanvasMapWrap from "@/components/Record/CanvasMapWrap";
import { backgroundTheme } from "@/constants/ColorScheme";
import MainHeader from "@/components/@common/MainHeader";
import { getTrailDetail } from "@/services/Record";
import { trailState, TrailType, TrailContext } from "@/store/Record/TrailDetail";

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
});

interface EditContextType {
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditContext = createContext<EditContextType>({
  isChange: false,
  setIsChange: () => {},
});

export default function RecordEditPage() {
  const { id: recordId } = useParams();
  const navigate = useNavigate();

  const [isChange, setIsChange] = useState(false); // 산책로명, 산책평가, 메모, 이미지 하나라도 바뀌면 true
  const [isDraw, setIsDraw] = useState(false); // 이미지 바뀌면(그림 그려지면) true
  const [editName, setEditName] = useState(false);
  const [editMap, setEditMap] = useState(false);

  const [trail, setTrail] = useState<TrailType>(trailState);

  async function fetchTrailDetail() {
    try {
      const trailDetail = await getTrailDetail(recordId);
      setTrail(trailDetail);
      console.log(trailDetail)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchTrailDetail();
  },[])

  const SaveButton = () => {
    if (isChange) {
      return (
        <div
          css={header.change}
          onClick={() => {
            // [API] 산책로이름, 이미지, 산책평가, 메모 저장
            alert("저장되었습니다.");
            navigate(`/record/${recordId}`);
          }}
        >
          저장
        </div>
      );
    } else {
      return <div css={header.none}>저장</div>;
    }
  };

  return (
    <div
      css={[
        editMap ? backgroundTheme.custom : backgroundTheme.basic,
        { minHeight: "100vh" },
      ]}
    >
      {editMap ? (
        <MainHeader title="내 발자취" />
      ) : (
        <DetailHeader
          title={"내 발자취"}
          backURL={`/record/${recordId}`}
          backConfirm={
            isChange
              ? "수정된 내용은 저장되지 않습니다. 뒤로 가시겠습니까?"
              : null
          }
          content={<SaveButton />}
        />
      )}
      <TrailContext.Provider value={{trail, setTrail}}>
        <div onClick={() => setEditName(true)}>
          <TrailHeader title={trail.trailsName} date={"2024.03.06 20:46"} />
        </div>
        <div>
          {editMap ? (
            // 지도 편집 화면
            <CustomMapContext.Provider
              value={{ isDraw, setIsDraw, editMap, setEditMap }}
            >
              <CanvasMapWrap imgSrc={trail.trailsImg} />
            </CustomMapContext.Provider>
          ) : (
            // 일반 화면
            <EditContext.Provider
              value={{
                isChange,
                setIsChange,
              }}
            >
              <div css={map.wrap}>
                {/* 지도 이미지 (+ 편집버튼) */}
                <img css={map.img} src={trail.trailsImg} />
                <div
                  css={map.editBtn}
                  onClick={() => {
                    setEditMap(true);
                  }}
                >
                  <PencilIcon />
                  <div>편집하기</div>
                </div>
              </div>
              <RecordFootInfos /> {/* 시간 거리 동네 */}
              <GrayBar /> {/* 회색바 */}
              <Reviews page={"edit"} /> {/* 산책평가, 메모 */}
              {/* 하단팝업 */}
              {editName && (
                <BottomSheet
                  title="메모"
                  closeBottom={() => {
                    setEditName(false);
                  }}
                  isFilter={false}
                >
                  <textarea
                    placeholder="내용을 입력하세요."
                    css={contentCss}
                    value={trail.memo}
                  />
                </BottomSheet>
              )}

            {/* FIXME API연결 후 삭제 */}
            <div
              css={{
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <strong>저장 버튼 테스트</strong>
              <sub>아래 내용을 수정하면 저장버튼이 활성화됩니다</sub>
              <p></p>
              <input onChange={() => setIsChange(true)} />
            </div>
            {/* --------------------- */}
          </EditContext.Provider>
        )}
      </div>
      </TrailContext.Provider>
    </div>
  );
}

const map = {
  wrap: css({
    width: "100%",
    height: "80vw",
    position: "relative",
    "@media(min-width: 430px)": {
      height: "350px",
    },
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
    div: {
      color: "white",
      fontFamily: "bold",
      fontSize: "12px",
    },
  }),
};

const header = {
  change: css({
    color: "var(--main-color)",
    cursor: "pointer",
  }),
  none: css({
    color: "var(--gray-100)",
  }),
};

// 텍스트에리어일때 쓰는것
const contentCss = css({
  width: "90%",
  height: "90%",
  display: "flex",
  fontSize: "1.125rem",
  overflowY: "scroll",
  overflow: "hidden",
  border: "none",
  resize: "none",
  "::placeholder": {
    color: "var(--gray-100)",
  },
  ":focus": {
    outline: "none",
  },
});
