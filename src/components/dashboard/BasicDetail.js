import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminGetProfileDetailAction } from "../../redux/actions/AdminGetProfileDetail";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";
import "./BasicDetail.css";
import { emptyUpdateProfileResponse } from "../../redux/actions/AdminProfileUpdateAction";
const BasicDetail = () => {
  const { profileDetail, profileError } = useSelector(
    (state) => state.getProfileDetail
  );
  const updateProfileDetail = useSelector((state) => state.profileUpdate);
  const getResponse = profileDetail?.statusCode;
  const response = updateProfileDetail?.statusCode;

  const dispatch = useDispatch();
  const defautFormData = {
    name: profileDetail?.data?.name ? profileDetail?.data.name : "",
    email: profileDetail?.data?.email ? profileDetail?.data.email : "",
    address: profileDetail?.data?.address ? profileDetail?.data.address : "",
    role: profileDetail?.data?.userType ? profileDetail?.data.userType : "",
    bio: profileDetail?.data?.bio ? profileDetail?.data.bio : "",
  };
  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    dispatch(AdminGetProfileDetailAction());
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
    
      let obj = [formData]
      let userData = {
        users: obj,
      };
      // obj.push(userData);
      console.log("daata--------------->", userData );
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
      });
    }
  }, [profileDetail]);
  useEffect(() => {
    if (updateProfileDetail?.updateProfileDetail != null) {
      setLoading(false);
      toast.success("Profile Updated Successfully");
    }
  }, [updateProfileDetail]);

  return (
    <>
      <div className="profile">
        <Form noValidate validated={validated} onSubmit={profileHandler}>
          <div className="profile_form">
            <Form.Group as={Col} md="10" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp "
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleFormData}
              />
              <Form.Control.Feedback className="error_text" type="invalid">
                Name is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom02">
              <Form.Control
                required
                type="email"
                className="form-control profile_inp mt-4"
                placeholder="Email"
                name="email"
                value={formData.email}
                readOnly
                // onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                Email is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom03">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                Address is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom04">
              <Form.Control
                required
                readOnly
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Role"
                name="role"
                value={formData.role}
                // onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                Role is Required
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
