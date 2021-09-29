import { FC, useState, useEffect } from "react";
import "./angleChanger.css";
import { setAngle as setGlobalAngle } from "App";

const AngleChanger: FC = () => {
  let [angle, setAngle] = useState(90);

  let [, setActive] = useState(false);

  const updateAngle = (x: number, y: number, rect: DOMRect) => {
    let dx = x - (rect.x + rect.width / 2);
    let dy = y - (rect.y + rect.height / 2);

    angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle = 360 + angle;
    angle = Math.round(angle);

    setAngle(angle);
    setGlobalAngle(angle)
  };
useEffect(()=>{
  document.addEventListener("mousemove", (evt) => {
    evt.stopPropagation();
    let active = false;
    setActive((a) => (active = a));
    if (active) {
      let rect = document
        .querySelector("#angleChanger")!
        .getBoundingClientRect();
      updateAngle(evt.clientX, evt.clientY, rect);
    }
  });
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  

  return (
    <div
      id="angleChanger"
      onMouseDown={(evt) => {
        setActive(true);
        let rect = (evt.target as HTMLDivElement).getBoundingClientRect();
        updateAngle(evt.clientX, evt.clientY, rect);
        document.addEventListener(
          "mouseup",
          () => {
            setActive(false);
          },
          { once: true }
        );
      }}
    >
      <span>{angle}°</span>
      <div
        className="pointer"
        style={{
          transform: `translateY(-50%) rotate(${angle}deg)`,
        }}
      >
        <div className="dot"></div>
      </div>
    </div>
  );
};
export default AngleChanger;
