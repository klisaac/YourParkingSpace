import React, {Fragment} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { EcpActionConfirmation } from "../common/enums/EcpActionConfirmation";

//
// It renders a modal with a formn input and a submit button for search.
// toggle: parent property to the toggle function, to determine if the modal is visible/hidden.
// confirmed: to be called once the form is submitted.
// modal: true for the modal to be displayed. It's changed using toggle prop.
// name; the form to be rendered.
//

const ModalConfirmation = (props: { toggle: () => void; confirmed: () => void; modal: boolean; name: EcpActionConfirmation; message?: string; }) => {
  const renderForm = () => {
    switch (props.name) {
      case EcpActionConfirmation.Archive:
        return (
          <div>
            Are you sure you want to <span className="ecp-modal-action">Archive</span> this item?
          </div>
        );
      case EcpActionConfirmation.Move:
        return (
          <div>
            Are you sure you want to <span className="ecp-modal-action">Move</span> this Camera?
          </div>
        );
      case EcpActionConfirmation.Delete:
        return (
          <div>
            Are you sure you want to <span className="ecp-modal-action">Delete</span> this item?
          </div>
        );
      case EcpActionConfirmation.End:
        return (
          <div>
            Are you sure you want to <span className="ecp-modal-action">End</span> this Exemption?
          </div>
        );
        case EcpActionConfirmation.Confirm:
          return (
            <Fragment>
              {props.message !== undefined ? <div style={{ marginBottom: "15px" }}>{props.message}</div> : null}
              <div>
                Are you sure you want to <span className="ecp-modal-action">Proceed</span>?
              </div>
            </Fragment>
          );
        case EcpActionConfirmation.Cancel:
          return (
            <Fragment>
              {props.message !== undefined ? <div style={{ marginBottom: "15px" }}>{props.message}</div> : null}
              <div>
                Are you sure you want to <span className="ecp-modal-action">Cancel</span>?
              </div>
            </Fragment>
          );
      default:
        return "";
    }
  };

  return (
    <Modal
      isOpen={props.modal}
      toggle={props.toggle}
      className={props.name === EcpActionConfirmation.Delete || EcpActionConfirmation.End ? "modal-danger" : "modal-warning"}
    >
      <ModalHeader toggle={props.toggle}>Confirmation</ModalHeader>
      <ModalBody>{renderForm()}</ModalBody>
      <ModalFooter>
        <Button
          color={props.name === EcpActionConfirmation.Delete || EcpActionConfirmation.End ? "danger" : "warning"}
          onClick={props.confirmed}
        >
          Confirm
        </Button>{" "}
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalConfirmation;
