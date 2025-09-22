import React, { useState } from "react";
import Navbar from "../Components/navbar.jsx";
import Dashboard from "../Components/Dashboard.jsx";


const Home = () => {
 // const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <>
      <Navbar /*activeSection={activeSection} setActiveSection={setActiveSection}*/ />
      <Dashboard/>
    </>
  );
};

export default Home;
