import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";
import { LinkList } from "@/constants/LinkList";

const navCss = css({
  width: "100%",
  maxWidth: "430px",
  height: "84px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "start",
  backgroundColor: "#f4f4f4",
  padding: "0.5rem 0",
  gap: "1.5rem",
  position: "fixed",
  bottom: "0",
  zIndex: "10",
});

const defaultCss = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: {
    fontSize: "10px",
    margin: "0px",
  },
});

const linkCss = css({
  textDecorationLine: "none",
});

const unActiveCss = css({
  path: {
    stroke: "var(--gray-100)",
  },
  p: {
    color: "var(--gray-100)",
  },
});

const activeCss = css({
  path: {
    stroke: "var(--black)",
  },
  p: {
    color: "var(--black)",
  },
});

export default function Navbar() {
  return (
    <nav css={navCss}>
      {LinkList.map((lnk) => (
        <NavLink key={lnk.name} css={linkCss} to={lnk.path}>
          {({ isActive }) => (
            <div css={[defaultCss, isActive ? activeCss : unActiveCss]}>
              {lnk.icon}
              <p>{lnk.name}</p>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
