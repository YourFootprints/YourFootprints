import { css } from "@emotion/react";
import { Review } from "@/components/Record/Review";
import { Stars } from "@/components/Record/Stars";
import { useState, useContext } from "react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import { backgroundTheme } from "@/constants/ColorScheme";
import { EditContext } from "@/pages/Record/RecordEditPage";
import { RecordContext } from "@/store/Record/RecordDetail";

interface ReviewsProps {
  page?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ page }) => {
  const {
    record,
    setRecord,
  } = useContext(RecordContext);
  const {
    // isChange,
    setIsChange,
  } = useContext(EditContext);

  const [editMemo, setEditMemo] = useState(false);
  const [memo, setMemo] = useState(record.memo);

  // 수정페이지
  if (page === "edit") {
    return (
      <div css={reviews.box}>
        {/* 산책 리뷰 */}
        <Review
          title={"산책평가"}
          content={<Stars type={"control"} star={record.starRanking} />}
        />
        <Review
          title={"메모"}
          content={<div css={reviews.memo}>{record.memo}</div>}
          click={() => {
            setEditMemo(true);
          }}
        />
        {editMemo && (
          <BottomSheet
            title="메모"
            saveButton={()=>{
              const newRecord = {...record};
              newRecord.memo = memo;
              setRecord(newRecord);
              setIsChange(true);
              setEditMemo(false);
            }}
            closeBottom={() => {
              setEditMemo(false);
              setMemo(record.memo);
            }}
            isFilter={false}
          >
            <textarea
              // placeholder={record.memo}
              css={contentCss}
              value={memo}
              onChange={(e)=>{
                setMemo(e.target.value)
              }}
            />
          </BottomSheet>
        )}
      </div>
    );

    // 조회페이지
  } else {
    return (
      <div css={reviews.box}>
        {/* 산책 리뷰 */}
        <Review
          title={"산책평가"}
          content={<Stars type={"read"} star={record.starRanking} />}
        />
        <Review title={"메모"} content={<div css={reviews.memo}>{record.memo}</div>} />
      </div>
    );
  }
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

const reviews = {
  box: css(
    {
      padding: "0 3.5%",
      display: "flex",
      flexDirection: "column",
      gap: "8vw",
      "@media(min-width: 430px)": {
        gap: "36px",
      },
    },
    backgroundTheme.basic
  ),

  memo: css({
    width: "100%",
    minHeight: "25vw",
    maxHeight: "50vw",
    overflow: "scroll",
    overflowX: "hidden",
    border: "1px solid var(--gray-100)",
    borderRadius: "10px",
    padding: "3.5vw",
    boxSizing: "border-box",
    textAlign: "left",
    fontSize: "2.8vw",
    "@media(min-width: 430px)": {
      minHeight: "110px",
      maxHeight: "220px",
      padding: "15px",
      fontSize: "12px",
    },
  }),
};

export default Reviews;
