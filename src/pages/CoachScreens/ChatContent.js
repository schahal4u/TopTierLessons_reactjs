import React, {
  Component,
  useState,
  createRef,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chatGetByIdAction,
  userUploadFileAction,
} from "../../redux/actions/Chat";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
import ChatForm from "./ChatForm";
import { toast } from "react-toastify";
import { axiosInstance } from "../../redux/ApiInterceptor/Axios_Interceptors";
// import ChatItem from "./ChatItem";

const ChatContent = ({ user, selectedUser, time }) => {
  let defData = {
    senderId: 0,
    reciverId: 0,
    type: 1,
    message: "",
    file: "",
    audioDuration: "",
  };
  let defaultTypes = {
    message: 1,
    emoji: 2,
    image: 3,
    video: 4,
    audio: 5,
  };

  let messagesEndRef = createRef(null);

  const senderlogin = JSON.parse(localStorage.userData);
  const { chatGetById, loading } = useSelector((state) => state.getChatById);

  const [connection, setConnection] = useState();
  const [msgList, setMsgList] = useState([]);
  const [mediaTypes, setMediaTypes] = useState(defaultTypes);
  const [file, setFile] = useState([]);
  const [toptierChat, setToptierChat] = useState(defData);

  const dispatch = useDispatch();

  const latestChat = useRef(null);

  latestChat.current = msgList;

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user?.userId) {
      setMsgList([]);
      dispatch(chatGetByIdAction({ chatId: user?.chatId }));
    }
  }, [user]);

  useEffect(() => {
    if (chatGetById?.data) {
      setMsgList(chatGetById?.data);
    }
  }, [chatGetById]);

  useEffect(() => {
    let lastElement = msgList.length - 1;
    if (lastElement) {
      scrollToBottom();
    }
  }, [msgList]);

  const msgHandler = (e) => {
    setToptierChat({
      ...toptierChat,
      message: e.target.value,
    });
  };

  useEffect(() => {
    if (toptierChat.message !== "" || file.length > 0) {
      setToptierChat({
        ...toptierChat,
        senderId: senderlogin.userId,
        reciverId: user?.userId,
      });
    }
  }, [toptierChat.message, file]);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://192.168.1.29:8080/chatHub")
      .withAutomaticReconnect()
      .build();
    // console.log("connect==>>>>>>>>>>>>", connect);

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            if (message) {
              const updatedChat = [...latestChat.current];
              updatedChat.push(message);

              setMsgList(updatedChat);
            }

            // notification.open({
            //   message: "New Notification",
            //   description: message,
            // });
          });
          connection
            .invoke("GetClientId", senderlogin.userId)
            .then(function (res) {
              console.log("ConnectionId-----msg id wala", res);
            });
        })
        .catch((error) => console.log("after set conn --->", error));
    }
  }, [connection]);

  const listUpdate = () => {
    if (user?.userId) {
      dispatch(chatGetByIdAction({ chatId: user?.chatId }));
    }
  };

  const apiCall = (fileData) =>
    new Promise(async (resolve, reject) => {
      let formData = new FormData();
      formData.append("file", fileData);
      const { data } = await axiosInstance.post("User/UploadFile", formData);
      resolve(data.data.url);
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (connection) {
      let toptierChatPayload = { ...toptierChat };

      if (file.length > 0) {
        let handlerdm = {
          file: file || [],
          message: toptierChatPayload.message,
        };
        for (const [key, value] of Object.entries(handlerdm)) {
          if (key === "file") {
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
            let audioExe = [
              "mp3",
              "wav",
              "aac",
              "flac",
              "alac",
              "dsd",
              "aiff",
              "m3u8",
            ];
            value.map((item) => {
              // promiseArr.push(apiCall(item.file));
              apiCall(item.file).then((response) => {
                console.log("response=", response);
                let res = response.split(".");
                let resIndex = res.length - 1;
                let exten = res[resIndex];

                if (imgExe.includes(exten)) {
                  toptierChatPayload = {
                    ...toptierChatPayload,
                    file: response,
                    type: 3,
                    message: "",
                  };
                  callSocket(toptierChatPayload);
                } else if (audioExe.includes(exten)) {
                  toptierChatPayload = {
                    ...toptierChatPayload,
                    file: response,
                    type: 5,
                    message: "",
                  };
                  callSocket(toptierChatPayload);
                } else if (videoExe.includes(exten)) {
                  toptierChatPayload = {
                    ...toptierChatPayload,
                    file: response,
                    type: 4,
                    message: "",
                  };
                  callSocket(toptierChatPayload);
                }
                //  else {
                //   if (toptierChat.file !== "") {
                //     callSocket(toptierChat);
                //   }
                // }
              });
            });
            setFile([]);
            // handlerdm = { ...handlerdm, file: [] };
          }
          if (key === "message") {
            callSocket({ ...toptierChat, [key]: value });
          }
        }
        ///// new code start
        // file.map((item) => {
        //   // promiseArr.push(apiCall(item.file));
        //   apiCall(item.file).then((response) => {
        //     console.log("response=", response);
        //     let res = response.split(".");
        //     let resIndex = res.length - 1;
        //     let exten = res[resIndex];
        //     if (
        //       exten === "jpg" ||
        //       exten === "jpeg" ||
        //       exten === "png" ||
        //       exten === "gif"
        //     ) {
        //       toptierChatPayload = {
        //         ...toptierChatPayload,
        //         file: response,
        //         type: 3,
        //         message: "",
        //       };
        //       callSocket(toptierChatPayload);
        //     } else if (exten === "mp3" || exten === "wav" || exten === "aac") {
        //       toptierChatPayload = {
        //         ...toptierChatPayload,
        //         file: response,
        //         type: 5,
        //         message: "",
        //       };
        //       callSocket(toptierChatPayload);
        //     } else if (
        //       exten === "mp4" ||
        //       exten === "mov" ||
        //       exten === "mkv" ||
        //       exten === "wmv"
        //     ) {
        //       toptierChatPayload = {
        //         ...toptierChatPayload,
        //         file: response,
        //         type: 4,
        //         message: "",
        //       };
        //       callSocket(toptierChatPayload);
        //     } else {
        //       if (toptierChat.file !== "") {
        //         callSocket(toptierChat);
        //       }
        //     }
        //     setFile([]);
        //   });
        // });
        //// new code end

        // Promise.allSettled(promiseArr).then(async (response) => {
        //   let urlArr = response.map((urlresponse) => {
        //     return urlresponse.value;
        //   });
        //   const urlArrString = urlArr.toString();

        //   let handlerdm = {
        //     file: urlArrString,
        //     message: toptierChatPayload.message,
        //   };

        // const typeReturn = (type) => {
        //   debugger;
        //   for (const [item, value] of Object.entries(handlerdm)) {
        //     if (item === type) {
        //       return item;
        //     }
        //   }
        // };

        // for (const [key, value] of Object.entries(handlerdm)) {
        //   if (key in toptierChatPayload) {
        //     debugger;
        //     toptierChatPayload = {
        //       ...toptierChatPayload,
        //       [key]: handlerdm[key],
        //       // type: key === typeReturn(key) && mediaTypes[key],
        //       type: key === "file" ? 1 : key === "file",
        //       //   Object.keys(mediaTypes).filter((item) =>
        //       //     item.includes(handlerdm[key])
        //       //   ) && mediaTypes[key],
        //     };

        //     console.log("toptierChatPayload=====>", toptierChatPayload);
        //     alert(toptierChatPayload.type);
        //   }
        // }
        // toptierChatPayload = {
        //   ...toptierChatPayload,
        //   file: urlArrString,
        //   type: 3,
        // };

        // await connection
        //   .invoke("SendMessageSpecificClient", toptierChatPayload)
        //   .then((response) => listUpdate())
        //   .catch((err) => console.error("submit error==>", err.toString()));
        // setToptierChat({
        //   senderId: 0,
        //   reciverId: 0,
        //   type: 0,
        //   message: "",
        //   file: "",
        //   audioDuration: "",
        // });
        // });
        // apiCall().then(async (url) => {
        //   console.log("url==>", url);
        //   toptierChatPayload = { ...toptierChatPayload, file: url };
        //   alert("for calling");
        //   await connection
        //     .invoke("SendMessageSpecificClient", toptierChatPayload)
        //     .then((response) => listUpdate())
        //     .catch((err) => console.error("submit error==>", err.toString()));
        //   setToptierChat({
        //     senderId: 0,
        //     reciverId: 0,
        //     type: 1,
        //     message: "",
        //     file: "",
        //     audioDuration: "",
        //   });
        // });
        // file.map((item, i) => {
        //   let data = new FormData();
        //   data.append("file", item.file);
        //   dispatch(userUploadFileAction(data))
        //     .then((response) => {
        //       if (response.statusCode === 200) {
        //         alert("heloo");
        //         mediaUrl.push(response.data.url);
        //       }
        //     })
        //     .catch((error) => {
        //       toast.warning("something went wrong");
        //     });

        //   url = mediaUrl.toString();
        // });
      } else {
        callSocket(toptierChat);
      }
    }
  };

  const callSocket = async (payload) => {
    await connection
      .invoke("SendMessageSpecificClient", payload)
      .then((response) => listUpdate())
      .catch((err) => console.error("submit error==>", err.toString()));
    setToptierChat({
      senderId: 0,
      reciverId: 0,
      type: 1,
      message: "",
      file: "",
      audioDuration: "",
    });
  };
  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image={user?.profilePic && user?.profilePic}
            />
            <p>{user?.name}</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {msgList.length > 0 ? (
            msgList?.map((itm, index) => {
              return (
                <ChatItem
                  // animationDelay={index + 2}
                  // key={itm.key}
                  // user={itm.type ? itm.type : "me"}
                  // msg={itm.msg}
                  image={itm.image}
                  user={user}
                  userMsg={itm}
                />
              );
            })
          ) : !loading ? (
            <div class="d-flex justify-content-center  ">
              <h4 className="text-black">Data Not Found</h4>
            </div>
          ) : (
            <div class="d-flex justify-content-center  ">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatForm
        file={file}
        setFile={setFile}
        toptierChat={toptierChat}
        msgHandler={msgHandler}
        submitHandler={submitHandler}
        // addMediaHandler={addMediaHandler}
      />

      {/* <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles" onClick={() => addMediaHandler()}>
            <i className="fa fa-plus"></i>
          </button>
          <input
            // className=" form-control bg-secondary "
            type="text"
            placeholder="Type a message here"
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
      </div> */}
    </div>
  );
};

export default ChatContent;
