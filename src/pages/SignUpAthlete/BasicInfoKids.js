import React, { useEffect, useRef, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { mockComponent } from "react-dom/test-utils";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrow from "../../assets/images/down.png";
import avtar from "../../assets/images/profileIcon.png";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";
import { API_KEY, dateFormat } from "../../utils";
import moment from "moment";
const BasicInfoKids = () => {
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
  const { imgResponse, imgError } = useSelector(
    (state) => state.profilePicResponse
  );
  const responseCode = imgResponse?.statusCode;

  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const { updateProfileDetail } = useSelector((state) => state.profileUpdate);
  const response = updateProfileDetail?.statusCode;
  console.log("response is", response);

  const defautFormData = [
    {
      name: "",
      address: "",
      email: "",
      dateOfBirth: "",
      skillLevel: "",
      latitude: "",
      longitude: "",
      // profileImage: avtar,
    },
  ];

  const logoData = {
    profileImage: avtar,
  };

  // let newFormValues = [];

  const [formData, setFormData] = useState(defautFormData);
  const [image, setImage] = useState(logoData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [inp, setInp] = useState("");
  const [checked, setChecked] = useState(false);
  const [photo, setPhoto] = useState();
  const [place, setPlace] = useState("");

  // for date onChange
  const onChangeDateHandler = (e, i) => {
    let newFormValues = [...formData];
    newFormValues[i][e.target.name] = moment
      .utc(moment(e.target.value).utc())
      .format();

    setFormData(newFormValues);
  };

  // for normal onchange handler
  const onChangeHandler = (e, i) => {
    let newFormValues = [...formData];
    newFormValues[i][e.target.name] =
      e.target.type === "select-one" ? +e.target.value : e.target.value;
    setFormData(newFormValues);
  };

  // handle all form onChange
  const handleFormData = (e, i) => {
    if (e.target.type === "date") {
      onChangeDateHandler(e, i);
    } else {
      onChangeHandler(e, i);
    }
  };

  const setplaceHandler = (e, i) => {
    let newFormValues = [...formData];
    if (e.label) {
      geocodeByAddress(e?.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          newFormValues[i].address = e.label;
          newFormValues[i].latitude = lat;
          newFormValues[i].longitude = lng;
          setFormData(newFormValues);
        });
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    // setLoading(true);
    setValidated(true);
    if (
      formData.name === "" ||
      formData.address === "" ||
      formData.dateOfBirth === "" ||
      formData.skillLevel === "" ||
      // formData.profileImage === "" ||
      checked === false
    ) {
      setLoading(false);
      toast.warn("Please Fill All the fields");
    } else {
      setLoading(true);
      debugger;
      let user = {
        users: [...formData],
      };
      console.log(user);
      dispatch(AdminProfileUpdateAction(user));
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
      setPhoto(data);
    }
  };

  const uploadLogo = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (photo) {
      dispatch(PhotoUploadAction(photo));
    }
  }, [photo]);

  useEffect(() => {
    if (responseCode == 200) {
      setImage({ ...image, profileImage: imgResponse?.data?.url });
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

  const addChild = () => {
    let obj = {
      name: "",
      address: "",
      dateOfBirth: "",
      skillLevel: "",
    };
    setFormData([...formData, obj]);
  };

  return (
    <>
      <div className="signIn">
        <div className="container form_signup">
          <Form noValidate validated={validated} onSubmit={signUpHandler}>
            {/* <form onSubmit={signUpHandler}> */}
            <div className="personalinfo_form">
              <h1>Basic Detail</h1>
              <img
                src={image.profileImage || avtar}
                style={{
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  cursor: "pointer",
                  marginBottom: "25px",
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

              {formData.map((item, i) => {
                return (
                  <>
                    <Form.Group
                      as={Col}
                      md="10"
                      controlId="validationCustom01"
                      key={i}
                    >
                      <Form.Control
                        type="text"
                        className=" input-control mt-3"
                        placeholder="Child Name"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleFormData(e, i)}
                        required
                      />
                      <span class="required">*</span>
                      <Form.Control.Feedback type="invalid">
                        Child Name is Required
                      </Form.Control.Feedback>
                    </Form.Group>

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
                          onChange: (e) => setplaceHandler(e, i),
                          placeholder: `${
                            formData.address ? formData.address : "Address"
                          }`,
                        }}
                      />

                      <Form.Control.Feedback
                        type="invalid"
                        className="error_text"
                      >
                        Address is Required
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                      <Form.Control
                        type="date"
                        className="input-control mt-3"
                        placeholder="dateOfBirth"
                        name="dateOfBirth"
                        value={moment(item.dateOfBirth).format("YYYY-MM-DD")}
                        onChange={(e) => handleFormData(e, i)}
                        required
                        // pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
                      />
                      <span class="required">*</span>
                      <Form.Control.Feedback type="invalid">
                        Dob is Required
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* <Form.Group as={Col} md="10" controlId="validationCustom01">
                      <Form.Select
                        aria-label="Default select example"
                        className="input-control mt-3"
                        value={item.sportId}
                        onChange={(e) => handleFormData(e, i)}
                        name="sportId"
                        required
                      >
                        <option value="">Select Sport</option>
                        {getAllSports &&
                          getAllSports?.data.map((item, i) => {
                            return (
                              <option key={i} value={item.sportId}>
                                {item.sportName}
                              </option>
                            );
                          })}
                      </Form.Select>
                      <img className="select_arrow" src={arrow} alt="arrow" />
                      <span class="required">*</span>
                      <Form.Control.Feedback type="invalid">
                        Please Select any Option
                      </Form.Control.Feedback>
                    </Form.Group> */}

                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                      <Form.Select
                        aria-label="Default select example"
                        className="input-control mt-3"
                        value={item.skillLevel}
                        onChange={(e) => handleFormData(e, i)}
                        name="skillLevel"
                        required
                      >
                        <option value="">Skill Level</option>
                        <option value="1">Begginer</option>
                        <option value="2">Intermidate</option>
                        <option value="3">Expert</option>
                      </Form.Select>
                      <img className="select_arrow" src={arrow} alt="arrow" />
                      <span class="required">*</span>
                      <Form.Control.Feedback type="invalid">
                        Please Select any Option
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                );
              })}

              <div>
                <p
                  style={{
                    color: "#fff",
                    margin: "0 !important",
                    cursor: "pointer",
                  }}
                  onClick={addChild}
                >
                  Add Another Child
                </p>
              </div>
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
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustom01"
                style={{
                  width: "75%",
                  marginLeft: "25px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  style={{ background: "background: #D4D4D4" }}
                  checked={checked}
                  onChange={(e) => setChecked(!checked)}
                  name="checked"
                />
                <p className="checkbox_text">
                  Share with
                  <span className="inner_textt">Coach after Lesson</span> and
                  <span className="inner_textt">booked</span>
                </p>
              </Form.Group>
            </div>
            {/* </form> */}
          </Form>
        </div>
      </div>
    </>
  );
};

export default BasicInfoKids;
