import React, { useEffect } from "react";
import { GetAllSportsAction } from "../redux/actions/GetAllSports";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { GetCoachByIdAction } from "../redux/actions/coach";
import { useNavigate } from "react-router-dom";
import "./Games.css";
import ReactGA from "react-ga";
let startpoint = 0;
let endpoint = 3;

const Games = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);
  const data = getAllSports?.data;
  const response = getAllSports?.statusCode;

  const [sportsList, setSportsList] = useState([]);

  const [list, setList] = useState([]);

  const [Page, setPage] = useState({
    page: 1,
    pageSize: 99,
  });

  useEffect(() => {
    if (response == 200) {
      // setList(data);
      setSportsList(data);
    }
  }, [getAllSports]);

  useEffect(() => {
    dispatch(GetAllSportsAction(Page));
  }, []);

  // useEffect(() => {
  //   dispatch(GetAllSportsAction(Page));
  // }, [Page]);

  const coachHandler = (data) => {
    localStorage.setItem("sportsId", data.sportId);
    let obj = {
      sportId: data.sportId,
      page: 1,
      pageSize: 10,
    };
    dispatch(GetCoachByIdAction(obj));
    navigate("/coachSearch");
    ReactGA.event({
      category: "Sports",
      action: `SportsName - ${data.sportName}`,
    });
  };

  const rightSlideHandler = (countPlus) => {
    if (sportsList.length > endpoint) {
      startpoint = startpoint + endpoint;
      endpoint = endpoint + countPlus;
      if (endpoint > startpoint && endpoint <= sportsList.length) {
        const list = sportsList.slice(startpoint, endpoint);
        setList(list);
      }
      // if (Page.page >= 1) {
      //   setPage({ ...Page, page: Page.page + 1 });
      // }
    }
  };

  const leftSlideHandler = (countMinus) => {
    if (startpoint > 0) {
      startpoint = countMinus - 3;
      endpoint = countMinus;
      if (startpoint >= 0 && sportsList.length > 0) {
        const list = sportsList.slice(startpoint, endpoint);
        setList(list);
      }
    }
    // if (Page.page != 1) {
    //   setPage({ ...Page, page: Page.page - 1 });
    // }
  };

  useEffect(() => {
    if (sportsList.length > 0) {
      const list = sportsList.slice(startpoint, endpoint);
      setList(list);
    }
  }, [sportsList]);

  return (
    <>
      <div className="games">
        {/* <p className="games_header">What you like to learn or teach</p> */}
        <p className="games_desc">Sports Offered</p>
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
                data-interval="0"
              >
                {/* <!-- Carousel indicators --> */}
                <ol className="carousel-indicators">
                  <li
                    data-target="#myCarousel"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                {/* <!-- Wrapper for carousel items --> */}
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      {list?.length &&
                        list?.map((user) => (
                          <div className="col-sm-4">
                            <div
                              className="thumb-wrapper"
                              style={{ cursor: "pointer" }}
                            >
                              <div className="img-box">
                                <img
                                  src={user?.sportImage}
                                  className="img-fluid"
                                  alt="img"
                                  onClick={() => coachHandler(user)}
                                />
                              </div>
                              <div className="thumb-content">
                                <h4>{user?.sportName}</h4>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Carousel controls --> */}
              <a
                className="carousel-control-prev"
                href="#myCarousel"
                data-slide="prev"
              >
                <i
                  className="fa fa-angle-left"
                  onClick={() => leftSlideHandler(startpoint)}
                ></i>
              </a>
              <a
                className="carousel-control-next"
                href="#myCarousel"
                data-slide="next"
              >
                <i
                  className="fa fa-angle-right"
                  onClick={() => rightSlideHandler(endpoint)}
                ></i>
              </a>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Games;
