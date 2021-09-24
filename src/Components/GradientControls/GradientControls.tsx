import { useState, FC, useEffect } from "react";
import { generateLinearGradient } from "generateGradientCode";
import "./GradientControls.css";
interface IControlElement {
  color: string;
  stop: number;
  setControls: React.Dispatch<
    React.SetStateAction<
      {
        color: string;
        stop: number;
      }[]
    >
  >;
  index: number;
  setGradient: React.Dispatch<React.SetStateAction<string>>;
}
interface IGradientControls {
  controls: {
    color: string;
    stop: number;
  }[];
  setControls: React.Dispatch<
    React.SetStateAction<
      {
        color: string;
        stop: number;
      }[]
    >
  >;
}

const clamp = (value: number, min: number, max: number): number => {
  return value < min ? min : value > max ? max : value;
};

const ControlElement: FC<IControlElement> = ({
  color,
  stop,
  setControls,
  index,
  setGradient,
}) => {
  const [stopValue, setStop] = useState(stop);
  const [, setActive] = useState(false);

  useEffect(() => {
    setControls((controls) => {
      controls[index].stop = stopValue;
      setGradient(
        generateLinearGradient({
          angle: 90,
          colors: controls,
        })
      );
      return controls;
    });

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
  }, []);
  return (
    <div
      className="control"
      style={{
        backgroundColor: color,
        left: `${stopValue}%`,
      }}
      onMouseDown={(evt) => setActive(true)}
      onMouseUp={(evt) => setActive(false)}
      draggable="false"
      onDragStart={(evt) => evt.preventDefault()}
      data-value={stopValue}
    ></div>
  );
};
const GradientControls: FC<IGradientControls> = ({ controls, setControls }) => {
  let [gradientCode, setgradientCode] = useState(
    `linear-gradient(90deg ,blue 0%, green 50%, red 100%)`
  );
  return (
    <div id="gradientControls">
      <div
        className="gradientView"
        style={{
          //   background: `linear-gradient(90deg ,blue 0%, green 50%, red 100%)`,
          background: gradientCode,
        }}
      ></div>
      <div className="controls">
        {controls.map((control, i) => {
          return (
            <ControlElement
              color={control.color}
              stop={control.stop}
              key={i}
              setControls={setControls}
              index={i}
              setGradient={setgradientCode}
            />
          );
        })}
      </div>
    </div>
  );
};
export default GradientControls;
