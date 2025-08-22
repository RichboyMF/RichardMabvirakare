import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import { DebugPanel } from "./components/DebugPanel";
import type { DebugConfig } from "./types";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { EXPERIENCE_DATA, PROJECTS_DATA } from "./constants";

function App(): React.ReactNode {
  const location = useLocation();
  const [debugConfig, setDebugConfig] = useState<DebugConfig>({
    particleDensity: 3000,
    mouseRadius: 150,
    connectionDistance: 100,
    idleZapFrequency: 20,
    pulseIntensity: 2.0,
    useProfilePicture: true,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  // Handle hash-based scrolling
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        // Add a small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash]);

  // Preload all videos referenced in constants on app start
  useEffect(() => {
    const videoUrls: string[] = [];
    EXPERIENCE_DATA.forEach((exp) => {
      exp.media?.forEach((m) => {
        if (m.type === "video") videoUrls.push(m.src);
      });
    });
    PROJECTS_DATA.forEach((proj) => {
      proj.media?.forEach((m) => {
        if (m.type === "video") videoUrls.push(m.src);
      });
    });

    // Create hidden video elements to warm the browser cache
    const elements: HTMLVideoElement[] = [];
    videoUrls.forEach((url) => {
      const v = document.createElement("video");
      v.src = url;
      v.preload = "auto";
      v.muted = true;
      v.playsInline = true as any;
      v.style.position = "absolute";
      v.style.width = "1px";
      v.style.height = "1px";
      v.style.opacity = "0";
      document.body.appendChild(v);
      // Kick off fetch by calling load
      try {
        v.load();
      } catch {}
      elements.push(v);
    });

    return () => {
      elements.forEach((el) => {
        try {
          el.pause();
          el.removeAttribute("src");
          el.load();
        } catch {}
        el.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <InteractiveBackground config={debugConfig} />
      {isSettingsOpen && (
        <DebugPanel
          config={debugConfig}
          setConfig={setDebugConfig}
          onClose={toggleSettings}
        />
      )}
      <div className="relative z-10">
        <Header onSettingsClick={toggleSettings} />
        <main className="container mx-auto px-6 md:px-12">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero useProfilePicture={debugConfig.useProfilePicture} />
                  <About />
                  <Experience />
                  <Projects />
                  <Contact />
                </>
              }
            />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
