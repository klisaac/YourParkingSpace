import React from "react";
import { css } from "@emotion/core";
import Loader from "react-spinners/ScaleLoader";

const override = css`
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

const Spinner = (props: { display: boolean }) => {
  return (
    <div className="sweet-loading">
      <Loader css={override} color={"#20A8D8"} loading={props.display} />
    </div>
  );
};

export default Spinner;
