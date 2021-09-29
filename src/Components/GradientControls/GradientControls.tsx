import React, { useState, FC, useEffect } from "react";
import { generateLinearGradient } from "generateGradientCode";
import "./GradientControls.css";
import {
  controls,
  setControls,
  activeControlIndex,
  setActiveControlIndex,
  angle,
} from "App";

import ColorsPanel from "./colorsPanel/colorsPanel";
import ColorPicker from "./colorPicker/colorPicker";
import AngleChanger from "./angleChanger/angleChanger";
import { randomColor } from "utils";
import { getMode } from "Components/Header/Header";
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

let outputCode: string,
  setOutputCode: React.Dispatch<React.SetStateAction<string>>;

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
      onTouchStart={() => setActive(false)}
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
    setgradientCode(
      generateLinearGradient({
        angle: 90,
        colors: controls,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  [outputCode, setOutputCode] = useState("");
  let mode = getMode();
  return (
    <div id="allControls">
      <div id="gradientControls">
        <div
          className="gradientView"
          style={{
            background: gradientCode,
          }}
          onClick={() => alert("click")}
        ></div>
        <div
          className="controls"
          onContextMenu={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            if (controls.length >= 20) return;
            setControls((prev) => {
              let rect = (
                evt.currentTarget as HTMLDivElement
              ).getBoundingClientRect();
              let stopValue = clamp(
                Math.round((100 * (evt.screenX - rect.x)) / rect.width),
                0,
                100
              );
              console.log(stopValue);
              prev.push({
                color: randomColor(),
                stop: stopValue,
              });

              return [...prev.sort((a, b) => a.stop - b.stop)];
            });
            console.log(controls);
          }}
        >
          {controls.map((control, i) => {
            return (
              <ControlElement
                color={control.color}
                stop={control.stop}
                key={`${control.color}-${i}`}
                index={i}
              />
            );
          })}
        </div>
      </div>
      <div className="otherControls">
        <ColorsPanel />
        <ColorPicker />
      </div>
      <div className="moreControls">
        <AngleChanger />
        <div className="gradientOverview">
          <div className="section">
            <div
              className="gradient"
              style={{
                backgroundImage: outputCode,
              }}
            ></div>
            <div
              className="gradient second"
              style={{ backgroundImage: outputCode }}
            >
              G-Radient
            </div>
          </div>
          <div className="section">
            <div className="code">
              <span className="attr">background-image:</span>{" "}
              {
                <>
                  <span className="function">{mode}-gradient</span>
                  {"("}
                  <br />
                  <span className="value">
                    {mode === "radial" ? (
                      <>
                        circle <span className="keyword">at</span> 50%
                      </>
                    ) : (
                      angle + "deg"
                    )}
                  </span>
                  ,
                  {controls.map(({ color, stop }) => (
                    <div className="colorValue">
                      <div
                        className="color"
                        style={{ "--colorValue": color } as React.CSSProperties}
                      >
                        {color}
                      </div>{" "}
                      <span className="stop">{stop}%</span>,
                    </div>
                  ))}
                </>
              }
              );
            </div>
            <div className="code">
              <span className="attr">background-image:</span>{" "}
              {
                <>
                  <span className="function">{mode}-gradient</span>
                  {"("}
                  <br />
                  <span className="value">
                    {mode === "radial" ? (
                      <>
                        circle <span className="keyword">at</span> 50%
                      </>
                    ) : (
                      angle + "deg"
                    )}
                  </span>
                  ,
                  {controls.map(({ color, stop }) => (
                    <div className="colorValue">
                      <div
                        className="color"
                        style={{ "--colorValue": color } as React.CSSProperties}
                      >
                        {color}
                      </div>{" "}
                      <span className="stop">{stop}%</span>,
                    </div>
                  ))}
                </>
              }
              );
              <br />
              <span className="attr">background-clip:</span>{" "}
              <span className="value">text</span>;<br />
              <span className="attr">color:</span>{" "}
              <span className="value">transparent</span>;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GradientControls;
export { gradientCode, setgradientCode, ControlElement, setOutputCode };
