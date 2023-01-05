import React, { useEffect, useRef, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import arrow from "../../assets/images/down.png";
import avtar from "../../assets/images/profileIcon.png";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";
import moment from "moment";
import { API_KEY } from "../../utils";
const BasicInfo = () => {
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

  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const { updateProfileDetail } = useSelector((state) => state.profileUpdate);
  const response = updateProfileDetail?.statusCode;
  // console.log("response is", response);

  const defautFormData = {
    address: "",
    dateOfBirth: "",
    latitude: "",
    longitude: "",
    skillLevel: "",
    profileImage: avtar,
    bio: "",
  };

  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [place, setPlace] = useState("");

  const onChangeDateHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: moment.utc(moment(e.target.value).utc()).format(),
    });
  };

  // for normal onchange handler
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "select-one" ? +e.target.value : e.target.value,
    });
  };

  // const handleFormData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleFormData = (e) => {
    if (e.target.type === "date") {
      onChangeDateHandler(e);
    } else {
      onChangeHandler(e);
    }
  };

  const signUpHandler = (e) => {
    console.log("form data", formData);
    e.preventDefault();
    setValidated(true);
    if (
      formData.address === "" ||
      formData.age === "" ||
      formData.sportId === "" ||
      formData.skillLevel === "" ||
      formData.profileImage === ""
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
      toast.warn("Please Select the Supported Image Format !");
      return;
    }

    if (size > 3000000) {
      toast.warn("Please Select File Size Upto 3mb!");
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
    let obj = {
      page: 1,
      pageSize: 100,
    };

    dispatch(GetAllSportsAction(obj));
  }, []);

  useEffect(() => {
    if (response == 200) {
      navigate("/");
    }
  }, [updateProfileDetail]);

  const setplaceHandler = (e) => {
    let newFormValues = { ...formData };
    if (e.label) {
      geocodeByAddress(e?.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          newFormValues.address = e.label;
          newFormValues.latitude = lat;
          newFormValues.longitude = lng;
          console.log("newFormValues", newFormValues);
          setFormData(newFormValues);
        });
    }
  };

  return (
    <>
      <div className="signIn">
        <div className="container form_sign">
          <Form noValidate validated={validated} onSubmit={signUpHandler}>
            {/* <form onSubmit={signUpHandler}> */}
            <div className="basic_form">
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
              {/* <Form.Group as={Col} md="10" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  className="input-control mt-3"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormData}
                  required
                />
                <span class="required-asterisk">*</span>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Name is Required
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group
                as={Col}
                md="10"
                className="google-analytics"
                controlId="validationCustom03"
              >
                <GooglePlacesAutocomplete
                  apiKey={API_KEY}
                  selectProps={{
                    place,
                    onChange: (e) => setplaceHandler(e),
                    placeholder: `${
                      formData.address ? formData.address : "Address"
                    }`,
                  }}
                />

                <Form.Control.Feedback type="invalid" className="error_text">
                  Address is Required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="10" controlId="validationCustom01">
                <Form.Control
                  type="date"
                  className="input-control mt-3"
                  placeholder="dateOfBirth"
                  name="dateOfBirth"
                  value={moment(formData.dateOfBirth).format("YYYY-MM-DD")}
                  onChange={(e) => handleFormData(e)}
                  required
                  // pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
                />
                <span class="required">*</span>
                <Form.Control.Feedback type="invalid">
                  Dob is Required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="10" controlId="validationCustom01">
                <Form.Select
                  aria-label="Default select example"
                  className="input-control mt-3"
                  value={formData.skillLevel}
                  onChange={handleFormData}
                  name="skillLevel"
                  required
                >
                  <option value="">Skill Level</option>
                  <option value="1">Begginer</option>
                  <option value="2">Intermidate</option>
                  <option value="3">Expert</option>
                </Form.Select>
                <img className="select_arrow" src={arrow} alt="arrow" />
                <span class="required ">*</span>
                <Form.Control.Feedback type="invalid">
                  Please Select any Option
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="10" controlId="validationCustom05">
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  type="text"
                  className="form-control profile_inp mt-3"
                  placeholder="Sell Yourself! Tell parents who you are, your major and athletic experiences and accomplishments. If you have taught lessons before or have any other cool Skills add it in! "
                  name="bio"
                  value={formData.bio}
                  onChange={handleFormData}
                />
                <span class="required">*</span>
                <Form.Control.Feedback type="invalid" className="">
                  Bio is Required
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

export default BasicInfo;
