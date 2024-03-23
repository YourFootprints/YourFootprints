import { Rating } from "@mui/material"
import { css } from "@emotion/react";
import StarIcon from '@mui/icons-material/Star';

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

  switch (type) {
    case "control":
      return(
        <div css={style}>
          <Rating />
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