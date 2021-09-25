import { useState, FC, useEffect } from "react";
import { generateLinearGradient } from "generateGradientCode";
import "./GradientControls.css";
import {
  controls,
  setControls,
  activeControlIndex,
  setActiveControlIndex,
  controlElements,
  setControlElements,
} from "App";

import ColorsPanel from "./colorsPanel/colorsPanel";

interface IControlElement {
  color: string;
  stop: number;
  index: number;
}

const clamp = (value: number, min: number, max: number): number => {
  return value < min ? min : value > max ? max : value;
};

let gradientCode: string,
  setgradientCode: React.Dispatch<React.SetStateAction<string>>;

const ControlElement: FC<IControlElement> = ({ color, stop, index }) => {
  const [stopValue, setStop] = useState(stop);
  const [, setActive] = useState(false);

  useEffect(() => {
    setControls((controls) =>
      controls.map((c, i) =>
        i === index ? { color: c.color, stop: stopValue } : c
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopValue]);
  useEffect(() => {
    document.addEventListener("mousemove", (evt) => {
      setActive((active) => {
        if (active) {
          let rect = document
            .querySelector("#gradientControls .gradientView")!
            .getBoundingClientRect();
          let stopValue = clamp(
            Math.round((100 * (evt.clientX - rect.x)) / rect.width),
            0,
            100
          );
          setStop(stopValue);
        }
        return active;
      });
    });
    document.addEventListener("mouseup", () => {
      setActive(false);
    });

    document.body.addEventListener("mouseleave", () => setActive(false));
  }, []);
  return (
    <div
      className={`control${index === activeControlIndex ? " active" : ""} `}
      style={{
        backgroundColor: color,
        left: `${stopValue}%`,
      }}
      onMouseDown={() => {
        setActive(true);
        setActiveControlIndex(index);
      }}
      onMouseUp={() => setActive(false)}
      draggable="false"
      onDragStart={(evt) => evt.preventDefault()}
      data-value={stopValue}
    ></div>
  );
};
const GradientControls: FC = () => {
  [gradientCode, setgradientCode] = useState(
    `linear-gradient(90deg ,blue 0%, green 50%, red 100%)`
  );
  useEffect(() => {
    setControlElements(
      controls.map((control, i) => {
        return (
          <ControlElement
            color={control.color}
            stop={control.stop}
            key={`${control.color}-i`}
            index={i}
          />
        );
      })
    );
  }, []);

  useEffect(() => {
    console.table(controls);
    setgradientCode(
      generateLinearGradient({
        angle: 90,
        colors: controls,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);
  return (
    <div id="allControls">
      <div id="gradientControls">
        <div
          className="gradientView"
          style={{
            background: gradientCode,
          }}
        ></div>
        <div className="controls">{controlElements}</div>
      </div>
      <div className="otherControls">
        <ColorsPanel />
      </div>
    </div>
  );
};
export default GradientControls;
export { gradientCode, setgradientCode, ControlElement };
