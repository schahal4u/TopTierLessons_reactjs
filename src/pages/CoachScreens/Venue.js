import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatGetByIdAction,
  GetBookingUserAction,
} from "../../redux/actions/Chat";
import ChatBox from "./ChatBox";
import ChatContent from "./ChatContent";
import ChatListItems from "./ChatListItems";

const Venue = () => {
  const { getAllBooking } = useSelector((state) => state.getAllBookingResponse);
  const { getChatBookingUser } = useSelector((state) => state.chatModule);
  console.log("getChatBookingUser", getChatBookingUser);
  const [userDetails, setUserDetails] = useState({});
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBookingUserAction());
  }, []);

  // useEffect(() => {
  //   const ChatIds = {
  //     chatId: "4_2",
  //   };
  //   dispatch(ChatGetByIdAction(ChatIds));
  // }, []);

  useEffect(() => {
    if (getChatBookingUser?.data) {
      setUserDetails(getChatBookingUser?.data[0]);
    }
  }, [getChatBookingUser]);

  const sidebarHandler = (item) => {
    setUserDetails(item);
  };

  return (
    <>
      <div className="main__chatbody">
        <div className="__main">
          <div className="main__chatlist" style={{ padding: "0px 20px" }}>
            <div className="chatlist__heading">
              <h2>Chats</h2>
              <button className="btn-nobg">
                <i className="fa fa-ellipsis-h"></i>
              </button>
            </div>
            <div className="chatList__search">
              <div className="search_wrap">
                <input type="text" placeholder="Search Here" required />
                <button className="search-btn">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="chatlist__items">
              {getChatBookingUser?.data?.map((item, index) => {
                return (
                  <ChatListItems
                    user={item}
                    sidebarHandler={sidebarHandler}
                    // name={item.name}
                    key={item.userId}
                    animationDelay={index + 1}
                    active={userDetails.userId === item.userId ? "active" : ""}
                    // isOnline={item.isOnline ? "active" : ""}
                    // image={item.profilePic}
                  />
                );
              })}
            </div>
          </div>
          <ChatContent user={userDetails} />
        </div>
      </div>
    </>
  );
};

export default Venue;
