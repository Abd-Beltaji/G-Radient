import { FC, useState, useEffect } from "react";
import "./colorPicker.css";
import checkard from "assets/svg/checkard.svg";
import { hsv2rgb, hsv2hex } from "utils";
import {
  controls,
  activeControlIndex,
  setControls,
  setControlElements,
} from "App";
import { ControlElement } from "../GradientControls";
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

const updateControls = () => {
  setControls((prevControls) => {
    let controls = [...prevControls];
    let color = hsv2hex(hue / 100, saturation / 100, light / 100, opacity/100);
    // let color = `hsl(${hue*3.6}deg, ${saturation}%, ${light /2}%)`;
    controls[activeControlIndex].color = color;
    return controls;
  });
  setControlElements(() => {
    return controls.map((control, i) => {
      return (
        <ControlElement
          color={control.color}
          stop={control.stop}
          key={`${control.stop}-${control.color}-i`}
          index={i}
        />
      );
    });
  });
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
    controls[activeControlIndex].color
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

const ColorPicker: FC = () => {
  // useEffect(() => {
  //   setControls((prevControls) => {
  //     let controls = [...prevControls];
  //     let color = hsv2hex(hue * 3.6, saturation / 100, light / 100, opacity);
  //     console.log(color)
  //     // controls[activeControlIndex].color = color;
  //     return controls;
  //   });
  // }, [hue, saturation, light, opacity]);
  return (
    <div id="colorPicker">
      <div className="controlsArea">
        <div className="colorValues">Color</div>
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
export { setHue, setLight, setOpacityColor, setSaturation, setOpacity };
// 9c000064
