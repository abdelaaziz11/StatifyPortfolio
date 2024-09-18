import React from 'react';
import './Main.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import email from '../../Assests/email.png';
import linkedin from '../../Assests/linkedin.png';
import twitter from '../../Assests/x.png';
import aboutimage from '../../Assests/images (3).jpeg';

function Main() {
  return (
    <>
    {/* HERO SECTION */}
    <section className="hero-section">
      <div className="hero">
        <h1 className="fw-bold">Welcome</h1>
        <p>To statify morocco statistics online</p>
        <Link to="/login">
          <button className="btn-hero btn-warning p-2 m-2">Get Started</button>
        </Link>
      </div>
    </section>
    {/* ABOUT SECTION */}
    <section className="about-section" id="about">
      <div className="about" >
        <h1 className="heading text-uppercase">About Us</h1>
        <span className="text-black-50">Statify is a morocco statistics online</span>
        <div className="about-content">
          <div className="about-image">
            <img src={aboutimage} alt="about-image"/>
          </div>
          <div className="about-info">
            <p>Statify, a groundbreaking platform designed to transform the way Morocco conducts its national census. Our mission is to streamline the data collection process by empowering citizens to participate directly. We believe that by modernizing this vital task, we can improve the accuracy, efficiency, and cost-effectiveness of large-scale statistical reporting.
                  At Statify, we’re committed to innovation that benefits both the government and the people. Our platform enables individuals to easily input their own information, eliminating the need for traditional data collectors and saving valuable time and resources.
              Join us in building a smarter, more connected Morocco, where every voice matters, and every data point contributes to a brighter future.</p>
          </div>
        </div>
      </div>
    </section>
    {/* CONTACT SECTION */}
    <section className="contact-section" id="contact">
      <div className="contact">
        <h1 className="title text-uppercase">Contact Us</h1>
        <p className="text-black-50">Get in Touch</p>
        <div className="contact-info-upper-container">
          <div className="contact-info-container">
            <img
              src={email}
              alt="Email icon"
              className="icon contact-icon email-icon"
            />
            <p><a href="mailto:Bouayadihamid@gmail.com">Gmail</a></p>
          </div>
          <div className="contact-info-container">
            <img
              src={linkedin}
              alt="LinkedIn icon"
              className="icon contact-icon"
            />
            <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
          </div>
          <div className="contact-info-container">
            <img
              src={twitter}
              alt="Twitter icon"
              className="icon contact-icon"
            />
            <p><a href="https://twitter.com/AbdelKhouda">X-Twitter</a></p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Main;
