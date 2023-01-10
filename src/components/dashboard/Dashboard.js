import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import logo from "../../assets/images/profileIcon.png";
import BasicDetail from "./BasicDetail";
import Earning from "./Earning";
import Training from "./Training";
import VideoLesson from "./VideoLesson";
import ChangePassword from "./ChangePassword";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";
import { AdminGetProfileDetailAction } from "../../redux/actions/AdminGetProfileDetail";
import { emptyPasswordResponse } from "../../redux/actions/ChangePassword";
import { emptyUpdateProfileResponse } from "../../redux/actions/AdminProfileUpdateAction";
import CoachDocs from "../CoachProfile/CoachDocs";
import Venue from "./Venue";
import { MultiSelect } from "react-multi-select-component";
import Review from "./Review";
import Children from "../CoachProfile/Children";

const Dashboard = () => {
  const token = localStorage?.userData;
  let parsing = token ? JSON.parse(localStorage?.userData) : null;
  let usertype = parsing?.userType || null;

  const { imgResponse } = useSelector((state) => state.profilePicResponse);
  const responseCode = imgResponse?.statusCode;

  const { profileDetail, profileError } = useSelector(
    (state) => state.getProfileDetail
  );
  const getResponse = profileDetail?.statusCode;

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
    review: false,
    child: false,
  };
  const defautFormData = {
    logo: logo,
  };

  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const [formData, setFormData] = useState(defautFormData);
  const [inp, setInp] = useState("");
  const [show, setShow] = useState({ ...defaultShow, basicDetail: true });

  const [modalShow, setModalShow] = useState(false);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [photo, setPhoto] = useState();
  const [open, setOpen] = useState(false);
  console.log("hello", open);
  const photoUpload = (e) => {
    setSelectedFile(e.target.files[0]);
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
      setModalShow(true);
      let data = new FormData();
      data.append("file", e.target.files[0]);
      setPhoto(data);
      setSelectedFile(e.target.files[0]);
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
    setModalShow(false);
    dispatch(PhotoUploadAction(photo));
  };

  useEffect(() => {
    if (responseCode === 200) {
      toast.success("Profile Photo Updated Successfully");
      dispatch(AdminGetProfileDetailAction());
    }
  }, [imgResponse]);

  useEffect(() => {
    if (getResponse == 200) {
      setFormData({ ...formData, logo: profileDetail?.data?.profileImage });
    }
  }, [profileDetail]);

  const passwordHandler = () => {
    setShow({ ...defaultShow, password: true });
    dispatch(emptyPasswordResponse());
  };
  const basicDetailHandler = () => {
    setShow({ ...defaultShow, basicDetail: true });
    dispatch(emptyUpdateProfileResponse());
  };
  const documentsHandler = () => {
    setShow({ ...defaultShow, coachDocs: true });
  };
  const venueHandler = () => {
    // window.location.hash = "Venue";
    setShow({ ...defaultShow, venue: true });
  };

  const reviewHandler = () => {
    setShow({ ...defaultShow, review: true });
  };

  const childHandler = () => {
    setShow({ ...defaultShow, child: true });
  };

  const sidebarHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <div id="dashboard">
        <div className="dashboard_desc">
          <h1>Your Account Details</h1>
        </div>
      </div>
      {/* <div className="dashboard_conatiner"> */}
      <div className="container-fluid">
        <div className="row flex-nowrap  container-height ">
          <div className="col-auto px-0">
            <div
              id="sidebar"
              className="collapse collapse-horizontal show border-end"
              style={{ minHeight: "756px" }}
            >
              <div
                id="sidebar-nav"
                className="list-group border-0 rounded-0 text-sm-start min-vh-100"
              >
                <a
                  className="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                >
                  {/* <img src={logo} alt="icon" /> */}
                  <img
                    src={formData.logo || logo}
                    className="logohandler"
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
                      style={{ height: "225px" }}
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
                  className="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={basicDetailHandler}
                  style={{ color: show.basicDetail ? "#e38226" : "#515151" }}
                >
                  <span>Basic Details</span>
                </a>
                {/* <a
                  className="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, videoLesson: true })}
                  style={{
                    color: show.videoLesson
                      ? "#e38226 !important"
                      : "#515151 !important",
                  }}
                >
                  <span>Video Lessons</span>
                </a> */}
                <a
                  className="list-group-item border-end-0 d-inline-block text-truncate "
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, training: true })}
                  style={{
                    color: show.training ? "#e38226" : "#515151",
                  }}
                >
                  <span>Joined Trainings</span>
                </a>
                {usertype === 2 && (
                  <a
                    className="list-group-item border-end-0 d-inline-block text-truncate"
                    data-bs-parent="#sidebar"
                    onClick={() => setShow({ ...defaultShow, earning: true })}
                    style={{ color: show.earning ? "#e38226" : "#515151" }}
                  >
                    <span>Earning</span>
                  </a>
                )}
                <a
                  className="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={passwordHandler}
                  style={{
                    color: show?.password ? "#e38226" : "#515151",
                  }}
                >
                  <span>Change Password</span>
                </a>

                {usertype === 2 && (
                  <a
                    className="list-group-item border-end-0 d-inline-block text-truncate"
                    style={{ color: show.coachDocs ? "#e38226" : "#515151" }}
                    data-bs-parent="#sidebar"
                    onClick={documentsHandler}
                  >
                    <p>Documents</p>
                  </a>
                )}

                {usertype === 2 &&
                  (profileDetail?.data?.address !== null ||
                    profileDetail?.data?.latitude !== null ||
                    profileDetail?.data?.longitude !== null) && (
                    <a
                      className="list-group-item border-end-0 d-inline-block text-truncate "
                      style={{ color: show.venue ? "#e38226" : "#515151" }}
                      data-bs-parent="#sidebar"
                      onClick={() => venueHandler()}
                    >
                      <p>Venue</p>
                    </a>
                  )}

                <a
                  className="list-group-item"
                  style={{ color: show.review ? "#e38226" : "#515151" }}
                  data-bs-parent="#sidebar"
                  onClick={reviewHandler}
                >
                  <p>Review And Rating</p>
                </a>
              </div>
            </div>
          </div>
          <main className="col ps-md-2 pt-2 right_sidebar main_fixed p-2   ">
            <a
              data-bs-target="#sidebar"
              data-bs-toggle="collapse"
              className="p-1 text-decoration-none"
              style={{ cursor: "pointer" }}
              onClick={sidebarHandler}
            >
              {open ? (
                <i className="fa fa-chevron-right bi-lg py-2 p-1"></i>
              ) : (
                <i className="fa fa-chevron-left bi-lg py-2 p-1"></i>
              )}
            </a>
            <div className="page-header pt-3  ">
              {show.basicDetail && <BasicDetail />}
              {show.videoLesson && <VideoLesson />}
              {show.earning && <Earning />}
              {show.training && <Training />}
              {show.password && <ChangePassword />}
              {show.coachDocs && usertype === 2 ? <CoachDocs /> : null}
              {show.venue && <Venue />}
              {show.review && <Review />}
              {show.child && <Children />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
