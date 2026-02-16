import React from "react";
import HeroPage from "../components/HeroPage/HeroPage";
import Services from "../components/Services/Services";
import Location from "../components/Location/Location";
import AboutUs from "../components/About_us/Aboutus";
import WhyChooComp from "../components/WhyChooComp/WhyChooComp";
import ServicePage from "./ServicePage/ServicePage";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <>
      <HeroPage />
      <AboutUs />
      <WhyChooComp />
      <ServicePage />
      <Location />
    </>
  );
}

export default HomePage;
