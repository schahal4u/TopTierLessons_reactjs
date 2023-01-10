import React, {
  Component,
  useState,
  createRef,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatGetByIdAction } from "../../redux/actions/Chat";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
import ChatForm from "./ChatForm";
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
  let messagesEndRef = createRef(null);

  const senderlogin = JSON.parse(localStorage.userData);
  const { chatGetById, loading } = useSelector((state) => state.getChatById);
  console.log("loading", loading);
  const [connection, setConnection] = useState();
  const [msgList, setMsgList] = useState([]);

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
    if (toptierChat.message !== "") {
      setToptierChat({
        ...toptierChat,
        senderId: senderlogin.userId,
        reciverId: user?.userId,
      });
    }
  }, [toptierChat.message]);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (connection) {
      await connection
        .invoke("SendMessageSpecificClient", toptierChat)
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
    }
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
                  // image={itm.image}
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
