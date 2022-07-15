import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCoachProfileAction } from "../../redux/actions/coach";

const Bio = () => {
  const dispatch = useDispatch();

  const { getCoachProfile } = useSelector((state) => state.getAllCoachResponse);
  const data = getCoachProfile?.data;
  const response = getCoachProfile?.statusCode;
  console.log("get", getCoachProfile);

  const [list, setList] = useState();

  useEffect(() => {
    if (response == 200) {
      setList(data);
    }
  }, [getCoachProfile]);

  const coachId = localStorage.coachId;

  useEffect(() => {
    let obj = {
      coachId: coachId,
    };
    dispatch(GetCoachProfileAction(obj));
  }, []);

  return (
    <div className="bio_container">
      <div className="bio_section">
        <div className="name_section">
          <div className="coach_name">
            <div className="coach_label">
              <h4>Name</h4>
            </div>
            <div className="coach_fullname">
              <h1>{list?.name}</h1>
            </div>
          </div>
          <div
            style={{ borderLeft: "1px solid #575757", height: "90px" }}
          ></div>
          <div className="coach_price">
            <div className="coach_price_label">
              <h4>Price</h4>
            </div>
            <div className="coach_full_price">
              <h1>$789</h1>
            </div>
          </div>
          <div
            style={{ borderLeft: "1px solid #575757", height: "90px" }}
          ></div>
          <div className="coach_btn">
            <button className="book_button">Book Now</button>
          </div>
        </div>
        <div className="bio_about_section">
          <h1>About Me</h1>
          <div className="bio_about_box">
            <ul>
              <li className="about_list_content">{list?.bio}</li>
              {/* <li className="about_list_content">
                Teach all levels - great with intermediate and performance
                players
              </li>
              <li className="about_list_content">
                Patient and encouraging teaching style
              </li>
              <li className="about_list_content">
                performance juniors Former ITF Junior Player
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
