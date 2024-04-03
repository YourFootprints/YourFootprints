import "@/index.css";
import { css } from "@emotion/react";
import { useEffect, useState, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailHeader from "@/components/@common/DetailHeader";
import GrayBar from "@/components/@common/GrayBar";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import TrailHeader from "@/components/Record/TrailHeader";
import RecordFootInfos from "@/components/Record/RecordFootInfos";
import Reviews from "@/components/Record/Reviews";
import { getRecordDetail, updateRecord } from "@/services/Record";
import { recordState, RecordDetailType, RecordContext } from "@/store/Record/RecordDetail";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Loading from "@/components/@common/Loading";

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
  const [editName, setEditName] = useState(false);

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
    <div css={{ minHeight: "100vh", paddingBottom: "2rem" }}>
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
      <RecordContext.Provider value={{record, setRecord}}>
        <div onClick={() => setEditName(true)}>
          <TrailHeader record={record} />
        </div>
        <div>
          <EditContext.Provider
            value={{
              isChange,
              setIsChange,
            }}
          >
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
      </div>
      </RecordContext.Provider>
    </div>
  );
}

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
