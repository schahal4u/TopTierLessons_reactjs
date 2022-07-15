import React, { useEffect, useRef, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrow from "../../assets/images/down.png";
import avtar from "../../assets/images/profileIcon.png";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";

const UploadPhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputFile = useRef(null);

  const imageType = [
    "image/tif",
    "image/tiff",
    "image/bmp",
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/eps",
    "image/webp",
  ];
  const { imgResponse } = useSelector((state) => state.profilePicResponse);
  const responseCode = imgResponse?.statusCode;

  //   console.log("response is", responseCode);

  const { updateProfileDetail } = useSelector((state) => state.profileUpdate);
  const response = updateProfileDetail?.statusCode;
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const defautFormData = {
    address: "",
    bio: "",
    profileImage: avtar,
    sportId: "",
  };

  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [inp, setInp] = useState("");

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpHandler = (e) => {
    console.log("form data", formData);
    e.preventDefault();
    setLoading(true);
    setValidated(true);
    if (
      formData.address === "" ||
      formData.bio === "" ||
      formData.profileImage === "" ||
      formData.sportId === ""
    ) {
      setLoading(false);
      toast.warn("Please Fill All the fields");
    } else {
      setLoading(true);
      let obj = [formData];
      let userData = {
        users: obj,
      };
      dispatch(AdminProfileUpdateAction(userData));
    }
  };

  const photoUpload = (e) => {
    const incomingFile = e.target.files[0];
    const fileType = incomingFile && (incomingFile?.type).toLowerCase();
    const size = incomingFile && e.target.files[0].size;
    const validImageTypes = imageType;

    if (incomingFile && !validImageTypes.includes(fileType)) {
      setInp("");
      toast.warn("Please Select the Supported Image Format !");
      return;
    }

    if (size > 3000000) {
      setInp("");
      toast.warn("Please Select File Size Upto 3mb !");
      return;
    }

    if (e.target.files.length !== 0) {
      let data = new FormData();
      data.append("file", e.target.files[0]);
      dispatch(PhotoUploadAction(data));
    }
  };

  const uploadLogo = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (responseCode == 200) {
      setFormData({ ...formData, profileImage: imgResponse?.data?.url });
    }
  }, [imgResponse]);

  useEffect(() => {
    if (response == 200) {
      navigate("/");
    }
  }, [updateProfileDetail]);

  useEffect(() => {
    let obj = {
      page: 1,
      pageSize: 100,
    };
    dispatch(GetAllSportsAction(obj));
  }, []);

  return (
    <>
      <div className="signIn">
        <div className="container form_sign">
          <Form noValidate validated={validated} onSubmit={signUpHandler}>
            {/* <form onSubmit={signUpHandler}> */}
            <div className="basic_upload_form">
              <h1>Basic Detail</h1>
              <img
                src={formData.profileImage || avtar}
                style={{
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  cursor: "pointer",
                  marginBottom: "15px",
                }}
                onClick={uploadLogo}
              />
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={photoUpload}
              />
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormData}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Name is Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Sell Yourself! Tell parents who you are, your major and athletic experiences and accomplishments. If you have taught lessons before or have any other cool Skills add it in! "
                  name="bio"
                  value={formData.bio}
                  onChange={handleFormData}
                  required
                  pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Bio is Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Select
                  aria-label="Default select example"
                  className="form-control form-select select_box mt-3"
                  value={formData.sportId}
                  onChange={handleFormData}
                  name="sportId"
                  required
                >
                  <option value="null">Select Sport</option>
                  {getAllSports &&
                    getAllSports?.data.map((item, i) => {
                      return (
                        <option key={i} value={item.sportId}>
                          {item.sportName}
                        </option>
                      );
                    })}
                </Form.Select>
                <img className="set_arrows" src={arrow} alt="arrow" />
                {/* <span class="required-asterisk">*</span> */}
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Please Select any Option
                </Form.Control.Feedback>
              </Form.Group>
              <button
                type="submit"
                className="btn btn-primary signin_btn mt-4 mb-4"
              >
                {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "15px" }}
                  ></span>
                )}
                Done
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
