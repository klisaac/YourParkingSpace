import React, { useState, useEffect } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

//
// It renders a component where a color can be selected. A color object is returned.
//

const ColorPicker = (props: { color: string; disabled?: boolean; newColor?: (color: string) => void }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(props.color);
  }, [props.color]);

  const styles = reactCSS({
    default: {
      color: {
        width: "50px",
        height: "24px",
        background: `${color}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "0.25rem",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: props.disabled ? "default" : "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const handleClick = () => {
    if (props.disabled) {
    } else {
      setShowColorPicker(!showColorPicker);
    }
  };

  const handleClose = () => {
    setShowColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.hex);
    props.newColor(color);
  };

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} className="form-control" />
      </div>
      {showColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
