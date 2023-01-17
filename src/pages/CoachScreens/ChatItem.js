import React, { Component, useEffect, useState } from "react";
import Avatar from "./Avatar";
import { getFormatedStringFromDays, monthDiff } from "../../utils";
const ChatItem = ({ user, userMsg }) => {
  let videoExe = ["mp4", "mov", "mkv", "avi", "avchd", "webm", "wmv"];
  let imgExe = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "tiff",
    "psd",
    "pdf",
    "ai",
    "indd",
    "raw",
  ];
  let audioExe = ["mp3", "wav", "aac", "flac", "alac", "dsd", "aiff", "m3u8"];

  const [type, setType] = useState("");

  const data = (time) => {
    switch (time) {
      case "13":
        return 1;
      case "14":
        return 2;
      case "15":
        return 3;
      case "16":
        return 4;
      case "17":
        return 5;
      case "18":
        return 6;
      case "19":
        return 7;
      case "20":
        return 8;
      case "21":
        return 9;
      case "22":
        return 10;
      case "23":
        return 11;
      case "24":
        return 12;

      default:
        return false;
    }
  };

  const time = (td) => {
    const date = new Date(td);
    const date1 = date.toTimeString().split(" ")[0];
    if (date1.split(":")[0] <= 12) {
      return `${date1.split(":")[0]}:${date1.split(":")[1]}AM`;
    } else {
      return `${data(date1.split(":")[0])}:${date1.split(":")[1]}PM`;
    }
  };

  useEffect(() => {
    if (userMsg.file) {
      let res = userMsg.file.split(".");
      let resIndex = res.length - 1;
      let exten = res[resIndex];
      setType(exten);
    }
  }, [userMsg.file]);

  return (
    <>
      {userMsg.file !== "" && (
        <div
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${
            userMsg.senderId === user?.userId ? "other" : "me"
          }`}
          //   className={`chat__item  `}
        >
          <div className="chat__item__content">
            <div className="chat__msg">
              <div
                style={{
                  margin: "1px",
                  width: "",
                }}
              >
                {videoExe.includes(type) ? (
                  <video className="preview_video" controls height="200">
                    <source src={userMsg?.file} type="video/mp4" />
                    <source src={userMsg?.file} type="video/ogg" />
                  </video>
                ) : audioExe.includes(type) ? (
                  <audio controls src={userMsg?.file}>
                    <a href={userMsg?.file}>Download audio</a>
                  </audio>
                ) : (
                  <img
                    controls
                    className="preview_image"
                    src={userMsg?.file}
                    style={{ height: "150px" }}
                  />
                )}
              </div>
            </div>
            <div className="chat__meta">
              <span></span>
              <span>{time(userMsg.updatedOn)}</span>
            </div>
          </div>
        </div>
      )}

      {userMsg.message && (
        <div
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${
            userMsg.senderId === user?.userId ? "other" : "me"
          }`}
          //   className={`chat__item  `}
        >
          <div className="chat__item__content">
            <div className="chat__msg">{userMsg.message}</div>
            <div className="chat__meta">
              <span>
                {/* {getFormatedStringFromDays(monthDiff(userMsg?.updatedOn))} */}
              </span>
              <span>{time(userMsg.updatedOn)}</span>
            </div>
          </div>
          {/* <Avatar isOnline="active" image={  image} /> */}
        </div>
      )}
    </>
  );
};

export default ChatItem;
