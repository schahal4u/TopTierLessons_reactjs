import React from "react";
import { Form } from "react-bootstrap";

const ChatForm = ({ toptierChat, onChangeHandler, submitHandler }) => {
  return (
    <>
      {/* <Form className="w-100" onSubmit={(e) => submitHandler(e)}>
        <div className="d-flex justify-content-between align-items-center ">
          <div className="flex-grow-1  mx-2">
            <Form.Group controlId="validationCustom04">
              <Form.Control
                required
                type="text"
                className="input-control"
                placeholder="Message"
                name="Message"
                value={toptierChat.message}
                onChange={onChangeHandler}
              />

              <Form.Control.Feedback type="invalid" className="error_text">
                Role is Required
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="mx-2">
            <button className="ttButton p-2" type="submit">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </Form> */}

      <form onSubmit={(e) => submitHandler(e)}>
        <div className="type_msg pb-4">
          <div className="input_msg_write">
            <input
              type="text"
              // value={message}
              className="write_msg"
              placeholder=" Type Message..."
              value={toptierChat.message}
              onChange={onChangeHandler}
              required
            />

            <div className="msg_action_btn position-relative me-4">
              <span className="make_note me-3">
                mic
                {/* <MessageInputMicrophoneIcon /> */}
              </span>

              <button className="ttButton p-2" type="submit">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChatForm;
