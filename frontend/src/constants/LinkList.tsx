import CalenderIcon from "@/assets/Navbar/CalendarIcon.svg?react";
import HomeIcon from "@/assets/Navbar/HomeIcon.svg?react";
import PathIcon from "@/assets/Navbar/PathIcon.svg?react";
import PawPrintIcon from "@/assets/Navbar/PawPrintIcon.svg?react";
import UserIcon from "@/assets/Navbar/UserIcon.svg?react";

export const LinkList = [
  {
    name: "홈",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "산책",
    path: "/fe",
    icon: <PathIcon />,
  },
  {
    name: "기록",
    path: "/record",
    icon: <CalenderIcon />,
  },
  {
    name: "발자국",
    path: "/fe",
    icon: <PawPrintIcon />,
  },
  {
    name: "프로필",
    path: "/fe",
    icon: <UserIcon />,
  },
];
