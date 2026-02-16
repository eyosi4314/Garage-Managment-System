import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import car from "../../../Assets/img/home-demos/home-10.jpg";
import "./Location.css";

function Location() {
  return (
    <section className="locations">
      <Container>
        <h1 className="text-uppercase text_blue">Our Locations</h1>

        <Row className="justify-content-center align-items-center mt-4">
          <Col md={6}>
            <div className="location-list">
              <div className="location animated fadeInUp">
                <FaMapMarkerAlt size={20} className="location-icon" />
                <div className="location-text">
                  <h4>ABE-Garage ADDIS ABABA</h4>
                  <p>Bole Street, Wareda 05, FL 33125</p>
                </div>
              </div>
              <div className="location animated fadeInUp delay-1s">
                <FaMapMarkerAlt size={20} className="location-icon" />
                <div className="location-text">
                  <h4>ABE-Garage Chicago </h4>
                  <p>5401 N Lakewood Ave, Chicago, IL 60640</p>
                </div>
              </div>
              <div className="location animated fadeInUp delay-2s">
                <FaMapMarkerAlt size={20} className="location-icon" />
                <div className="location-text">
                  <h4>ABE-Garage Seattle </h4>
                  <p>2925 Washington St, Seattle, WA 98104-2465</p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} className="illustration animated fadeIn">
            <img
              src={car}
              alt="Car Repair Illustration"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Location;
