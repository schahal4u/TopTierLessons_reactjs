import zIndex from "@mui/material/styles/zIndex";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import FilesSelectionAlertModal from "../../components/Modal/FilesSelectionAlertModal";
import SelectFiles from "./SelectFiles";

const ChatForm = ({
  toptierChat,
  msgHandler,
  submitHandler,
  file,
  setFile,
}) => {
  let targetMediaInput = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  // const media = file;
  // console.log("file", file);
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

  useEffect(() => {
    if (file.length > 10) {
      setModalShow(true);
    }
  }, [file]);
  useEffect(() => {
    if (!modalShow) {
      setFile([]);
    }
  }, [modalShow]);

  return (
    <>
      <div className="content__footer">
        {file.length > 10 ? (
          <FilesSelectionAlertModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        ) : (
          <SelectFiles
            file={file}
            setFile={setFile}
            addMediaHandler={addMediaHandler}
            targetMediaInput={targetMediaInput}
            handleChange={handleChange}
          />
        )}

        <div className="sendNewMessage">
          {file.length !== 0 ||
            (file.length <= 0 && (
              <button className="addFiles" onClick={addMediaHandler}>
                <i className="fa fa-plus"></i>
                <input
                  type="file"
                  ref={targetMediaInput}
                  accept="video/*, image/*, audio/*"
                  onChange={(e) => handleChange(e)}
                  className=""
                  multiple
                  hidden
                />
              </button>
            ))}

          {/* {file.length > 0 && (
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
          )} */}
          <form
            style={{ flexGrow: 1, display: "flex" }}
            onSubmit={(e) => submitHandler(e)}
          >
            <input
              id="chatbox-input"
              type="text"
              placeholder="Type a message"
              // toptierChat={toptierChat}
              onChange={(e) => msgHandler(e)}
              value={toptierChat.message}
            />
            <button type="submit" className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatForm;
