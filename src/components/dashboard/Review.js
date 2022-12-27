import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReviewAction } from "../../redux/actions/ReviewAction";
import { Rating } from "react-simple-star-rating";

const Review = () => {
  const dispatch = useDispatch();
  const { reviewReducer } = useSelector((state) => state.getReviewReducer);
  const reviewdata = reviewReducer?.data;
  const response = reviewReducer?.statuscode;
  const defaultFormData = {
    userId: 0,
    page: 0,
    pageSize: 0,
    senderType: 0,
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [list, setList] = useState({});
  useEffect(() => {
    const obj = {
      userId: null,
      page: 1,
      pageSize: 10,
    };
    dispatch(ReviewAction(obj));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-content-between">
        <div>
          <h1>Review </h1>
        </div>
      </div>

      {reviewReducer?.data?.length &&
        reviewReducer?.data?.map((reviewList) => {
          return (
            <div className="card col-sm-12 w-100 venuecard ">
              <div className="card-body">
                <div className="row">
                  <div
                    className="h-100"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    <div className="col-sm-1">
                      <div className=" h-100 d-flex justify-content-center align-items-center">
                        <img
                          className="card-img-bottom"
                          src={reviewList?.studentImage}
                          alt="Card image cap"
                          style={{
                            height: "100px",
                            width: "100px",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-sm-2"
                      style={{ borderLeft: "1px solid #575757" }}
                    >
                      <p className="card-text">studentName</p>
                      <h4>{reviewList?.studentName}</h4>
                    </div>
                    <div
                      className="col-sm-2"
                      style={{ borderLeft: "1px solid #575757" }}
                    >
                      <p>rating </p>
                      {/* {reviewList?.rating?.length} */}

                      <h4>
                        {" "}
                        {reviewList?.rating}{" "}
                        <span className="star">&#9733;</span>
                      </h4>
                    </div>

                    <div
                      className="col-sm-2"
                      style={{ borderLeft: "1px solid #575757" }}
                    >
                      <p className="card-text">senderType</p>
                      <h4>{reviewList?.senderType}</h4>
                    </div>
                    <div
                      className="col-sm-2"
                      style={{ borderLeft: "1px solid #575757" }}
                    >
                      <p className="card-text">review </p>
                      <h3>{reviewList.review}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Review;
