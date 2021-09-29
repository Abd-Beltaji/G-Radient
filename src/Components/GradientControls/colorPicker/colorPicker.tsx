import { FC, useState, useEffect } from "react";
import "./colorPicker.css";
import checkard from "assets/svg/checkard.svg";
import { hsv2rgb, hsv2hex } from "utils";
import {
  controls,
  activeControlIndex,
  setControls,
} from "App";
const clamp = (value: number, min: number, max: number): number => {
  return value < min ? min : value > max ? max : value;
};

let hue: number,
  saturation: number,
  light: number,
  opacity: number,
  opacityColor: string,
  setHue: React.Dispatch<React.SetStateAction<number>>,
  setSaturation: React.Dispatch<React.SetStateAction<number>>,
  setLight: React.Dispatch<React.SetStateAction<number>>,
  setOpacityColor: React.Dispatch<React.SetStateAction<string>>,
  setOpacity: React.Dispatch<React.SetStateAction<number>>;

let r: number,
  g: number,
  b: number,
  a: number,
  h: number,
  s: number,
  l: number,
  setR: React.Dispatch<React.SetStateAction<number>>,
  setG: React.Dispatch<React.SetStateAction<number>>,
  setB: React.Dispatch<React.SetStateAction<number>>,
  setA: React.Dispatch<React.SetStateAction<number>>,
  setH: React.Dispatch<React.SetStateAction<number>>,
  setS: React.Dispatch<React.SetStateAction<number>>,
  setL: React.Dispatch<React.SetStateAction<number>>;
const updateControls = () => {
  setControls((prevControls) => {
    let controls = [...prevControls];
    let color = hsv2hex(
      hue / 100,
      saturation / 100,
      light / 100,
      opacity / 100
    );
    controls[activeControlIndex].color = color;
    return controls;
  });
};

const updateColorValues = () => {
  setH(Math.round(hue * 3.6));
  setS(+saturation.toFixed(2));
  setL(+light.toFixed(2));
  let [r, g, b] = hsv2rgb(hue / 100, saturation / 100, light / 100);
  setR(+r.toFixed(2));
  setG(+g.toFixed(2));
  setB(+b.toFixed(2));
  setA(+(opacity / 100).toFixed(2));
};
const LightSaturationWheel: FC = () => {
  [light, setLight] = useState(100);
  [saturation, setSaturation] = useState(100);
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
      setOpacityColor(
        hsv2rgb(hue * 3.6, saturation / 100, light / 100).join(",")
      );
      updateColorValues();
    }
  });

  return (
    <div
      className="colorGradient"
      onMouseDown={() => {
        setActive(true);
        document.addEventListener(
          "mouseup",
          () => {
            setActive(false);
            updateControls();
          },
          { once: true }
        );
      }}
      style={{
        backgroundColor: `rgb(${hsv2rgb(hue / 100, 1, 1)})`,
      }}
    >
      <div
        className="pointer"
        style={{
          left: saturation + "%",
          top: 100 - light + "%",
        }}
        draggable="false"
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
      setOpacityColor(
        hsv2rgb(hue / 100, saturation / 100, light / 100).join(",")
      );
      updateColorValues();
    }
  });

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
          document.addEventListener(
            "mouseup",
            () => {
              setActive(false);
              updateControls();
            },
            {
              once: true,
            }
          );
        }}
        draggable="false"
      ></div>
    </div>
  );
};

const Opacity: FC = () => {
  [opacityColor, setOpacityColor] = useState(
    activeControlIndex <controls.length-1?controls[activeControlIndex].color:"#0099ff"
  );
  let [, setActive] = useState(false);
  [opacity, setOpacity] = useState(100);
  document.addEventListener("mousemove", (evt) => {
    let active = false;
    setActive((a) => (active = a));
    if (active) {
      let rect = document
        .querySelector(".hueController")!
        .getBoundingClientRect();
      setOpacity(
        100 - clamp(100 * ((evt.clientX - rect.x) / rect.width), 0, 100)
      );
      updateColorValues();
    }
  });

  useEffect(() => {
    setOpacityColor(`hsl(${hue * 3.6}deg,${saturation}%,${light / 2}%)`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hue, saturation, light]);
  return (
    <div
      className="opacityController"
      style={{
        backgroundImage: `linear-gradient(to right, ${opacityColor} ,#ffffff00), url(${checkard})`,
      }}
    >
      <div
        className="pointer"
        style={{
          left: 100 - opacity + "%",
        }}
        onMouseDown={() => {
          setActive(true);
          document.addEventListener(
            "mouseup",
            () => {
              setActive(false);
              updateControls();
            },
            { once: true }
          );
        }}
        draggable="false"
      ></div>
    </div>
  );
};

const ColorsArea: FC = () => {
  [r, setR] = useState(255);
  [g, setG] = useState(0);
  [b, setB] = useState(0);
  [a, setA] = useState(0.5);

  [h, setH] = useState(260);
  [s, setS] = useState(90);
  [l, setL] = useState(80);

  return (
    <div id="colorValues">
      <div data-value="r">
        <input
          type="text"
          value={r}
          onChange={(evt) => setR(clamp(+evt.target.value, 0, 255))}
        />
      </div>
      <div data-value="g">
        <input
          type="text"
          value={g}
          onChange={(evt) => setG(clamp(+evt.target.value, 0, 255))}
        />
      </div>
      <div data-value="b">
        <input
          type="text"
          value={b}
          onChange={(evt) => setB(clamp(+evt.target.value, 0, 255))}
        />
      </div>
      <div data-value="a">
        <input
          type="text"
          value={a}
          onChange={(evt) => setA(clamp(+evt.target.value, 0, 1))}
        />
      </div>
      <div className="seperator"></div>
      <div data-value="h">
        <input
          type="text"
          value={h}
          onChange={(evt) => setH(clamp(+evt.target.value, 0, 360))}
        />
      </div>
      <div data-value="s">
        <input
          type="text"
          value={s}
          onChange={(evt) => setS(clamp(+evt.target.value, 0, 100))}
        />
      </div>
      <div data-value="l">
        <input
          type="text"
          value={l}
          onChange={(evt) => setL(clamp(+evt.target.value, 0, 100))}
        />
      </div>
    </div>
  );
};

const ColorPicker: FC = () => {
  return (
    <div id="colorPicker">
      <div className="controlsArea">
        <div className="colorValues">
          <ColorsArea />
        </div>
        <div className="hue">
          <Hue />
        </div>
        <div className="opacity">
          <Opacity />
        </div>
      </div>
      <div className="colorArea">
        <LightSaturationWheel />
      </div>
    </div>
  );
};

export default ColorPicker;
export {
  setHue,
  setLight,
  setOpacityColor,
  setSaturation,
  setOpacity,
  updateColorValues,
};

