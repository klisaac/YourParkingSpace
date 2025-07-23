import React from "react";
import { Alert, Row, Col } from "reactstrap";

//
// It renders a message.
//

const AlertMessage = (props: { color: string; message: string }) => {
  return (
    <Row>
      <Col className="col-12">
        <Alert color={props.color} className="font-weight-bold">
          {props.message}
        </Alert>
      </Col>
    </Row>
  );
};

export default AlertMessage;
