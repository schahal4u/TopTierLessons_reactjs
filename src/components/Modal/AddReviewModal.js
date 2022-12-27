import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, FormLabel, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import arrow from "../../assets/images/down.png";
import { useDispatch, useSelector } from "react-redux";
import { CreateReviewAction } from "../../redux/actions/ReviewAction";

const AddReviewModal = (props) => {
  const { profileDetail } = useSelector((state) => state.getProfileDetail);
  let {
    onHide,

    modalHeader,
    handleOnChange,
    submitHandler,
    rating,
    setRating,
  } = props;
  const logo = profileDetail?.data?.profileImage;
  const handleRating = (rate) => {
    setRating({ ...rating, rating: rate });
  };

  // console.log("rating=>>>>>", ratingValue)
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="booking_slot">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={profileDetail?.data?.profileImage}
                style={{ borderRadius: "800px" }}
                alt="logo"
              />

              <FormLabel style={{ color: "white" }}>
                {profileDetail?.data?.name}
              </FormLabel>

              {/* <div
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
                                                </div> */}
              {/* <FormLabel style={{ color: "white" }}>Rating</FormLabel> */}
              <Rating
                name="rating"
                value={rating.rating}
                onClick={handleRating}
                initialValue={rating}
              />
            </div>
            <Form.Group controlId="validationCustom02">
              <FormLabel style={{ color: "white" }}>Comment</FormLabel>
              <Form.Control
                name="review"
                style={{ color: "white" }}
                type="text"
                className="form-control booking_inp mt-3"
                value={rating.review}
                onChange={(e) =>
                  setRating({ ...rating, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>

            {/* <Form.Group controlId="validationCustom02">
                            <FormLabel style={{ color: "white" }}>Rating</FormLabel>
                            <Form.Control
                                name="rating"
                                style={{ color: "white" }}
                                type="text"
                                className="form-control booking_inp mt-3"
                                value={rating.rating}
                              
                                onChange={(e) => setRating({ ...rating, [e.target.name]: e.target.value })}

                            />
                        </Form.Group> */}

            {/* <div className="star-rating">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        name="rating"
                                        key={index}
                                        className={index <= (hover || ratingValue) ? "on" : "off"}
                                        value={rating.rating}
                                        onClick={() => setRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}

                                    // onChange={(e) => setRating({ ...rating, [e.target.name]: e.target.value })}
                                    >
                                        <span className="star">&#9733;</span>
                                    </button>
                                );
                            })}
                        </div> */}
            <div className="row">
              <Col as={Col} md="6">
                <div className=" d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="book_button"
                    onClick={() => submitHandler()}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
              <Col as={Col} md="6">
                <div className="d-flex justify-content-center">
                  <Button className="book_button" onClick={onHide}>
                    Cancel
                  </Button>
                </div>
              </Col>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddReviewModal;
