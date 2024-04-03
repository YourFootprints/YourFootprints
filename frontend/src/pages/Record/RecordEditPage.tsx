import "@/index.css";
import { css } from "@emotion/react";
import { useEffect, useState, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainHeader from "@/components/@common/MainHeader";
import DetailHeader from "@/components/@common/DetailHeader";
import GrayBar from "@/components/@common/GrayBar";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import TrailHeader from "@/components/Record/TrailHeader";
import RecordFootInfos from "@/components/Record/RecordFootInfos";
import Reviews from "@/components/Record/Reviews";
import CanvasMapWrap from "@/components/Record/CanvasMapWrap";
import PencilIcon from "@/assets/Record/PencilCircle.svg?react";
import { backgroundTheme } from "@/constants/ColorScheme";
import { getRecordDetail, updateRecord } from "@/services/Record";
import { recordState, RecordDetailType, RecordContext } from "@/store/Record/RecordDetail";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Loading from "@/components/@common/Loading";

interface CustomMapContextType {
  isDraw: boolean;
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>;
  editMap: boolean;
  setEditMap: React.Dispatch<React.SetStateAction<boolean>>;
  record: RecordDetailType;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetailType>>;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomMapContext = createContext<CustomMapContextType>({
  isDraw: false,
  setIsDraw: () => {},
  editMap: false,
  setEditMap: () => {},
  record: recordState,
  setRecord: () => {},
  isChange: false,
  setIsChange: () => {},
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

  const [isChange, setIsChange] = useState(false);  // 산책로명, 산책평가, 메모, 이미지 하나라도 바뀌면 true
  const [isDraw, setIsDraw] = useState(false);      // 이미지 바뀌면(그림 그려지면) true
  const [editName, setEditName] = useState(false);
  const [editMap, setEditMap] = useState(false);

  const [record, setRecord] = useState<RecordDetailType>(recordState);
  const [name, setName] = useState(record.trailsName);

  const { data: recordData, isLoading } = useQuery({
    queryKey: ['record', recordId],
    queryFn: () => getRecordDetail(recordId)
  });

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: updateRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['record', recordId] })
    }
  })

  useEffect(()=> {
    if (recordData) {
      setRecord(recordData)
      setName(recordData.trailsName)
    }
  }, [recordData])

  function changeRecord() {
    const data = new FormData();
    if (record.trailsFile) {
      data.append("trailsImg", record.trailsFile)
    }
    data.append("memo", record.memo)
    data.append("starRanking", record.starRanking.toString())
    data.append("trailsName", record.trailsName)

    try {
      mutate({id: recordId, form: data});
    } catch (err) {
      console.log(err)
    }
  }

  const SaveButton = () => {
    if (isChange) {
      return (
        <div
          css={header.change}
          onClick={() => {
            changeRecord();
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

  
  if (isLoading) {
    return(
      <Loading />
    )
  }


  return (
    <div
      css={[
        editMap ? backgroundTheme.custom : backgroundTheme.basic,
        { minHeight: "100vh", paddingBottom: "2rem" },
      ]}
    >
      {editMap ? (
        <MainHeader title="내 발자취" />
        // <DetailHeader
        //   title={"내 발자취"}
        //   backURL={`/record/${recordId}`}
        //   backConfirm={
        //     isChange
        //       ? "수정된 내용은 저장되지 않습니다. 뒤로 가시겠습니까?"
        //       : null
        //   }
        //   content={<SaveButton />}
        // />
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
      <input type="capture" />
      <RecordContext.Provider value={{record, setRecord}}>
        <div onClick={() => setEditName(true)}>
          <TrailHeader record={record} />
        </div>
        <div>
          {editMap ? (
            // 지도 편집 화면
            <CustomMapContext.Provider
              value={{ isDraw, setIsDraw, editMap, setEditMap, record, setRecord, isChange, setIsChange, }}
            >
              <CanvasMapWrap imgSrc={record.trailsImg} />
            </CustomMapContext.Provider>
          ) : (
            // 일반 화면
            <EditContext.Provider
              value={{
                isChange,
                setIsChange,
              }}
            >
              {/* 지도 이미지 (+ 편집버튼) */}
              <div css={map.wrap}>
                <img css={map.img} src={record.trailsImg} />
                {/* <div
                  css={map.editBtn}
                  onClick={() => {
                    setEditMap(true);
                  }}
                  >
                  <PencilIcon />
                  <div>편집하기</div>
                </div> */}
              </div>
              <RecordFootInfos /> {/* 시간 거리 동네 */}
              <GrayBar /> {/* 회색바 */}
              <Reviews page={"edit"} /> {/* 산책평가, 메모 */}
              {/* 하단팝업 */}
              {editName && (
                <BottomSheet
                  title="산책로명"
                  saveButton={()=>{
                    const newRecord = {...record};
                    newRecord.trailsName = name;
                    setRecord(newRecord);
                    setIsChange(true);
                    setEditName(false);
                  }}
                  closeBottom={() => {
                    setEditName(false);
                    setName(record.trailsName);
                  }}
                  isFilter={false}
                >
                  <textarea
                    // placeholder={record.trailsName}
                    css={contentCss}
                    value={name}
                    onChange={(e)=>{
                      setName(e.target.value)
                    }}
                  />
                </BottomSheet>
              )}
          </EditContext.Provider>
        )}
      </div>
      </RecordContext.Provider>
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

// textarea 일 때 쓰는 것
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
