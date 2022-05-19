import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import logo from "../../assets/images/profileIcon.png";
import BasicDetail from "./BasicDetail";
import Earning from "./Earning";
import Training from "./Training";
import VideoLesson from "./VideoLesson";
import ChangePassword from "./ChangePassword";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Dashboard = () => {
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
  const defaultShow = {
    basicDetail: false,
    training: false,
    videoLesson: false,
    earning: false,
    password: false,
  };
  const defautFormData = {
    logo: logo,
  };

  const inputFile = useRef(null);
  const [formData, setFormData] = useState(defautFormData);
  const [inp, setInp] = useState("");
  const [show, setShow] = useState({ ...defaultShow, basicDetail: true });
  const [modalShow, setModalShow] = useState(false);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [photo, setPhoto] = useState();
  // console.log("preview", preview, "jjjjjjjjjjj", selectedFile);

  const photoUpload = (e) => {
    setSelectedFile(e.target.files[0]);
    const incomingFile = e.target.files[0];
    console.log("file", incomingFile);
    const fileType = incomingFile && (incomingFile?.type).toLowerCase();
    const size = incomingFile && e.target.files[0].size;
    const validImageTypes = imageType;

    if (incomingFile && !validImageTypes.includes(fileType)) {
      setInp("");
      return;
    }

    if (size > 3000000) {
      setInp("");
      return;
    }

    if (e.target.files.length !== 0) {
      setModalShow(true);
      // const test = {
      //   image: 2,
      //   file: e.target.files[0],
      // };
      let data = new FormData();
      data.append("file", e.target.files[0]);
      setPhoto(data);
      setSelectedFile(e.target.files[0]);
      // dispatch(uploadImageVenueReq(test));
      // setSpinner(true);
    }
  };

  const uploadLogo = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const submitHandler = () => {
    console.log("clicked", photo);
  };

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
                  {/* <img src={logo} alt="icon" /> */}
                  <img
                    src={formData.logo || logo}
                    // style={{
                    //   borderRadius: "50%",
                    //   width: "100px",
                    //   height: "100px",
                    //   cursor: "pointer",
                    // }}
                    onClick={uploadLogo}
                  />
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={photoUpload}
                  />
                </a>
                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Upload Profile Photo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={preview}
                      alt="preview"
                      style={{ height: "250px" }}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    {/* <Button
                      variant="secondary"
                      onClick={() => setModalShow(false)}
                    >
                      Close
                    </Button> */}
                    <Button variant="primary" onClick={submitHandler}>
                      Upload
                    </Button>
                  </Modal.Footer>
                </Modal>
                <a
                  href="#"
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, basicDetail: true })}
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
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
