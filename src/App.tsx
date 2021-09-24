import { getMode, default as Header } from "./Components/Header/Header";
import GradientViewer from "Components/GradientViewer/viewer";
import GradientControls from "Components/GradientControls/GradientControls";
import { useState } from "react";

import {
  generateLinearGradient,
  generateRadialGradient,
} from "generateGradientCode";
// let controls = [
//   {
//     color: "blue",
//     stop: 0,
//   },
//   {
//     color: "green",
//     stop: 50,
//   },
//   {
//     color: "red",
//     stop: 100,
//   },
// ];

let controls: { color: string; stop: number }[],
  setControls: React.Dispatch<
    React.SetStateAction<
      {
        color: string;
        stop: number;
      }[]
    >
  >,
  updateGradient: () => void;

const App = () => {
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

  updateGradient = () => {
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
  };

  return (
    <div id="App">
      <Header />
      <GradientViewer gradientCode={gradientCode} />
      <GradientControls
        controls={controls}
        setControls={(controls) => {
          setControls(controls);
          updateGradient();
        }}
      />
    </div>
  );
};
export default App;
export const update = () => updateGradient();
