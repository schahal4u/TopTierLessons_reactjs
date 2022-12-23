import React from "react";
import user from "../../assets/images/user.png";
const Avatar = (props) => {
  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={` ${props.image ? props.image : user}`} alt="#" />
      </div>
      {/* <span className={`isOnline ${this.props.isOnline}`}></span> */}
    </div>
  );
};

export default Avatar;
