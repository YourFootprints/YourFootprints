import { Rating } from "@mui/material"
import { css } from "@emotion/react";
import StarIcon from '@mui/icons-material/Star';
import { useState, useEffect, useContext } from "react";
import { RecordContext } from "@/store/Record/RecordDetail";
import { EditContext } from "@/pages/Record/RecordEditPage";

interface StarsProps {
  type: string;
  star: number|null;
}

export const Stars: React.FC<StarsProps> = ({type, star}) => {
  const [score, setScore] = useState(star);
  const {
    record,
    setRecord,
  } = useContext(RecordContext);

  const {
    // isChange, 
    setIsChange,
  } = useContext(EditContext);

  useEffect(() => {
    setScore(star);
  }, [star]);

  switch (type) {
    case "control":
      return(
        <div css={style}>
          <Rating 
            value={score}
            icon={<StarIcon css={color} fontSize="inherit" />}
            emptyIcon={<StarIcon style={{ opacity:0.2, }} fontSize="inherit" />}
            size="large"
            onChange={(_event: any, v: any)=>{
              setScore(v)
              const newRecord = {...record};
              newRecord.starRanking = v;
              setRecord(newRecord);
              setIsChange(true);
            }}
          />
        </div>
      )
    case "read":
      return(
        <div css={style}>
          <Rating 
            value={star}
            icon={<StarIcon css={color} fontSize="inherit" />}
            emptyIcon={<StarIcon style={{ opacity:0.2, }} fontSize="inherit" />}
            size="large"
            readOnly
          />
        </div>
      )
  }
}

const style = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const color = css({
  "*": {
    color: "#E7D995",
  }
})