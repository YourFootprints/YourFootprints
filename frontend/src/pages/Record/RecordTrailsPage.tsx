import { css } from "@emotion/react"
import Trail from "@/components/@common/Trail"
import { getRecords } from "@/services/Record";
import { useEffect, useState } from "react";
import { RecordType } from "@/store/Record/Records";

export default function RecordTrailsPage() {
  const [records, setRecords] = useState<RecordType[]>([]);

  async function fetchRecords() {
    try {
      const recordsData = await getRecords();
      setRecords(recordsData);
      console.log(recordsData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchRecords();
  }, [])

  return (
    <div css={style.page}>
      <div css={style.trails}>
          {records &&
            records.map(record => 
              <Trail 
                key={record.trailsId}
                url={`/record/${record.trailsId}`} 
                record={record}
              />
            )
          }
      </div>
    </div>
  );
}

const style = {
  page: css({
    margin: "6% 0",
  }),
  trails: css({
    display: "inline-flex",
    flexDirection: "column",
    gap: "3.5vw",
    "@media(min-width: 430px)": {
      gap: "16px",
    },
  })
};