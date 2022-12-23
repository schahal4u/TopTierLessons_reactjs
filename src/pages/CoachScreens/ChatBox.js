import React, { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { chatGetByIdAction } from "../../redux/actions/Chat";
import ChatForm from "./ChatForm";

const ChatBox = ({ user, time }) => {
  let defData = {
    senderId: 0,
    reciverId: 0,
    type: 1,
    message: "",
    file: "",
    audioDuration: "",
  };

  const senderlogin = JSON.parse(localStorage.userData);
  const { chatGetById } = useSelector((state) => state.getChatById);
  const [connection, setConnection] = useState();
  console.log("connection", connection);
  const [toptierChat, setToptierChat] = useState(defData);
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.userId) {
      dispatch(chatGetByIdAction({ chatId: user.chatId }));
    }
  }, [user]);

  const onChangeHandler = (e) => {
    setToptierChat({ ...toptierChat, message: e.target.value });
  };

  useEffect(() => {
    if (toptierChat.message !== "") {
      var location = window.location.hash.replace("#", "");
      // if the path length is 0, set it to primary page route
      if (location) {
        setToptierChat({
          ...toptierChat,
          senderId: senderlogin.userId,
          reciverId: +location,
        });
      }
    }
  }, [toptierChat.message]);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://192.168.0.168:8080/chatHub")
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
            console.log("message", message);
            // notification.open({
            //   message: "New Notification",
            //   description: message,
            // });
          });
          connection.invoke("GetClientId", 4).then(function () {
            console.log("ConnectionId");
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (connection) {
      console.log("toptierChat==========>", toptierChat);
      await connection
        .invoke("SendMessageSpecificClient", toptierChat)
        .then((response) => console.log("This is your data", response))
        .catch((err) => console.error(err.toString()));
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
    <>
      {/* <div className="d-flex flex-column">
        <div
          className=""
          style={{
            height: "420px",
            width: "100%",
            height: " 420px",
            width: "100%",
            overflowY: " scroll",
          }}
        >
          {chatGetById?.data?.map((item) => {
            if (item.senderId === user.userId) {
              return (
                <>
                  <div className="" key={item.messageId}>
                    <h6
                      className="bg-warning my-4"
                      style={{
                        padding: "7px 10px",
                        borderRadius: "1px 5px 5px 8px",
                      }}
                    >
                      {item.message}
                    </h6>
                  </div>
                </>
              );
            } else {
              return (
                <div>
                  <h6
                    className="bg-warning my-4"
                    style={{
                      textAlign: "right",
                      padding: "7px 10px",
                      borderRadius: "5px 1px 8px 5px",
                    }}
                  >
                    {item.message}
                  </h6>
                </div>
              );
            }
          })}
        </div>

        <div className="">
          <ChatForm
            toptierChat={toptierChat}
            onChangeHandler={onChangeHandler}
            submitHandler={submitHandler}
          />
        </div>
      </div> */}

      {/* ////////////////////////////////////////// */}

      <div className="custom_card">
        <div className="custom_card_body">
          <div className="row px-2">
            {/* <div className="background p-4 d-flex justify-content-between">
              <div className="d-flex">
                <img
                  className="rounded-circle me-2"
                  width={40}
                  height={40}
                  src={user.profile}
                  alt="Avtar"
                />
                <h6>{chatChange.name}</h6>
              </div>
            </div> */}
            <div className="mesgs">
              <div className="overFlow">
                {chatGetById?.data?.map((item, index) => (
                  <div key={index} className="msg_history" ref={messagesEndRef}>
                    {item.senderId === user.userId && (
                      <div className="incoming_msg">
                        {/* <div className="incoming_msg_img rounded-circle">
                          <img
                            className="rounded-circle"
                            src={chatChange.profile}
                            alt="sunil"
                          />
                        </div> */}
                        <div className="received_msg">
                          <div className="received_withd_msg">
                            <p>{item.message}</p>
                            {/* <span className="f_12 text_blue text-end d-block mt-2">
                                  {time(item.createdAt)}
                                </span> */}
                          </div>
                          <span className="f_12 text_blue text-end d-block mt-2">
                            {time(item.updatedOn)}
                          </span>
                        </div>
                      </div>
                    )}
                    {item.sender === senderlogin.userId && (
                      <>
                        <div className="outgoing_msg" ref={messagesEndRef}>
                          <div className="sent_msg d-flex">
                            <div>
                              <p className="me-2">{item.message}</p>

                              <span className="f_12 text_blue text-end d-block mt-2">
                                {time(item.updatedOn)}
                              </span>
                            </div>
                            {/* <div className="incoming_msg_img rounded-circle">
                              <img
                                className="rounded-circle ms-2"
                                src={item.profilePic}
                                alt="sunil"
                              />
                            </div> */}
                          </div>
                          {/* <span className="f_12 text_blue text-end d-block mt-2">
                                {time(item.createdAt)}
                              </span> */}
                          {/* <div className="incoming_msg_img rounded-circle">
                      <img className="rounded-circle" src={'item.profilePic'} alt="sunil" />
                    </div> */}
                        </div>
                        {/* <span className="f_12 text_blue text-end d-block mt-2">
                          {time(item.createdAt)}
                        </span> */}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <ChatForm
                toptierChat={toptierChat}
                onChangeHandler={onChangeHandler}
                submitHandler={submitHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
