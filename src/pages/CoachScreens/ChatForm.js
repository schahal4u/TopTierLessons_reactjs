import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";

const ChatForm = ({ toptierChat, msgHandler, submitHandler }) => {
  let targetMediaInput = useRef(null);

  const [file, setFile] = useState([]);
  console.log("file", file);
  const addMediaHandler = () => {
    targetMediaInput.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();

    let mediafiles = [];

    if (e.target.files.length > 0) {
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        let obj = {
          file: files[i],
          imagePreviewUrl: URL.createObjectURL(files[i]),
        };

        mediafiles.push(obj);
      }
      setFile(mediafiles);
    }
  };
  return (
    <>
      <div className="content__footer">
        {/* {file.length > 0 && (
          <div className="sendNewMessage_outer">
            <div
              className=""
              style={{
                overflowY: "scroll",
              }}
            >
              {file.length >= 0 &&
                file.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="bg-success"
                      style={{ height: "100px", width: "100px" }}
                    >
                      <h6>{item.imagePreviewUrl}</h6>
                      <image
                        src={item.imagePreviewUrl}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        )} */}

        <div className="sendNewMessage">
          {/* {file.length !== 0 ||
            (file.length <= 0 && (
              <button className="addFiles" onClick={addMediaHandler}>
                <i className="fa fa-plus"></i>
                <input
                  type="file"
                  ref={targetMediaInput}
                  // accept="image/*"
                  onChange={(e) => handleChange(e)}
                  className=""
                  multiple
                  hidden
                />
              </button>
            ))} */}

          <button className="addFiles" onClick={addMediaHandler}>
            <i className="fa fa-plus"></i>
            <input
              type="file"
              ref={targetMediaInput}
              // accept="image/*"
              onChange={(e) => handleChange(e)}
              className=""
              multiple
              hidden
            />
          </button>

          <input
            id="chatbox-input"
            type="text"
            placeholder="Type a message"
            // toptierChat={toptierChat}
            onChange={(e) => msgHandler(e)}
            value={toptierChat.message}
          />
          <button
            className="btnSendMsg"
            id="sendMsgBtn"
            onClick={(e) => submitHandler(e)}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatForm;
