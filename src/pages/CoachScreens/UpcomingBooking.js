import React, { useState } from 'react'
import team from "../../assets/images/team.png";

const UpcomingBooking = ({ list, viewDetailHandler, approveBookingHandler, deleteBookingHandler }) => {

    // const [list, setList] = useState([]);
    // console.log("lissssstttttt", { list })

    return (
        <div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 search_container">



                        <div className="col-md-12">
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
                                                    className="pic_side"
                                                    style={{ textAlign: "center" }}
                                                // onClick={() => profileHandler(user)}
                                                >
                                                    <img
                                                        src={user?.profileImage ? user?.profileImage : team}
                                                        alt="team"
                                                        height="50px"
                                                        width="50px"
                                                        style={{ borderRadius: "50%" }}
                                                    />
                                                </div>

                                                <div className="coach_price">
                                                    <div className="coach_price_label">
                                                        <h4>Name</h4>
                                                    </div>
                                                    <div className="coach_fullname">
                                                        <h1>{user?.studentName}</h1>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "90px",
                                                    }}
                                                ></div>
                                                <div className="coach_price">
                                                    <div className="coach_price_label">
                                                        <h4>Booking Date</h4>
                                                    </div>
                                                    <div className="coach_full_price">
                                                        <h1>{dateupdate}</h1>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "90px",
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
                                                        height: "90px",
                                                    }}
                                                ></div>
                                                <div className="coach_btn">
                                                    <button
                                                        className="book_button"
                                                        onClick={() => approveBookingHandler(user.bookingId)}
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                                <div
                                                    style={{
                                                        borderLeft: "1px solid #575757",
                                                        height: "90px",
                                                    }}
                                                ></div>
                                                <div className="coach_btn">
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
                                <div style={{ width: "100%" }}>
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