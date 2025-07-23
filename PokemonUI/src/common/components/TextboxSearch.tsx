import React from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

//
// It renders an input and a submit button for search.
// It returns the value of the input.
//

const TextBoxSearch = (props: {
  handleSearch: (text: string) => void;
  handleChange: (text: string) => void;
  placeholder: string;
  buttonColor: string;
  buttonMessage: string;
  value: string;
  className?: string;
  autoComplete?: boolean;
}) => {
  const handleKeyPress = (evt: any) => {
    if (evt.key === "Enter") {
      props.handleSearch(props.value);
    }
  };

  const handleChange = (e) => {
    if (props.autoComplete) {
      if (e.toString().length > 2) {
        props.handleChange(e);
        props.handleSearch(e);
      } else {
        props.handleChange(e);
      }
    } else {
      props.handleChange(e);
    }
  };

  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <Button type="button" color={props.buttonColor} onClick={() => props.handleSearch(props.value)}>
          <i className="fa fa-search"></i>
          {props.buttonMessage}
        </Button>
      </InputGroupAddon>
      <Input
        type="text"
        placeholder={props.placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
        value={props.value}
      />
    </InputGroup>
  );
};

export default TextBoxSearch;
