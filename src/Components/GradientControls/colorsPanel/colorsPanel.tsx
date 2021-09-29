import {
  controls,
  setControls,
  activeControlIndex,
  setActiveControlIndex,
} from "App";
import { ReactComponent as XIcon } from "assets/svg/xIcon.svg";

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
      }}
    >
      
      <div className="deleteKey">
        <XIcon
          onClick={() => {
            if (controls.length < 3) return;
            setControls((prevControls) => {
              return [...prevControls]
                .map((control, i) =>
                  i === index ? { color: "DELETE", stop: 0 } : control
                )
                .filter((c) => c.color !== "DELETE");
            });
          }}
        />
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
          }}
        />
      </div>
      <div className="stopValue">
      {stop + "%"}
        {/* <input
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
          }}
        /> */}
      </div>
    </div>
  );
};

const ColorsPanel: React.FC = () => {
  return (
    <div className="colorsPanel">
      <div className="headings">
        <div>Color</div>
        <div>Hex</div>
        <div>Stop</div>
        </div>
      {[...controls]
        .map((control, i) => (
          <Item color={control.color} stop={control.stop} key={i} index={i} />
        ))
        .sort((a, b) => a.props.stop - b.props.stop)}
    </div>
  );
};

export default ColorsPanel;
