import React, { Component } from "react";
import Avatar from "./Avatar";

const ChatListItems = ({ user, animationDelay, active, sidebarHandler }) => {
  // const selectChat = (e) => {
  //   for (
  //     let index = 0;
  //     index < e.currentTarget.parentNode.children.length;
  //     index++
  //   ) {
  //     e.currentTarget.parentNode.children[index].classList.remove("active");
  //   }
  //   e.currentTarget.classList.add("active");
  // };

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={() => sidebarHandler(user)}
      className={`chatlist__item ${active ? active : ""} `}
    >
      <Avatar
        image={user.profilePic ? user.profilePic : "http://placehold.it/80x80"}
        // isOnline={this.props.isOnline}
      />

      <div className="userMeta">
        <p>{user.name}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
};

export default ChatListItems;
