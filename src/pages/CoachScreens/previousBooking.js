import React, { useState } from 'react'
import team from "../../assets/images/team.png";

const PreviousBooking = ({ list, viewDetailHandler, reviewHandler, usertype }) => {

    // const [list, setList] = useState([]);
    // console.log("lissssstttttt", { list })

    return (
        <div>
            {/* <p> new component</p> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-md-lg-12 search_container">



                        <div className="col-sm-md-lg-12">
                            {list?.length &&
                                list?.map((user) => {
                                    console.log("user =>>>>>", user);
                                    let dateupdate = new Date(
                                        user.bookingDate
                                    ).toLocaleDateString();
                                    return (
                                        <div>
                                            <div className="name_section col-sm-md-lg-12">
                                                <div
                                                    className="pic_side"
                                                    style={{ textAlign: "center" }}
                                                // onClick={() => profileHandler(user)}
                                                >
                                                    <img
                                                        src={user?.profileImage ? user?.profileImage : team}
                                                        alt="team"
                                                        height="70px"
                                                        width="70px"

                                                        style={{ borderRadius: "50%", paddingLeft: "20px" }}
                                                    />
                                                </div>

                                                <div className="coach_price">
                                                    <div className="coach_price_label">
                                                        <h3>Name</h3>
                                                    </div>

                                                    <div className="coach_fullname">
                                                        {usertype === 2 ? (<h4>{user?.studentName}</h4>) : (<h4>{user?.coachName}</h4>)}

                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "70px",
                                                    }}
                                                ></div>
                                                <div className="coach_price">
                                                    <div className="coach_price_label">
                                                        <h3>Booking Date</h3>
                                                    </div>
                                                    <div className="coach_full_price">
                                                        <h4>{dateupdate}</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "70px",
                                                    }}
                                                ></div>
                                                <div className="coach_btn">
                                                    <button
                                                        className="book_button"
                                                        onClick={() => viewDetailHandler(user.bookingId)}
                                                    >
                                                        View Detail
                                                    </button>
                                                </div>
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "70px",
                                                    }}
                                                ></div>
                                                <div className="coach_btn">
                                                    <button
                                                        className="book_button"
                                                        onClick={() => reviewHandler(user.coachId)}
                                                    >
                                                        review
                                                    </button>
                                                </div>
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "70px",
                                                    }}
                                                ></div>
                                                <div className="coach_btn">
                                                    <button
                                                        className="book_button"
                                                    // onClick={() => reviewHandler(user.coachId)}
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}

                            {list.length == 0 && (
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <h1 style={{ color: "#fff" }}>No Data Found</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default PreviousBooking;