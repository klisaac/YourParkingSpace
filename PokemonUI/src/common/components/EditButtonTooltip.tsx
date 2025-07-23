import React, { Fragment } from "react";
import { UncontrolledTooltip } from "reactstrap";

// Note: this component requires further tooltip improvement.
const EditButtonTooltip = () => {
  return (
    <Fragment>
      {/* <span>Default direction </span> */}
      <span className="badge camera-badge" id="DirectionTooltip">
        <i className="cil-pencil"></i>
      </span>
      <UncontrolledTooltip placement="right" target="DirectionTooltip" className="cameras-direction-tooltip">
        <ul>
          <li>
            <span className="cameras-direction-tooltip-span">Edit</span>
          </li>
        </ul>
      </UncontrolledTooltip>
    </Fragment>
  );
};

export default EditButtonTooltip;
