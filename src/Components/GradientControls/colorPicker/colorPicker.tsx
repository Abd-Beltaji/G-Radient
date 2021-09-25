import { FC, useState } from "react";
import "./colorPicker.css";
const clamp = (value: number, min: number, max: number): number => {
  return value < min ? min : value > max ? max : value;
};

let hue: number,
  saturation: number,
  light: number,
  setHue: React.Dispatch<React.SetStateAction<number>>,
  setSaturation: React.Dispatch<React.SetStateAction<number>>,
  setLight: React.Dispatch<React.SetStateAction<number>>;

const LightSaturationWheel: FC = () => {
  [light, setLight] = useState(0);
  [saturation, setSaturation] = useState(0);
  let [, setActive] = useState(false);

  document.addEventListener("mousemove", (evt) => {
    let active = false;
    setActive((a) => (active = a));
    if (active) {
      let rect = document
        .querySelector(".colorGradient")!
        .getBoundingClientRect();
      setLight(
        100 -
          clamp(
            Math.floor((100 * (evt.clientY - rect.y)) / rect.height),
            0,
            100
          )
      );
      setSaturation(
        clamp(Math.floor((100 * (evt.clientX - rect.x)) / rect.width), 0, 100)
      );
    }
  });
  document.addEventListener("mouseup", () => {
    setActive(false);
  });
  return (
    <div className="colorGradient" onMouseDown={() => setActive(true)}>
      <div
        className="pointer"
        style={{
          left: saturation + "%",
          top: 100 - light + "%",
        }}
      ></div>
    </div>
  );
};

const Hue: FC = () => {
  let [, setActive] = useState(false);
  [hue, setHue] = useState(0);
  document.addEventListener("mousemove", (evt) => {
    let active = false;
    setActive((a) => (active = a));
    if (active) {
      let rect = document
        .querySelector(".hueController")!
        .getBoundingClientRect();
      setHue(clamp(100 * ((evt.clientX - rect.x) / rect.width), 0, 100));
    }
  });
  document.addEventListener("mouseup", () => setActive(false));
  return (
    <div className="hueController">
      <div
        className="pointer"
        style={{
          left: hue + "%",
          background: `hsl(${Math.round(hue * 3.6)}deg, 100%, 50%)`,
        }}
        onMouseDown={() => {
          setActive(true);
        }}
      ></div>
    </div>
  );
};

const ColorPicker: FC = () => {
  return (
    <div id="colorPicker">
      <div className="controlsArea">
        <div className="colorValues">Color</div>
        <div className="hue">
          <Hue />
        </div>
        <div className="opacity">Opacity</div>
      </div>
      <div className="colorArea">
        <LightSaturationWheel />
      </div>
    </div>
  );
};

export default ColorPicker;
