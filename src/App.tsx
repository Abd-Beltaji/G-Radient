import { getMode, default as Header } from "./Components/Header/Header";
import GradientViewer from "Components/GradientViewer/viewer";
import GradientControls, {
  setOutputCode,
} from "Components/GradientControls/GradientControls";
import React, { useState, useEffect } from "react";

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
  updateColorValues,
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

let angle: number, setAngle: React.Dispatch<React.SetStateAction<number>>;
const App = () => {
  [angle, setAngle] = useState(90);
  [mode, setMode] = useState("radial");

  [controls, setControls] = useState([
    {
      color: "#bd03ffff",
      stop: 0,
    },
    {
      color: "#009e71ff",
      stop: 31,
    },
    {
      color: "#22b526ff",
      stop: 68,
    },
    {
      color: "#7210f3ff",
      stop: 100,
    }
   
  ]);
  // [controls, setControls] = useState([
  //   {
  //     color: "#0aff03",
  //     stop: 0,
  //   },
  //   {
  //     color: "#00009e",
  //     stop: 30,
  //   },
  //   {
  //     color: "#ff009c",
  //     stop: 60,
  //   },
  //   {
  //     color: "#9f1a30",
  //     stop: 80,
  //   },
  //   {
  //     color: "#7210f3",
  //     stop: 100,
  //   },
  // ]);

  [activeControlIndex, setActiveControlIndex] = useState(0);
  const [gradientCode, setGradientCode] = useState("");

  useEffect(() => {
    let mode = getMode();
    let newCode =
      mode === "radial"
        ? generateRadialGradient({
            colors: controls,
            type: "circle",
            at: "50%",
          })
        : generateLinearGradient({
            colors: controls,
            angle,
          });
    setGradientCode(newCode);
    setOutputCode(newCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, mode, angle]);

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
    updateColorValues();
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
  angle,
  setAngle,
};
