import {
  controls,
  setControls,
  activeControlIndex,
  setActiveControlIndex,
  setControlElements,
} from "App";
import { ReactComponent as XIcon } from "assets/svg/xIcon.svg";

import { ControlElement } from "../GradientControls";
import "./colorsPanel.css";
interface IItem {
  color: string;
  stop: number;
  index: number;
}

const Item: React.FC<IItem> = ({ color, stop, index }) => {
  return (
    <div
      className={`control${activeControlIndex === index ? " active" : ""}`}
      onMouseDown={() => {
        setActiveControlIndex(index);
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
      }}
    >
      <div>
        <XIcon />
      </div>
      <div className="colorView" style={{ backgroundColor: color }}></div>
      <div>
        <input
          type="text"
          value={color}
          className="color"
          onChange={(evt) => {
            setControls((prevControls) => {
              let newControls = [...prevControls];
              newControls[index].color = evt.target.value;
              return newControls;
            });
            setControlElements(() => {
              let newControls = [...controls];
              newControls[index].color = evt.target.value;
              return newControls.map((control, i) => {
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
          }}
        />
      </div>
      <div>
        <input
          type="text"
          value={stop + "%"}
          className="stop"
          onChange={(evt) => {
            setControls((prevControls) => {
              let newControls = [...prevControls];
              newControls[index].stop = +evt.target.value.replace(
                /[^0-9]/g,
                ""
              );
              return newControls;
            });
            setControlElements(() => {
              let newControls = [...controls];
              newControls[index].stop = +evt.target.value.replace(
                /[^0-9]/g,
                ""
              );
              return newControls.map((control, i) => {
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
          }}
        />
      </div>
    </div>
  );
};

const ColorsPanel: React.FC = () => {
  return (
    <div className="colorsPanel">
      {[...controls]
        .map((control, i) => (
          <Item color={control.color} stop={control.stop} key={i} index={i} />
        ))
        .sort((a, b) => a.props.stop - b.props.stop)}
    </div>
  );
};

export default ColorsPanel;
