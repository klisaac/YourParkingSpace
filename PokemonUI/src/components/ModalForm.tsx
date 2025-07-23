import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { PokemonItemTypes } from "../enums/EcpItemTypes";

// It renders a modal with a formn input and a submit button for search.
// toggle: parent property to the toggle function, to determine if the modal is visible/hidden.
// updated: to be called once the form is submitted to detect that a changed on the row has been made.
// move: toggle for CameraMove only. Optional.
// modal: true for the modal to be displayed. It's changed using toggle prop.
// name: the form to be rendered.
// itemId: the selected id from the row on the table. Optional.
// item: the selected row on the table that will include all the fields, so no Api call is required. Used for CameraMove. Optional.
//

const ModalForm = (props: {
  toggle: () => void;
  updated: (deleted: boolean) => void;
  move?: () => void;
  modal: boolean;
  name: PokemonItemTypes;
  itemId?: number;
  item?: any;
}) => {
  const renderForm = () => {
    switch (props.name) {
      default:
        return "";
    }
  };

  const title = () => {
    switch (props.name) {
      default:
        return `${props.itemId == null && props.item == null ? "Add" : "Edit"} ${props.name}`;
    }
  };

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className="modal-primary modal-lg">
      <ModalHeader toggle={props.toggle}>{title()}</ModalHeader>
      <ModalBody>{renderForm()}</ModalBody>
    </Modal>
  );
};

export default ModalForm;
