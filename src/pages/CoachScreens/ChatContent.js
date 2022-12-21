import React, {
  Component,
  useState,
  createRef,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatGetByIdAction } from "../../redux/actions/Chat";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
// import ChatItem from "./ChatItem";

const ChatContent = ({ user, time }) => {
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
  const { chatGetById } = useSelector((state) => state.getChatById);
  const [connection, setConnection] = useState();
  const [msgList, setMsgList] = useState([]);
  console.log(connection);
  const [toptierChat, setToptierChat] = useState(defData);
  const dispatch = useDispatch();

  const latestChat = useRef(null);

  latestChat.current = msgList;

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user.userId) {
      dispatch(ChatGetByIdAction({ chatId: user.chatId }));
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
        reciverId: user.userId,
      });
    }
  }, [toptierChat.message]);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://192.168.0.168:8080/chatHub")
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
            console.log("message-----agya msg", message);
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
    if (user.userId) {
      dispatch(ChatGetByIdAction({ chatId: user.chatId }));
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
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
            />
            <p>{user.name}</p>
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
          {msgList?.map((itm, index) => {
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
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
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
      </div>
    </div>
  );
};

export default ChatContent;
