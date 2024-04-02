import { createContext, useRef, useState } from "react";
import CanvasMap from "@/components/Record/CanvasMap";
import CanvasMapControl from "@/components/Record/CanvasMapControl";

interface CanvasMapContextType {
  brushColor: string;
  setBrushColor: React.Dispatch<React.SetStateAction<string>>;
  brushSize: number;
  setBrushSize: React.Dispatch<React.SetStateAction<number>>;
  customMap: React.MutableRefObject<any>;
  mapImg: React.MutableRefObject<any>;
  clear: () => void;
  undo: () => void;
}

export const CanvasMapContext = createContext<CanvasMapContextType>({
  brushColor: "black",
  setBrushColor: () => {},
  brushSize: 3,
  setBrushSize: () => {},
  customMap: {current: null},
  mapImg: {current: null},
  clear: () => {},
  undo: () => {},
})

export default function CanvasMapWrap({imgSrc}:{imgSrc:string}) {
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(3);

  const customMap = useRef<any>(null);
  const mapImg = useRef<any>(null);
  const clear = () => {
    customMap.current.clear();
  }
  const undo = () => {
    customMap.current.undo();
  }

  return (
    <CanvasMapContext.Provider
      value={{
        brushColor, 
        setBrushColor, 
        brushSize, 
        setBrushSize, 
        customMap, 
        mapImg,
        clear, 
        undo,
      }}>
      <CanvasMap imgSrc={imgSrc} />
      <CanvasMapControl />
    </CanvasMapContext.Provider>
  )
}