import React, { useEffect, useRef, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrow from "../../assets/images/down.png";
import avtar from "../../assets/images/profileIcon.png";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";

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

  console.log("response is", responseCode, "error", imgError);

  const defautFormData = {
    name: "",
    address: "",
    age: "",
    sport: "",
    level: "",
    logo: avtar,
  };

  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [inp, setInp] = useState("");
  const [checked, setChecked] = useState(false);
  const [photo, setPhoto] = useState();

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpHandler = (e) => {
    console.log("form data", formData);
    e.preventDefault();
    // setLoading(true);
    setValidated(true);
    if (
      formData.name === "" ||
      formData.password === "" ||
      formData.age === ""
    ) {
      // setLoading(false);
      setFormData({ ...formData, name: "", password: "", age: "" });
    } else {
      // setLoading(true);
      //   dispatch(LessonsRegisterAction(formData));
    }
  };

  const photoUpload = (e) => {
    const incomingFile = e.target.files[0];
    console.log("file ", incomingFile);
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

  return (
    <>
      <div className="signIn">
        <div className="container form_signup">
          <Form noValidate validated={validated} onSubmit={signUpHandler}>
            {/* <form onSubmit={signUpHandler}> */}
            <div className="personalinfo_form">
              <h1>Basic Detail</h1>
              <img
                src={formData.logo || avtar}
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
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Child Name"
                  name="name"
                  value={formData.name}
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
                  Address is Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="number"
                  className="form-control signin_inp mt-3"
                  placeholder="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleFormData}
                  required
                  pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Age is Required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Select
                  aria-label="Default select example"
                  className="form-control form-select select_box mt-3"
                  value={formData.type}
                  onChange={handleFormData}
                  name="type"
                  required
                >
                  <option>Sport</option>
                  <option value="1">Hockey</option>
                  <option value="2">Cricket</option>
                </Form.Select>
                <img className="set_arrows" src={arrow} alt="arrow" />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Please Select any Option
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Select
                  aria-label="Default select example"
                  className="form-control form-select select_box mt-3"
                  value={formData.level}
                  onChange={handleFormData}
                  name="level"
                  required
                >
                  <option>Skill Level</option>
                  <option value="1">Begginer</option>
                  <option value="1">Intermidate</option>
                  <option value="2">Expert</option>
                </Form.Select>
                <img className="set_arrows" src={arrow} alt="arrow" />
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
