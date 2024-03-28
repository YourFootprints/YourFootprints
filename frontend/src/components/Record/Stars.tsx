import { Rating } from "@mui/material"
import { css } from "@emotion/react";
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";

interface StarsProps {
  type: string;
  star: number|null;
}

export const Stars: React.FC<StarsProps> = ({type, star}) => {
  const style = css({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })

  const [score, setScore] = useState(star);

  switch (type) {
    case "control":
      return(
        <div css={style}>
          <Rating 
            value={score}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            size="large"
            onChange={(
              // event: any, v
              event: any
              )=>{
              setScore(Number(event.target.value))
              // setScore(v)
            }}
          />
        </div>
      )
    case "read":
      return(
        <div css={style}>
          <Rating 
            value={star}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            size="large"
            readOnly
          />
        </div>
      )
  }
}