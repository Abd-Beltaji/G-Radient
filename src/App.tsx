import { getMode, default as Header } from "./Components/Header/Header";
import GradientViewer from "Components/GradientViewer/viewer";
import GradientControls from "Components/GradientControls/GradientControls";
import { useState, useEffect } from "react";

import {
  generateLinearGradient,
  generateRadialGradient,
} from "generateGradientCode";
let controls: { color: string; stop: number }[],
  setControls: React.Dispatch<
    React.SetStateAction<
      {
        color: string;
        stop: number;
      }[]
    >
  >;

let mode: string, setMode: React.Dispatch<React.SetStateAction<string>>;
const App = () => {
  [mode, setMode] = useState("radial");

  [controls, setControls] = useState([
    {
      color: "blue",
      stop: 0,
    },
    {
      color: "green",
      stop: 50,
    },
    {
      color: "red",
      stop: 100,
    },
  ]);
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

  return (
    <div id="App">
      <Header />
      <GradientViewer gradientCode={gradientCode} />
      <GradientControls />
    </div>
  );
};
export default App;

export { mode, setMode, controls, setControls };
