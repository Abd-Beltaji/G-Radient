import { getMode, default as Header } from "./Components/Header/Header";
import GradientViewer from "Components/GradientViewer/viewer";
import GradientControls from "Components/GradientControls/GradientControls";
import { useState, useEffect } from "react";

import {
  generateLinearGradient,
  generateRadialGradient,
} from "generateGradientCode";
import { asRGB, rgb2hsv } from "utils";
import {
  setHue,
  setLight,
  setOpacity,
  setOpacityColor,
  setSaturation,
} from "Components/GradientControls/colorPicker/colorPicker";
let controls: { color: string; stop: number }[],
  setControls: React.Dispatch<
    React.SetStateAction<
      {
        color: string;
        stop: number;
      }[]
    >
  >;

let controlElements: JSX.Element[],
  setControlElements: React.Dispatch<React.SetStateAction<JSX.Element[]>>;

let mode: string, setMode: React.Dispatch<React.SetStateAction<string>>;

let activeControlIndex: number,
  setActiveControlIndex: React.Dispatch<React.SetStateAction<number>>;
const App = () => {
  [mode, setMode] = useState("radial");

  [controls, setControls] = useState([
    {
      color: "#0099ff",
      stop: 0,
    },
    {
      color: "#00009e",
      stop: 50,
    },
    {
      color: "#7210f3",
      stop: 100,
    },
  ]);

  [activeControlIndex, setActiveControlIndex] = useState(0);
  const [gradientCode, setGradientCode] = useState("");

  useEffect(() => {
    let mode = getMode();
    setGradientCode(
      mode === "radial"
        ? generateRadialGradient({
            colors: controls,
            type: "circle",
            at: "50%",
          })
        : generateLinearGradient({
            colors: controls,
            angle: 90,
          })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, mode]);

  useEffect(() => {
    let [r, g, b, a] = asRGB([...controls][activeControlIndex].color);
    let [h, s, v] = rgb2hsv(r, g, b);
    setHue(h / 3.6);
    setSaturation(s * 100);
    setLight((100 * v) / 255);
    setOpacity(a * 100);

    setOpacityColor(
      `hsl(${Math.round(h)}deg,${Math.round(s * 100)}%,${Math.round(
        (50 * v) / 255
      )}%)`
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeControlIndex]);

  [controlElements, setControlElements] = useState([<div></div>]);

  return (
    <div id="App">
      <Header />
      <GradientViewer gradientCode={gradientCode} />
      <GradientControls />
    </div>
  );
};
export default App;

export {
  mode,
  setMode,
  controls,
  setControls,
  activeControlIndex,
  setActiveControlIndex,
  controlElements,
  setControlElements,
};
