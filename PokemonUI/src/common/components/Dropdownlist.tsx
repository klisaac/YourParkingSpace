import React from "react";
import { ISelectItem } from "../models/ISelectItem";
import { Input } from "reactstrap";

//
// It renders a drop down list. The data used must be of type ISelectItem.
// It returns the selected value.
//

const DropdownList = (props: {
  handleChange: (value: any) => void;
  options: Array<ISelectItem>;
  placeholder?: string;
  isDisabled?: boolean;
  selected?: number;
  className?: string;
}) => {
  return (
    <Input
      type="select"
      placeholder={props.placeholder}
      name="select"
      onChange={(e) => props.handleChange(e.target.value)}
      value={props.selected ? props.selected : 0}
      className={props.className}
    >
      {props.placeholder != null && (
        <option key={0} value={0}>
          {props.placeholder}
        </option>
      )}
      {props.options.map(({ id, value }) => (
        <option key={id} value={id}>
          {value}
        </option>
      ))}
    </Input>
  );
};

export default DropdownList;
