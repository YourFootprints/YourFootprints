import { useNavigate } from "react-router-dom";
import RecordTabLayout from "@pages/Record/RecordTabLayout";
import UnderLineButton from "@/components/@common/UnderLineButton";

export default function RecordPage() {
	const navigate = useNavigate();
  const [first, second] = ["캘린더", "산책목록"];


  const handleTabClick = (tab: string) => {
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
      <UnderLineButton first={first} second={second} select={first} handleClickSelect={handleTabClick} />
      <RecordTabLayout />
    </div>
  )
}