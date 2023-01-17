import { Button, Modal } from "react-bootstrap";
import React from "react";

const FilesSelectionAlertModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-white ">
          <Modal.Title
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5> Too many files selected </h5>
            <p className="fs-6 my-2">
              You have picked too many files. Limit is 10.
            </p>
          </Modal.Title>
        </Modal.Body>
        <hr style={{ background: "white", margin: "0px" }} />
        <Modal.Footer
          style={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
          onClick={props.onHide}
        >
          <h5>ok</h5>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilesSelectionAlertModal;
