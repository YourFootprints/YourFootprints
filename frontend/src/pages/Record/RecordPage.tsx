import { useNavigate } from "react-router-dom";
import RecordTabLayout from "@pages/Record/RecordTabLayout";
import UnderLineButton from "@/components/@common/UnderLineButton";
import { useState } from "react";

export default function RecordPage() {
	const navigate = useNavigate();
  const [first, second] = ["캘린더", "산책목록"];
  const [select, setSelect] = useState(first);

  const handleTabClick = (tab: string) => {
    setSelect(tab);
    const url: string = (tab === first?"calendar":"mytrails");

    navigate(
      {
        pathname: '/record',
        search: `?tab=${url}`,
      },
      { replace: true }
    );
  };
  
  return(
    <div>
      <UnderLineButton first={first} second={second} select={select} handleClickSelect={handleTabClick} />
      <RecordTabLayout />
    </div>
  )
}