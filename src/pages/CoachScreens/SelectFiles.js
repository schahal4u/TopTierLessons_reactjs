import React from "react";

const SelectFiles = ({
  file,
  setFile,
  addMediaHandler,
  targetMediaInput,
  handleChange,
}) => {
  const checkType = (itemFile) => {
    if (itemFile) {
      let SelectedMediaType = itemFile.type.split("/");

      return SelectedMediaType[0];
    }
  };

  const cancelHandler = (index) => {
    let data = file.filter((item, i) => i !== index);
    setFile(data);
  };

  return (
    <>
      {file.length > 0 && (
        <div className="sendNewMessage_outer bg-light">
          <div className="sendMessagePreview d-flex flex-wrap bg-muted  ">
            {file.length >= 0 &&
              file.map((item, i) => {
                const checkingType = checkType(item.file);
                return (
                  <>
                    <div
                      className="position-relative bg-white "
                      key={i}
                      style={{
                        height: "100px",
                        margin: "0px 2px",
                        width: "100px",
                        borderRadius: "6px",
                      }}
                    >
                      {checkingType === "video" ? (
                        <i
                          id="center_div"
                          className="fa fa-file-video-o fs-1"
                          aria-hidden="true"
                        ></i>
                      ) : checkingType === "audio" ? (
                        <i
                          id="center_div"
                          className="fa fa-file-audio-o  fs-1"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <img
                          className="preview_image"
                          src={item.imagePreviewUrl}
                          style={{ height: "100px", width: "100px" }}
                        />
                      )}

                      <span
                        style={{
                          position: "absolute",
                          zIndex: "999",
                          padding: "2px",
                          right: 0,
                        }}
                      >
                        <i
                          onClick={() => cancelHandler(i)}
                          className="fa fa-times-circle-o fs-4 opacity-75 cursor_pointer"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </>
                );
              })}

            <button id="main_button" onClick={addMediaHandler}>
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
          </div>
        </div>
      )}
    </>
  );
};

export default SelectFiles;
