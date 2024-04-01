import '@/index.css'
import { css } from "@emotion/react";
import { useContext } from 'react';
import { updatePublic } from '@/services/Record';
import TruePublic from "@/assets/Record/LockSimpleOpen.svg?react"
import FalsePublic from "@/assets/Record/LockSimple.svg?react"
import { RecordContext } from '@/store/Record/RecordDetail';

interface PublicToggleProps {
  id: string;
  isPublic: boolean;
}

const PublicToggle: React.FC<PublicToggleProps> = ({id, isPublic}) => {
  const {isOpen, setIsOpen} = useContext(RecordContext);

  async function changePublic() {
    try {
      await updatePublic(id, isPublic);
      setIsOpen(!isOpen);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div css={[toggle.style, (isPublic)?toggle.public:toggle.private]} onClick={()=>{changePublic()}}>
      <div css={[btn.style,(isPublic)?btn.public:{}]}>
        {isPublic?<TruePublic />:<FalsePublic />}
      </div>
      <div css={[publicType.style, (isPublic)?publicType.public:publicType.private]}>{isPublic?"공개":"비공개"}</div>
    </div>
  );
};

const toggle = {
  style: css({
    width: "16.3vw",
    height: "6.5vw",
    borderRadius: "100px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s ease all",
    position: "relative",
    textAlign: "center",
    "@media(min-width: 430px)": {
      width: "70px",
      height: "28px",
    },
  }),
  public: css({
    background: "var(--main-color)",
  }),
  private: css({
    background: "var(--gray-200)",
  })
}

const btn = {
  style: css({
    width: "5.1vw",
    height: "5.1vw",
    borderRadius: "100px",
    background: "white",
    marginLeft: "0.7vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.3s ease all",
    "@media(min-width: 430px)": {
      width: "22px",
      height: "22px",
      marginLeft: "3px",
    },
  }),
  public: css({
    transform: 'translateX(9.8vw)',
    "@media(min-width: 430px)": {
      transform: 'translateX(42px)',
    }
  }),
}

const publicType = {
  style: css({
    width: "9.8vw",
    minWidth: "6.3vw",
    fontSize: "2.8vw",
    color: "white",
    zIndex: "3",
    position: "absolute",
    "@media(min-width: 430px)": {
      width: "42px",
      minWidth: "28px",
      fontSize: "12px",
    },
  }),
  public: css({
    left: "0",
  }),
  private: css({
    left: "5.8vw",
    "@media(min-width: 430px)": {
      left: "25px",
    }
  })
}

export default PublicToggle;