import React from "react";

const DefaultPopUp = (props) => {
  const { shortMessage, longMessage, popupPlacement, popupColor } = props.popup;

  return (
    <>
      <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
        <div
          id="liveToast"
          class="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <img src="..." class="rounded me-2" alt="..." />
            <strong class="me-auto">{shortMessage}</strong>
            {/* <small>11 mins ago</small> */}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div class="toast-body">{longMessage}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultPopUp;
