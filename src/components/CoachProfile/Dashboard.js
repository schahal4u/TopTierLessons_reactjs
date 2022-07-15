import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/profileIcon.png";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";
import { AdminGetProfileDetailAction } from "../../redux/actions/AdminGetProfileDetail";
import Bio from "./Bio";
import Availability from "./Availability";
import Location from "./Location";
import Pricing from "./Pricing";
import Reviews from "./Reviews";
import "./CoachProfile.css";

const CoachDashboard = () => {
  const { imgResponse } = useSelector((state) => state.profilePicResponse);
  const { getCoachProfile } = useSelector((state) => state.getAllCoachResponse);

  const responseCode = imgResponse?.statusCode;

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
    bio: false,
    location: false,
    availability: false,
    pricing: false,
    reviews: false,
  };
  const defautFormData = {
    logo: logo,
  };

  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const [formData, setFormData] = useState(defautFormData);
  const [show, setShow] = useState({ ...defaultShow, bio: true });
  const [modalShow, setModalShow] = useState(false);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [photo, setPhoto] = useState();
  const [open, setOpen] = useState(false);

  const photoUpload = (e) => {
    setSelectedFile(e.target.files[0]);
    const incomingFile = e.target.files[0];
    const fileType = incomingFile && (incomingFile?.type).toLowerCase();
    const size = incomingFile && e.target.files[0].size;
    const validImageTypes = imageType;

    if (incomingFile && !validImageTypes.includes(fileType)) {
      toast.warn("Please Select the Supported Image Format !");
      return;
    }

    if (size > 3000000) {
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

  const bioHandler = () => {
    setShow({ ...defaultShow, bio: true });
    // dispatch(emptyUpdateProfileResponse());
  };

  const sidebarHandler = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="dashboard">
        <div className="dashboard_desc">
          <h1>Profile Details</h1>
        </div>
      </div>
      {/* <div className="dashboard_conatiner"> */}
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto px-0">
            <div
              id="sidebar"
              class="collapse collapse-horizontal show border-end"
              style={{ height: "756px" }}
            >
              <div
                id="sidebar-nav"
                class="list-group border-0 rounded-0 text-sm-start min-vh-100"
              >
                <a
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                >
                  {/* <img src={logo} alt="icon" /> */}
                  <img
                    src={getCoachProfile?.data?.profileImage || logo}
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
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={bioHandler}
                  style={{ color: "#e38226" }}
                >
                  <span>Bio</span>
                </a>
                <a
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, location: true })}
                  style={{
                    color: show.location
                      ? "red  !important"
                      : "blue !important",
                  }}
                >
                  <span>Location</span>
                </a>
                <a
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() =>
                    setShow({ ...defaultShow, availability: true })
                  }
                  style={{
                    color: show.availability
                      ? "#e38226 !important"
                      : "#51515 !important",
                  }}
                >
                  <span>Availability</span>
                </a>
                {/* <a
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, pricing: true })}
                  style={{
                    color: show.pricing
                      ? "#e38226 !important"
                      : "#51515 !important",
                  }}
                >
                  <span>Pricing</span>
                </a> */}
                <a
                  class="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                  onClick={() => setShow({ ...defaultShow, reviews: true })}
                  style={{
                    color: show.reviews
                      ? "#e38226 !important"
                      : "#51515 !important",
                  }}
                >
                  <span>Reviews</span>
                </a>
              </div>
            </div>
          </div>
          <main class="col ps-md-2 pt-2 right_sidebar">
            <a
              data-bs-target="#sidebar"
              data-bs-toggle="collapse"
              class="p-1 text-decoration-none"
              style={{ cursor: "pointer" }}
              onClick={sidebarHandler}
            >
              {open ? (
                <i class="fa fa-chevron-right bi-lg py-2 p-1"></i>
              ) : (
                <i class="fa fa-chevron-left bi-lg py-2 p-1"></i>
              )}
            </a>
            <div class="page-header pt-3">
              {show.bio && <Bio />}
              {show.location && <Location />}
              {show.availability && <Availability />}
              {show.pricing && <Pricing />}
              {show.reviews && <Reviews />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
