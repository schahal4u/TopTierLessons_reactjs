import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  chatGetByIdAction,
  chatGetByIdResponse,
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
  const [selectUser, setSelectUser] = useState();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBookingUserAction());
  }, []);

  // useEffect(() => {
  //   const ChatIds = {
  //     chatId: "4_2",
  //   };
  //   dispatch(chatGetByIdAction(ChatIds));
  // }, []);

  useEffect(() => {
    if (getChatBookingUser?.data) {
      setUserDetails(getChatBookingUser?.data[0]);
      setSelectUser(getChatBookingUser?.data[0].userId);
    }
  }, [getChatBookingUser]);

  const sidebarHandler = (item) => {
    dispatch(chatGetByIdResponse());
    setUserDetails(item);
    setSelectUser(item.userId);
  };

  return (
    <>
      <div className="main__chatbody">
        <div className="__main row">
          <div
            className="main__chatlist col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-2"
            style={{ padding: "0px 20px" }}
          >
            <div className="chatlist__heading">
              <h2> User Chats</h2>
              {/* <button className="btn-nobg">
                <i className="fa fa-ellipsis-h"></i>
              </button> */}
            </div>
            {/* <div className="chatList__search">
              <div className="search_wrap">
                <input type="text" placeholder="Search Here" required />
                <button className="search-btn">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div> */}
            <div className="chatlist__items">
              {getChatBookingUser?.data ? (
                getChatBookingUser?.data?.map((item, index) => {
                  return (
                    <ChatListItems
                      user={item}
                      sidebarHandler={sidebarHandler}
                      // name={item.name}
                      key={item.userId}
                      animationDelay={index + 1}
                      active={
                        userDetails.userId === item.userId ? "active" : ""
                      }
                      // isOnline={item.isOnline ? "active" : ""}
                      // image={item.profilePic}
                    />
                  );
                })
              ) : (
                <div class="d-flex justify-content-center  ">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-xs-6 col-sm-8 col-md-8 col-lg-8 col-xl-10">
            <ChatContent
              user={userDetails}
              selectedUser={selectUser}
              // setMsgList={setMsgList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Venue;
