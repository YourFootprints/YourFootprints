import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import FootInfo from "@/components/@common/FootInfo";
import UnderLineButton from "@/components/@common/UnderLineButton";
import { useState } from "react";

export default function ComponetsTest() {
  const [test, setTest] = useState(false);

  const handleClickAlert = () => {
    alert("테스트입니다");
  };

  const handleClickConfirm = () => {
    confirm("컨필름입니다");
  };
  return (
    <>
      <UnderLineButton first="편의시설" second="안전시설" />
      <FootInfo isStar={false} />
      {test && (
        <BottomSheet
          closeBottom={() => {
            setTest(false);
          }}
          title="내용"
          content="하이"
          isFilter={false}
        />
      )}
      <div
        onClick={() => {
          setTest(true);
        }}
      >
        테스트
      </div>
      <div onClick={handleClickAlert}>얼라트테스트</div>
      <div onClick={handleClickConfirm}>컨필름테스트</div>
    </>
  );
}