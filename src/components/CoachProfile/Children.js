import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminGetProfileDetailAction } from "../../redux/actions/AdminGetProfileDetail";
import {
  AdminProfileUpdateAction,
  deleteChildAction,
  getChildByIdAction,
  updateChildAction,
  updateChildResponse,
} from "../../redux/actions/AdminProfileUpdateAction";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import AddChildModal from "../Modal/AddChildModal";
import { deleteChildResponse } from "../../redux/actions/AdminProfileUpdateAction";
import { formatMuiErrorMessage } from "@mui/utils";
import { Alert } from "bootstrap";
import moment from "moment";
import Cards from "../common/cards";
const Children = () => {
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);
  let childId = "";
  //   const { getAllVenue, loading } = useSelector((state) => state.coachVenue);
  //   const { deleteVenue } = useSelector((state) => state.getAllCoachResponse);
  const { profileDetail, loading } = useSelector(
    (state) => state.getProfileDetail
  );
  const { deleteChild, getByChildId } = useSelector(
    (state) => state.profileUpdate
  );
  console.log("getByChildId=====>", getByChildId);
  //   const { updateProfileDetail } = useSelector((state) => state.profileUpdate);
  //   console.log("profileDetail=====>>>>>", updateProfileDetail);

  const defautFormData = {
    name: "",
    address: "",
    dateOfBirth: "",
    skillLevel: "",
    latitude: "",
    longitude: "",

    // sportId: "",
  };

  const [formData, setFormData] = useState(defautFormData);
  const [modalShow, setModalShow] = useState(false);
  const [header, setHeader] = useState("");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const onChangeDateHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: moment.utc(moment(e.target.value).utc()).format(),
    });
  };

  // for normal onchange handler
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "select-one" ? +e.target.value : e.target.value,
    });
  };

  // const handleFormData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleFormData = (e) => {
    if (e.target.type === "date") {
      onChangeDateHandler(e);
    } else {
      onChangeHandler(e);
    }
  };
  // const handleFormData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (deleteChild?.statusCode === 200) {
      dispatch(AdminGetProfileDetailAction());
      toast.success(deleteChild?.returnMessage[0]);
      dispatch(deleteChildResponse());
    }
    if (getByChildId?.data) {
      childId = getByChildId.data.childId;
      setFormData({
        ...formData,
        name: getByChildId.data.childName,
        address: getByChildId.data.address,
        age: getByChildId.data.dateOfBirth,
        skillLevel: getByChildId.data.skillLevel,
        latitude: getByChildId.data.latitude,
        longitude: getByChildId.data.longitude,
      });
    }
  }, [deleteChild, getByChildId]);

  // open popup
  const AddChildHandler = (type) => {
    setHeader(type);
    setFormData({
      ...formData,
      name: "",
      address: "",
      dateOfBirth: "",
      skillLevel: "",
      latitude: "",
      longitude: "",
    });

    // dispatch(GetNearbyVenueAction(nearVenue));

    setModalShow(true);
  };

  // delete child
  const childDeleteHandler = (value) => {
    dispatch(
      deleteChildAction({
        childId: value,
      })
    );
  };

  // add child
  const childSubmitHandler = (e) => {
    e.preventDefault();
    setValidated(true);
    const users = [
      {
        ...formData,
      },
    ];

    if (
      formData.name !== "" &&
      formData.address !== "" &&
      formData.dateOfBirth !== "" &&
      formData.skillLevel !== ""
      // formData.sportId !== ""
    ) {
      dispatch(AdminProfileUpdateAction({ users }))
        .then((res) => {
          if (res.statusCode === 200) {
            toast.success(`${header} child successfully `);
            setModalShow(false);
            dispatch(AdminGetProfileDetailAction());
          }
        })
        .catch((err) => toast.warning("something went wrong"));
    } else {
      toast.warning("All fields are required");
    }
  };

  // get by childId
  const childEditHandler = (val, type) => {
    setHeader(type);
    dispatch(
      getChildByIdAction({
        childId: val,
      })
    );
    setModalShow(true);
    // formData.name !== "" &&
    //   formData.address !== "" &&
    //   formData.age !== "" &&
    //   formData.skillLevel !== "";
  };

  // update child
  const editChildSubmitHandler = (e, childId) => {
    e.preventDefault();
    alert(childId);
    const defaultform = {
      ...formData,
    };
    const users = {
      childId: childId,
      childName: formData.name,
      age: +formData.age || 0,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      skillLevel: formData.skillLevel,
    };
    if (
      formData.name != null &&
      formData.address != null &&
      (formData.age != null || 0) &&
      formData.skillLevel != null
      // formData.sportId !== undefined
    ) {
      dispatch(updateChildAction({ ...users }))
        .then((res) => {
          if (res.statusCode === 200) {
            toast.success(`${header} child successfully `);
            setModalShow(false);
            dispatch(updateChildResponse());
          }
        })
        .catch((err) => toast.warning("something went wrong"));
    } else {
      toast.warning("All fields are required");
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-content-between ">
          <div>
            <h1>Child List </h1>
          </div>
          <div>
            <button
              onClick={() => AddChildHandler("Add")}
              data-toggle="modal"
              data-target="#exampleModalCenter"
              style={{
                width: "100px",
                height: "50px",
                borderRadius: "10px",
                background: "#e38226",
                color: "white",
                border: "black",
              }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div id="toggleList">
          {profileDetail?.data?.children?.length
            ? profileDetail?.data?.children?.map((item) => {
                return (
                  <div className="card col-sm-12 w-100 venuecard ">
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="h-100"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "center",
                          }}
                        >
                          {/* <div className="col-sm-1">
                          <div className=" h-100 d-flex justify-content-center align-items-center">
                            <img
                              className="card-img-bottom"
                              src={coachVenue?.image}
                              height="50px"
                              width="50px"
                              alt="Card image cap"
                            />
                          </div>
                        </div> */}
                          <div className="col-sm-2 ">
                            <p> Name</p>

                            <h4>{item?.childName}</h4>
                          </div>
                          <div
                            className="col-sm-2  "
                            style={{ borderLeft: "1px solid #575757" }}
                          >
                            <p className="card-text">Address</p>
                            <h6 className="ellipse">{item?.address}</h6>
                          </div>
                          <div
                            className="col-sm-2"
                            style={{ borderLeft: "1px solid #575757" }}
                          >
                            <p className="card-text">Sports</p>
                            <h4>
                              {item?.skillLevel === 1
                                ? "Begginer"
                                : item?.skillLevel === 2
                                ? "Intermidate"
                                : "Expert"}
                            </h4>
                          </div>
                          <div
                            className="col-sm-2"
                            style={{ borderLeft: "1px solid #575757" }}
                          >
                            <p className="card-text">DOB</p>
                            <h4>
                              {moment(item.dateOfBirth).format("YYYY-MM-DD")}{" "}
                            </h4>
                          </div>

                          <div
                            className="col-sm-1"
                            style={{ borderLeft: "1px solid #575757" }}
                          >
                            <p className="card-text">Action</p>
                            <div className="d-flex justify-content-between align-items-center p-1">
                              <i
                                onClick={() =>
                                  childEditHandler(item.childId, "Edit")
                                }
                                className="fa fa-edit fs-4 cursor_pointer"
                                aria-hidden="true"
                              />
                              <i
                                onClick={() => childDeleteHandler(item.childId)}
                                className="fa fa-trash fs-4 cursor_pointer"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : loading && (
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <div class="spinner-border  text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
        </div>
        <div id="toggleCard" className="my-5">
          <Cards profileDetail={profileDetail} />
        </div>
      </div>
      {/* Modal  */}

      <AddChildModal
        headerText={header}
        show={modalShow}
        onHide={() => setModalShow(false)}
        validated={validated}
        setModalShow={setModalShow}
        formData={formData}
        handleFormData={handleFormData}
        // handleOnChange={handleOnChange}
        childSubmitHandler={childSubmitHandler}
        editChildSubmitHandler={editChildSubmitHandler}
        getAllSports={getAllSports}
        setFormData={setFormData}
      />
    </>
  );
};

export default Children;
