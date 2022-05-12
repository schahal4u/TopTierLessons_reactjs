import React from "react";

const DefaultPopUp = (props) => {
  const { shortMessage, longMessage, popupPlacement, popupColor } = props.popup;

  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style="z-index: 11">
        <div
          id="liveToast"
          className="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">{shortMessage}</strong>
            {/* <small>11 mins ago</small> */}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{longMessage}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultPopUp;
