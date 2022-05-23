import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { routes } from "../routes";
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
const Navbar = () => {
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

  const profileHandler = () => {
    dispatch(emptyProfileImageResponse());
    dispatch(emptyUpdateProfileResponse());
    navigate("/dashboard");
  };

  const token = localStorage.userData;

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    dispatch(AdminGetProfileDetailAction());
  }, []);

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

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-background">
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
            <i className="fa fa-bars" style={{ color: "#fff" }}>
              {" "}
            </i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 align_navbar">
              {routes.map((page) => (
                <li className="nav-item" key={page.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "link-active" : "link"
                    }
                    aria-current="page"
                    to={page.path}
                  >
                    {page.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="d-flex align_btn">
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
                      class="signup-btn nav-link dropdown-toggle  bg-clr"
                      id="navbar-primary_dropdown_1"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sign Up
                    </button>
                    <div
                      class="dropdown-menu menu_colour dropdown-menu-right"
                      aria-labelledby="navbar-primary_dropdown_1"
                    >
                      <a
                        class="dropdown-item disabled"
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
                      <Link
                        to="/coachsignup"
                        style={{ textDecoration: "none" }}
                      >
                        <a className="dropdown-item border_btnn">
                          Coaching <br /> Opportunities
                        </a>
                      </Link>
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
                    class="nav-link dropdown-toggle"
                    id="navbar-primary_dropdown_1"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    // onClick={profileHandler}
                  >
                    <img
                      src={formData.logo || profileLogo}
                      style={{
                        borderRadius: "50%",
                        width: "75px",
                        height: "75px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div
                    class="dropdown-menu menu_colour dropdown-menu-right"
                    aria-labelledby="navbar-primary_dropdown_1"
                  >
                    <a class="dropdown-item " onClick={profileHandler}>
                      Profile
                    </a>
                    <a class="dropdown-item" onClick={logoutHandler}>
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
