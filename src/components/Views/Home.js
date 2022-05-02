import React from "react";
import Cards from "../Cards";
import Header from "../Header";
import "./Home.css";
import headerbg from "../../assets/images/header-bg.png";
import logo1 from "../../assets/images/logo1.png";
import logo2 from "../../assets/images/logo2.png";
import logo3 from "../../assets/images/logo3.png";
import logo4 from "../../assets/images/logo4.png";
import logo5 from "../../assets/images/logo5.png";
import logo6 from "../../assets/images/logo6.png";
import misson from "../../assets/images/misson.png";
import Games from "../Games";
import Services from "../Services";
import Reviews from "../Reviews";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          minWidth: "50vw",
          minHeight: "90vh",
          backgroundImage: `url(${headerbg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Header />
      </div>
      <Cards />
      {/* Logos */}
      <div className="container-fluid logos pb-5">
        <h2>Over 32k+ software businesses growing with Ar Shakir.</h2>
        <div
          className="row pb-4 pt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo1} alt="log" />
          </div>
          {/* <div className="col-md-2 text-center mt-4">
            <img src={logo2} alt="log" />
          </div> */}
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo3} alt="log" />
          </div>
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo4} alt="log" />
          </div>
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo5} alt="log" />
          </div>
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo6} alt="log" />
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="misson">
        <div className="container misson_card">
          <div className="row">
            <div className="col-md-12 col-lg-6 misson_cards">
              <div className="misson_desc">
                <h1>Our Mission</h1>
                <p>
                  At Top Tier, we believe lessons are more than just the skills
                  you learn. We believe that every child deserves more than a
                  coach, they deserve a mentor and a role model. Top Tier was
                  created to do just that. We have partnered with current
                  student athletes at the University of Illinois
                  Urbana-Champaign passionate about inspiring the next
                  generation of athletes. Your coach may be an All-American,
                  national champion or even an olympic contender and we can't
                  think of anyone better to learn from.
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 misson_cardss">
              <img className="img-fluid fluid" src={misson} alt="misson" />
            </div>
          </div>
        </div>
      </div>
      <Games />
      <Reviews />
      <Services />
      <div className="container-fluid line"></div>
    </>
  );
};

export default Home;
