import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import { useState } from "react";
import Article from "./components/Article";
import ProjectsPage from "./pages/ProjectsPage";
import ArticlesPage from "./pages/ArticlesPage";
import { AnimatePresence } from "framer-motion";
import { ScrollProgressBar, PageTransition } from "./components/ui/ScrollReveal";

// ─── Homepage layout ─────────────────────────────────────────────────────────
const HomePage = ({ openModal, setOpenModal }) => (
  <PageTransition>
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
  </PageTransition>
);

// ─── Animated routes ──────────────────────────────────────────────────────────
const AnimatedRoutes = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<HomePage openModal={openModal} setOpenModal={setOpenModal} />}
        />
        <Route
          path="/projects"
          element={<PageTransition><ProjectsPage /></PageTransition>}
        />
        <Route
          path="/articles"
          element={<PageTransition><ArticlesPage /></PageTransition>}
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <Router>
      <ScrollProgressBar />
      <div className="w-full overflow-x-hidden min-h-screen" style={{ position: "relative", zIndex: 1 }}>
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
