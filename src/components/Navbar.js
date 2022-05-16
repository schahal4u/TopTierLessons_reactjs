import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import logo from "../assets/images/logo.png";
import "./Navbar.css";
import { useSelector } from "react-redux";
import profileLogo from "../assets/images/profileIcon.png";
import down from "../assets/images/down-arrow.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { adminInfo, error } = useSelector((state) => state.adminLogin);
  const { socialLoginInfo, errors } = useSelector((state) => state.socialLogin);

  const profileHandler = () => {
    console.log("click");
    navigate("/dashboard");
  };

  const token = localStorage.userData;

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
            <span className="navbar-toggler-icon"></span>
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
            <form className="d-flex align_btn">
              {/* {!adminInfo?.data?.access_token &&
              !socialLoginInfo?.data?.access_token ? ( */}
              {!token ? (
                <>
                  <Link to="signIn">
                    <button className="btn signin-btn" type="submit">
                      Sign In
                    </button>
                  </Link>
                  <div className="dropdown ">
                    <button
                      className="btn signup-btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sign Up
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-dark menu_items"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <a className="dropdown-item disabled " href="#">
                          I Am looking for
                        </a>
                      </li>
                      <li>
                        <Link
                          to="/lessonsignup"
                          style={{ textDecoration: "none" }}
                        >
                          <a className="dropdown-item border_btn" href="#">
                            Lessons
                          </a>
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item border_btn" href="#">
                          Coaching <br /> Opportunities
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div style={{ cursor: "pointer" }} onClick={profileHandler}>
                  <img src={profileLogo} alt="logo" />
                  <img style={{ paddingLeft: "5px" }} src={down} alt="down" />
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
      {/* { <BasicDetails/>}
      <BasicDetails/>
      <BasicDetails/>
      <BasicDetails/> */}
    </>
  );
};

export default Navbar;
