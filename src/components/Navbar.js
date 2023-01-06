import React, { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { routes } from "../routes";
// import { navbarMenu1, navbarMenu2, navbarMenu3 } from "../routes";
import logo from "../assets/images/logo.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import profileLogo from "../assets/images/profileIcon.png";
import down from "../assets/images/down-arrow.png";
import { emptyUpdateProfileResponse } from "../redux/actions/AdminProfileUpdateAction";
import { emptyProfileImageResponse } from "../redux/actions/UploadPhoto";
import { AdminGetProfileDetailAction } from "../redux/actions/AdminGetProfileDetail";
import {
  adminLoginReset,
  socialLoginReset,
} from "../redux/actions/AdminLoginAction";
import { emptyRegisterResponse } from "../redux/actions/LessonsRegisterAction";
const Navbar = () => {
  const token = localStorage?.userData;

  let parsing = token ? JSON.parse(localStorage?.userData) : null;
  let usertype = parsing?.userType || null;

  const navigate = useNavigate();
  const { adminInfo, error } = useSelector((state) => state.adminLogin);
  const { socialLoginInfo, errors } = useSelector((state) => state.socialLogin);
  const { profileDetail, profileError } = useSelector(
    (state) => state.getProfileDetail
  );
  const getResponse = profileDetail?.statusCode;
  const dispatch = useDispatch();
  const defautFormData = {
    logo: profileLogo,
  };
  const [formData, setFormData] = useState(defautFormData);
  // const [routes, setRoutes] = useState([]);

  const profileHandler = () => {
    dispatch(emptyProfileImageResponse());
    dispatch(emptyUpdateProfileResponse());
    navigate("/dashboard");
  };

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    // let parsing = token ? JSON.parse(localStorage?.userData) : null;
    // let usertype = parsing?.userType || null;
    dispatch(AdminGetProfileDetailAction());
    // setRoutes(usertype === 2 ? navbarMenu2 : navbarMenu1);
  }, [token]);

  useEffect(() => {
    if (getResponse == 200) {
      setFormData({ ...formData, logo: profileDetail?.data?.profileImage });
    }
  }, [profileDetail]);

  const loginHandler = () => {
    dispatch(adminLoginReset());
    dispatch(socialLoginReset());
    navigate("/signIn");
  };

  const coachHandler = () => {
    dispatch(emptyUpdateProfileResponse());
    dispatch(emptyRegisterResponse());
    navigate("/coachsignup");
  };

  const bookingHandler = () => {
    navigate("/appointmentList", { replace: true });
  };
  const slotsHandler = () => {
    navigate("/bookingslot", { replace: true });
  };
  const chatsHandler = () => {
    navigate("/conversation", { replace: true });
  };

  // fixed-top
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-background">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" style={{ color: "#fff" }}></i>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 align_navbar">
              {routes.map((item) => (
                <li className="mx-3" key={item.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "link-active" : "link"
                    }
                    aria-current="item"
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="d-flex">
              {/* {!adminInfo?.data?.access_token &&
              !socialLoginInfo?.data?.access_token ? ( */}
              {!token ? (
                <>
                  {/* <Link to="/signIn"> */}
                  <button
                    className="btn signin-btn"
                    type="submit"
                    onClick={loginHandler}
                  >
                    Sign In
                  </button>
                  {/* </Link> */}
                  <div className="dropdown ">
                    <button
                      style={{ color: "#fff !important" }}
                      type="button"
                      className="signup-btn nav-link dropdown-toggle  bg-clr"
                      id="navbar-primary_dropdown_1"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sign Up
                    </button>
                    <div
                      className="dropdown-menu menu_colour dropdown-menu-right"
                      aria-labelledby="navbar-primary_dropdown_1"
                    >
                      <a
                        className="dropdown-item disabled"
                        onClick={profileHandler}
                      >
                        I Am looking for
                      </a>
                      <Link
                        to="/athletesignup"
                        style={{ textDecoration: "none" }}
                      >
                        <a className="dropdown-item border_btn">Lessons</a>
                      </Link>
                      {/* <Link */}
                      {/* // to="/coachsignup" style={{ textDecoration: "none" }} */}
                      {/* > */}
                      <a
                        className="dropdown-item border_btnn"
                        onClick={coachHandler}
                      >
                        Coaching <br /> Opportunities
                      </a>
                      {/* </Link> */}
                    </div>
                    {/* <ul
                      className="dropdown-menu dropdown-menu-dark menu_items"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <a className="dropdown-item disabled ">
                          I Am looking for
                        </a>
                      </li>
                      <li>
                        <Link
                          to="/lessonsignup"
                          style={{ textDecoration: "none" }}
                        >
                          <a className="dropdown-item border_btn">Lessons</a>
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item border_btn">
                          Coaching <br /> Opportunities
                        </a>
                      </li>
                    </ul> */}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{ cursor: "pointer" }}
                    className="nav-link dropdown-toggle"
                    id="navbar-primary_dropdown_1"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  // onClick={profileHandler}
                  >
                    <img
                      src={formData.logo || profileLogo}
                      className="logohandler"
                    />
                  </div>
                  <div
                    className="dropdown-menu menu_colour dropdown-menu-right text-start "
                    aria-labelledby="navbar-primary_dropdown_1"
                  >
                    {usertype === 2 && (
                      <>
                        <a className="dropdown-item" onClick={slotsHandler}>
                          Slots
                        </a>
                      </>
                    )}
                    <a className="dropdown-item" onClick={bookingHandler}>
                      Booking
                    </a>
                    <a className="dropdown-item" onClick={chatsHandler}>
                      Chats
                    </a>
                    <a className="dropdown-item" onClick={profileHandler}>
                      Profile
                    </a>
                    <a className="dropdown-item" onClick={logoutHandler}>
                      Logout
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
