import { createContext } from 'react';

interface KebabContextType {
  openKebabMenu: boolean;
  setOpenKebabMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KebabContext = createContext<KebabContextType>({
  openKebabMenu: false,
  setOpenKebabMenu: () => {},
  showModal: false,
  setShowModal: () => {},
})