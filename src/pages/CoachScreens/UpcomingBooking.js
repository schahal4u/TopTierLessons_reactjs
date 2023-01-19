import React, { useState } from 'react'
import team from "../../assets/images/team.png";

const UpcomingBooking = ({ list, viewDetailHandler, approveBookingHandler, deleteBookingHandler, usertype }) => {

    // const [list, setList] = useState([]);
    // console.log("lissssstttttt", { list })

    return (
        <div>

            <div className="container-fluid col-sm-md-xs-12">
                <div className="row">
                    <div className="col-md-sm-xs-12 search_container">



                        <div className="col-md-sm-xs-12">
                            {list?.length &&
                                list?.map((user) => {
                                    console.log("user =>>>>>", user);
                                    let dateupdate = new Date(
                                        user.bookingDate
                                    ).toLocaleDateString();
                                    return (
                                        <div>
                                            <div className="name_section">
                                                <div
                                                    className="pic_side col-md-sm-xs-1"
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

                                                <div className="coach_price col-md-sm-xs-2">
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
                                                <div className="coach_price col-md-sm-xs-3">
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
                                                <div className="coach_btn col-md-sm-xs-2">
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
                                                {usertype === 2 ? (<div className="coach_btn col-md-sm-xs-2">

                                                    <button
                                                        className="book_button"
                                                        onClick={() => approveBookingHandler(user.bookingId)}
                                                    >
                                                        Approve
                                                    </button>
                                                </div>) : null}

                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "70px",
                                                    }}
                                                ></div>
                                                <div className="coach_btn col-sm-md-xs-2">
                                                    <button
                                                        className="book_button"
                                                        onClick={() => deleteBookingHandler(user.bookingId)}
                                                    >
                                                        cancel
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
export default UpcomingBooking;