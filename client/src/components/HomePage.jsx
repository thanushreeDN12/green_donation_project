import React from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero";
import Mission from "./Mission";
import Programs from "./Programs.jsx";
import Impact from "./Impact";
import Stories from "./Stories";
import Partners from "./Partners";
import DonateCTA from "./DonateCTA";
import Newsletter from "./Newsletter.jsx";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Mission />
      <Programs />
      <Impact />
      <Stories />
      <Partners />
      <DonateCTA />
      <Newsletter />
      <Footer />
      
    </>
  );
};

export default HomePage;