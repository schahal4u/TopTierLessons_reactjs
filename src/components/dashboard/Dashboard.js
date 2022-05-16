import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../../assets/images/profileIcon.png";
import BasicDetail from "./BasicDetail";
import Earning from "./Earning";
import Training from "./Training";
import VideoLesson from "./VideoLesson";
import ChangePassword from "./ChangePassword";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const defaultShow = {
    basicDetail: false,
    training: false,
    videoLesson: false,
    earning: false,
    password: false,
  };

  const [show, setShow] = useState({ ...defaultShow, basicDetail: true });

  return (
    <>
      <div className="dashboard">
        <div className="dashboard_desc">
          <h1>Your Account Details</h1>
        </div>
      </div>
      {/* <div className="dashboard_conatiner"> */}
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto px-0">
            <div
              id="sidebar"
              class="collapse collapse-horizontal show border-end"
            >
              <div
                id="sidebar-nav"
                class="list-group border-0 rounded-0 text-sm-start min-vh-100"
              >
                <a
                  href="#"
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                >
                  <img src={logo} alt="icon" />
                </a>
                <a
                  href="#"
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, basicDetail: true })}
                  // style={{ color: show.basicDetail ? "#e38226" : "#515151" }}
                  style={{ color: "#e38226" }}
                >
                  <span>Basic Details</span>
                </a>
                <a
                  href="#"
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, videoLesson: true })}
                  style={{
                    color: show.videoLesson
                      ? "#e38226 !important"
                      : "#515151 !important",
                  }}
                >
                  <span>Video Lessons</span>
                </a>
                <a
                  href="#"
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, training: true })}
                  style={{
                    color: show.training
                      ? "#e38226  !important"
                      : "#515151 !important",
                  }}
                >
                  <span>Joined Trainings</span>
                </a>
                <a
                  href="#"
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, earning: true })}
                  style={{
                    color: show.earning
                      ? "#e38226 !important"
                      : "#51515 !important",
                  }}
                >
                  <span>Earning</span>
                </a>
                <a
                  href="#"
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, password: true })}
                  style={{
                    color: show?.password && "#e38226 !important",
                  }}
                >
                  <span>Change Password</span>
                </a>
              </div>
            </div>
          </div>
          <main class="col ps-md-2 pt-2 right_sidebar">
            {/* <a
              href="#"
              data-bs-target="#sidebar"
              data-bs-toggle="collapse"
              class="border rounded-3 p-1 text-decoration-none"
            >
              <i class="fa fa-list bi-lg py-2 p-1"></i>
            </a> */}
            <div class="page-header pt-3">
              {show.basicDetail && <BasicDetail />}
              {show.videoLesson && <VideoLesson />}
              {show.earning && <Earning />}
              {show.training && <Training />}
              {show.password && <ChangePassword />}
            </div>
            <hr />
          </main>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Dashboard;
