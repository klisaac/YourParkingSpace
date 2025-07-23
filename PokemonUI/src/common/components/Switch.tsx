import React from "react";
import { Col } from "reactstrap";

//
// It renders a switch component, true/false based on parent status.
//

const Switch = (props: { checked: boolean; handleSwitchChange: () => void; text?: string; disabled?: boolean }) => {
  return (
    <Col className="switch-column">
      <label className="switch switch-pill switch-primary">
        <input
          type="checkbox"
          className="switch-input"
          onChange={() => props.handleSwitchChange()}
          checked={props.checked}
          disabled={props.disabled}
        />
        <span className="switch-slider"></span>
      </label>
      <span className="switch-label">{props.text !== undefined ? props.text : "Active"}</span>
    </Col>
  );
};

export default Switch;
