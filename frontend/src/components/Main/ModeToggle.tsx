import "@/index.css";
import { css } from "@emotion/react";
import { useState } from "react";

interface PublicToggleProps {
  isWhite: boolean | undefined;
}

const PublicToggle: React.FC<PublicToggleProps> = ({ isWhite }) => {
  const [isOpen, setIsOpen] = useState(isWhite);

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
    white: css({
      background: "rgba( 255, 255, 255, 0.5 )",
      boxShadow: "0 2px 15px 0 rgba( 31, 38, 135, 0.37 )",
      backdropFilter: "blur( 15.5px )",
      border: "2px solid rgba( 255, 255, 255, 0.3 )",
      color: "var(--black)",
    }),
    dark: css({
      background: "rgba( 55, 55, 55, 0.5 )",
      boxShadow: "0 2px 15px 0 rgba( 255, 255, 255, 0.37 )",
      backdropFilter: "blur( 15.5px )",
      border: "2px solid rgba( 255, 255, 255, 0.3 )",
      color: "var(--gray-200)",
    }),
  };

  const btn = {
    style: css({
      width: "5.1vw",
      height: "5.1vw",
      borderRadius: "100px",
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
      transform: "translateX(9.8vw)",
      "@media(min-width: 430px)": {
        transform: "translateX(42px)",
      },
    }),
  };

  const publicType = {
    style: css({
      width: "9.8vw",
      minWidth: "6.3vw",
      fontSize: "2.8vw",
      fontFamily: "exBold",
      zIndex: "3",
      position: "absolute",
      "@media(min-width: 430px)": {
        width: "42px",
        minWidth: "28px",
        fontSize: "12px",
      },
    }),
    white: css({
      left: "0",
      color: "var(--black)",
    }),
    dark: css({
      color: "var(--white)",
      left: "5.8vw",
      "@media(min-width: 430px)": {
        left: "25px",
      },
    }),
  };

  return (
    <div
      css={[toggle.style, isOpen ? toggle.white : toggle.dark]}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div css={[btn.style, isOpen ? btn.public : {}]}>
        {isOpen ? (
          <div
            css={[
              {
                width: "24px",
                height: "24px",
                backgroundColor: "var(--white)",
                borderRadius: "100%",
              },
            ]}
          />
        ) : (
          <div
            css={[
              {
                width: "24px",
                height: "24px",
                backgroundColor: "var(--black)",
                borderRadius: "100%",
              },
            ]}
          />
        )}
      </div>
      <div
        css={[
          publicType.style,
          isOpen ? publicType.white : publicType.dark,
          { fontFamily: "exBold" },
        ]}
      >
        {isOpen ? "LIGHT" : "DARK"}
      </div>
    </div>
  );
};

export default PublicToggle;
