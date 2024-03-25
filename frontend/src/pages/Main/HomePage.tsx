import BottomSheetContent from "@/components/@common/BottomSheet/BottomSheet";
import FootInfo from "@/components/@common/FootInfo";
import UnderLineButton from "@/components/@common/UnderLineButton";
import { useState } from "react";

export default function HomePage() {
  const [test, setTest] = useState(false);
  return (
    <>
      <UnderLineButton first="편의시설" second="안전시설" />
      <FootInfo isStar={false} />
      {test && (
        <BottomSheetContent
          closeBottom={() => {
            setTest(false);
          }}
          title="내용"
          content="하이"
          isFilter={false}
        />
      )}
      <div>메인페이지에요</div>
      <div>메인을 고치면 pwa에는 반영이될까?</div>
      <div>메인페이지에요</div>
      <div
        onClick={() => {
          setTest(true);
        }}
      >
        테스트
      </div>
    </>
  );
}
