import React from "react";
import video from "../../../Assets/Advert_Vedio/Advert.mp4";
import "./HeroPage.css";

function HeroPage() {
  return (
    <div className="hero-container">
      <video autoPlay muted loop className="hero-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-8">
              <h6 className="slide-sub-title">
                // Any kind of car you will get //
              </h6>
              <h1 className="slide-title">
                Professional Car <br /> Service Provider
              </h1>
              <div className="btn-wrapper">
                <a href="/services" className="btn btn-primary">
                  OUR SERVICES
                </a>
                <a href="/about" className="btn btn-secondary">
                  LEARN MORE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
