import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

//
// It renders a modal with a formn input and a submit button for search.
// toggle: parent property to the toggle function, to determine if the modal is visible/hidden.
// modal: true for the modal to be displayed. It's changed using toggle prop.
// message: message to be displayed within modal.
//

const AlertConfirmation = (props: { toggle: () => void; modal: boolean; message: string; modalHeader: string }) => {
  const renderForm = () => {
    return <div>{props.message}</div>;
  };

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" className="modal-success">
      <ModalHeader toggle={props.toggle}>{props.modalHeader}</ModalHeader>
      <ModalBody>{renderForm()}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AlertConfirmation;
