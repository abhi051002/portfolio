import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import { BrowserRouter as Router } from "react-router-dom";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import { useState } from "react";
import Article from "./components/Article";

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <Router>
      <div className="bg-[#030712] w-full overflow-x-hidden min-h-screen">
        <Navbar />
        <Hero />
        <Skills />
        <Experience />
        <Project openModal={openModal} setOpenModal={setOpenModal} />
        <Article />
        <Education />
        <Contact />
        <Footer />
        {openModal.state && (
          <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </div>
    </Router>
  );
}

export default App;
