import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminGetProfileDetailAction } from "../../redux/actions/AdminGetProfileDetail";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";
import "./BasicDetail.css";
import { emptyUpdateProfileResponse } from "../../redux/actions/AdminProfileUpdateAction";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { Slider } from "@mui/material";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
const BasicDetail = () => {
  const API_KEY = "AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ";
  const { profileDetail, profileError } = useSelector(
    (state) => state.getProfileDetail
  );
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);
  const updateProfileDetail = useSelector((state) => state.profileUpdate);
  const getResponse = profileDetail?.statusCode;
  const response = updateProfileDetail?.statusCode;

  const dispatch = useDispatch();
  const defautFormData = {
    name: "",
    email: "",
    address: "",
    role: "",
    bio: "",
    radius: "",
    sportId: "",
    price: "",
  };
  const [formData, setFormData] = useState(defautFormData);
  console.log("formData", formData);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [place, setPlace] = useState("");
  console.log("place=====>", place);
  useEffect(() => {
    dispatch(AdminGetProfileDetailAction());
    let obj = {
      page: 1,
      pageSize: 100,
    };
    dispatch(GetAllSportsAction(obj));
  }, []);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const profileHandler = (e) => {
    e.preventDefault();
    setValidated(true);
    if (
      formData.name === "" ||
      formData.address === "" ||
      formData.bio === ""
    ) {
      toast.warn("Please Fill All the fields");
    } else {
      setLoading(true);

      let obj = [formData];
      let userData = {
        users: obj,
      };
      // obj.push(userData);
      dispatch(AdminProfileUpdateAction(userData));
    }
  };

  useEffect(() => {
    if (getResponse == 200) {
      setFormData({
        ...formData,
        name: profileDetail?.data?.name,
        email: profileDetail?.data?.email,
        address: profileDetail?.data?.address,
        role: profileDetail?.data?.userType,
        bio: profileDetail?.data?.bio,
        radius: profileDetail?.data?.radius,
        sportId: profileDetail?.data?.sportId,
        price: profileDetail?.data?.price,
      });
    }
  }, [profileDetail]);

  useEffect(() => {
    if (updateProfileDetail?.updateProfileDetail != null) {
      setLoading(false);
      toast.success("Profile Updated Successfully");
    }
  }, [updateProfileDetail]);

  // useEffect(() => {
  //   if (place.label) {
  //     setFormData({ ...formData, address: place.Label });
  //   }
  // }, [place]);

  useEffect(() => {
    if (place) {
      geocodeByAddress(place?.label)
        .then((results) => getLatLng(results[0]))
        .then(
          ({ lat, lng }) =>
            setFormData({
              ...formData,
              address: place.label,
              latitude: lat,
              longitude: lng,
            })
          // console.log("Successfully got latitude and longitude", { lat, lng })
        );
    }
  }, [place]);

  function valuetext(value) {
    return `Radius ${value} `;
  }
  return (
    <>
      <div className="profile ">
        <Form noValidate validated={validated} onSubmit={profileHandler}>
          <div className="profile_form ">
            <Form.Group as={Col} md="10" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                className="input-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleFormData}
              />
              <span class="required">*</span>
              <Form.Control.Feedback className="error_text" type="invalid">
                Name is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom02">
              <Form.Control
                required
                type="email"
                className="input-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                readOnly
                // onChange={handleFormData}
              />
              <span class="required">*</span>
              <Form.Control.Feedback type="invalid" className="error_text">
                Email is Required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="10" controlId="validationCustom04">
              <Form.Control
                required
                readOnly
                type="text"
                className="input-control"
                placeholder="Role"
                name="role"
                value={formData.role}
                // onChange={handleFormData}
              />
              <span class="required">*</span>
              <Form.Control.Feedback type="invalid" className="error_text">
                Role is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom03">
              <GooglePlacesAutocomplete
                apiKey={API_KEY}
                selectProps={{
                  place,
                  onChange: setPlace,
                  placeholder: `${
                    formData.address ? formData.address : "Address"
                  }`,
                }}
              />

              {/* <Form.Control
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleFormData}
              /> */}

              {/* <span class="required">*</span> */}
              <Form.Control.Feedback type="invalid" className="error_text">
                Address is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom02">
              {/* <Form.Label style={{ color: "white" }}>radius</Form.Label> */}
              <Slider
                name="radius"
                sx={{ width: "100%", color: "orange" }}
                aria-label="Temperature"
                defaultValue={10}
                getAriaValueText={valuetext}
                // getAriaValueText={valuetext}
                valueLabelFormat={valuetext}
                valueLabelDisplay="auto"
                step={5}
                value={formData.radius}
                onChange={handleFormData}
                marks
                min={0}
                max={100}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                radius
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="10" controlId="validationCustom06">
              <Form.Select
                aria-label="Default select example"
                className="input-control"
                value={formData.sportId}
                onChange={handleFormData}
                name="sportId"
                disabled={
                  formData.latitude !== null &&
                  formData.longitude !== null &&
                  formData.radius !== null
                    ? ""
                    : "true"
                }
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
              {/* <img className="set_arrows" src={arrow} alt="arrow" /> */}
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Please Select any Option
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom04">
              <Form.Control
                required
                type="number"
                className="input-control"
                placeholder="Price"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleFormData}
              />
              <span class="required">*</span>
              <Form.Control.Feedback type="invalid" className="error_text">
                price is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom05">
              <Form.Control
                as="textarea"
                rows={3}
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Sell Yourself! Tell parents who you are, your major and athletic experiences and accomplishments. If you have taught lessons before or have any other cool Skills add it in! "
                name="bio"
                value={formData.bio}
                onChange={handleFormData}
              />
              <span class="required">*</span>
              <Form.Control.Feedback type="invalid" className="error_text">
                Bio is Required
              </Form.Control.Feedback>
            </Form.Group>
            <button
              type="submit"
              className="btn btn-primary profile_btn mt-4 mb-4"
            >
              {loading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "15px" }}
                ></span>
              )}
              Update
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default BasicDetail;
