import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./App.css";

/* ========================================
   3D GLOBE
======================================== */

function InteractiveObject({ mouse }) {
  const globe = useRef();
  const innerGlobe = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const mouseX = mouse.current.x;
    const mouseY = mouse.current.y;

    const targetRotationX = -mouseY * 0.6;
    const targetRotationY = mouseX * 0.9 + time * 0.15;

    globe.current.rotation.x = THREE.MathUtils.lerp(
      globe.current.rotation.x,
      targetRotationX,
      0.06
    );

    globe.current.rotation.y = THREE.MathUtils.lerp(
      globe.current.rotation.y,
      targetRotationY,
      0.06
    );

    const targetX = mouseX * 0.35;
    const targetY = mouseY * 0.25;

    globe.current.position.x = THREE.MathUtils.lerp(
      globe.current.position.x,
      targetX,
      0.04
    );

    globe.current.position.y = THREE.MathUtils.lerp(
      globe.current.position.y,
      targetY,
      0.04
    );

    if (innerGlobe.current) {
      innerGlobe.current.rotation.y = -time * 0.08;
      innerGlobe.current.rotation.x =
        Math.sin(time * 0.3) * 0.08;
    }
  });

  return (
    <Float
      speed={1.2}
      floatIntensity={0.45}
      rotationIntensity={0.08}
    >
      <group ref={globe}>

        <mesh scale={2}>
          <sphereGeometry args={[1, 32, 32]} />

          <meshBasicMaterial
            color="#9b5cff"
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>

        <mesh
          ref={innerGlobe}
          scale={1.86}
        >
          <sphereGeometry args={[1, 32, 32]} />

          <meshBasicMaterial
            color="#9b5cff"
            transparent
            opacity={0.035}
          />
        </mesh>

        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0
          ]}
        >
          <torusGeometry
            args={[
              2.08,
              0.008,
              16,
              128
            ]}
          />

          <meshBasicMaterial
            color="#b98cff"
            transparent
            opacity={0.7}
          />
        </mesh>

        <mesh
          rotation={[
            0.5,
            0.8,
            0
          ]}
        >
          <torusGeometry
            args={[
              2.15,
              0.006,
              16,
              128
            ]}
          />

          <meshBasicMaterial
            color="#9b5cff"
            transparent
            opacity={0.5}
          />
        </mesh>

      </group>
    </Float>
  );
}


/* ========================================
   3D SCENE
======================================== */

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[5, 6, 5]}
        intensity={3}
      />

      <pointLight
        position={[-4, 2, 3]}
        intensity={10}
        color="#9b5cff"
      />

      <pointLight
        position={[4, -3, -2]}
        intensity={6}
        color="#4c1d95"
      />

      <InteractiveObject mouse={mouse} />

      <Sparkles
        count={180}
        scale={10}
        size={2}
        speed={0.35}
      />

      <Environment preset="city" />
    </>
  );
}


/* ========================================
   MAIN APP
======================================== */

function App() {

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const [loaded, setLoaded] = useState(false);


  /* ======================================
     PAGE OPEN
  ====================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  /* ======================================
     SCROLL ANIMATION
  ====================================== */

  useEffect(() => {

    const sections = document.querySelectorAll(
      ".scroll-section"
    );

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }

        });

      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };

  }, []);


  /* ======================================
     MOUSE TRACKING
  ====================================== */

  useEffect(() => {

    const handleMouseMove = (event) => {

      mouse.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y =
        -(event.clientY / window.innerHeight) * 2 + 1;

    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

    };

  }, []);


  return (
    <div
      className={`site ${
        loaded ? "page-loaded" : ""
      }`}
    >

      {/* ==================================
          NAVBAR
      ================================== */}

      <header className="navbar">

        <a
          href="#home"
          className="logo"
        >
          BRAHMYA B ANAND<span>.</span>
        </a>

        <nav>

          <a href="#about">
            About
          </a>

          <a href="#work">
            Projects
          </a>

          <a href="#skills">
            Skills
          </a>

          <a href="#contact">
            Contact
          </a>

        </nav>

        <div className="nav-actions">

          <a
            href="#contact"
            className="nav-contact"
          >
            Let's Connect ↗
          </a>

        </div>

      </header>


      {/* ==================================
          HERO
      ================================== */}

      <section
        id="home"
        className="hero scroll-section show"
      >

        <div className="hero-content">

          <div className="status">
            <span></span>
            OPEN TO OPPORTUNITIES
          </div>

          <p className="eyebrow">
            FULL-STACK DEVELOPER
          </p>

          <h1>
            BUILDING
            <br />

            <span className="digital">
              DIGITAL
            </span>

            <br />

            SOLUTIONS.
          </h1>

          <p className="description">
            I'm Brahmya B Anand, a BCA graduate and developer
            passionate about building modern websites,
            applications and meaningful digital experiences.
          </p>

          <div className="buttons">

            <a
              href="#work"
              className="button primary"
            >
              View My Work ↗
            </a>

            <a
              href="/resume.pdf"
              className="button secondary"
            >
              View Resume ↗
            </a>

          </div>

        </div>


        {/* ==================================
            3D GLOBE
        ================================== */}

        <div className="three-container">

          <Canvas
            camera={{
              position: [0, 0, 6],
              fov: 45,
            }}
            dpr={[1, 2]}
          >

            <Scene mouse={mouse} />

          </Canvas>

          <div className="three-hint">
            MOVE YOUR CURSOR
          </div>

        </div>

      </section>


      {/* ==================================
          ABOUT
      ================================== */}

      <section
        id="about"
        className="section scroll-section"
      >

        <div className="number">
          
        </div>

        <div className="content">

          <p className="label">
            ABOUT ME
          </p>

          <h2>
            Developer focused on
            <span>
              {" "}building for the web.
            </span>
          </h2>

          <div className="two-column">

            <p>
              I'm Brahmya B Anand, a BCA graduate
              from Kerala with a strong interest in
              software development and web technologies.
            </p>

            <p>
              I enjoy turning ideas into practical
              digital solutions by combining programming,
              problem-solving and clean interface design.
            </p>

          </div>

        </div>

      </section>


      {/* ==================================
          WORK
      ================================== */}

      <section
        id="work"
        className="section scroll-section"
      >

        <div className="number">
          
        </div>

        <div className="content">

          <p className="label">
            SELECTED PROJECTS
          </p>

          <h2>
            Projects I've
            <span>
              {" "}worked on.
            </span>
          </h2>

          <div className="projects">

            <div className="project">

              <span>
                01
              </span>

              <div>

                <h3>
                  KindConnect
                </h3>

                <p>
                  A donation and volunteer management
                  platform designed to connect donors,
                  recipients and volunteers.
                </p>

                <small>
                  Django · Python · SQLite3 · HTML · CSS
                </small>

              </div>

              <b>
                ↗
              </b>

            </div>


            <div className="project">

              <span>
                02
              </span>

              <div>

                <h3>
                  Job Portal
                </h3>

                <p>
                  A full-stack job portal that connects
                  job seekers with employers and provides
                  an easy way to manage job opportunities.
                </p>

                <small>
                  PHP · MySQL · HTML · CSS
                </small>

              </div>

              <b>
                ↗
              </b>

            </div>


            <div className="project">

              <span>
                03
              </span>

              <div>

                <h3>
                  Interactive 3D Portfolio
                </h3>

                <p>
                  A modern developer portfolio featuring
                  interactive 3D graphics, animations and
                  responsive web design.
                </p>

                <small>
                  React · Three.js · WebGL
                </small>

              </div>

              <b>
                ↗
              </b>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================
          SKILLS
      ================================== */}

      <section
        id="skills"
        className="section scroll-section"
      >

        <div className="number">
          
        </div>

        <div className="content">

          <p className="label">
            TECHNICAL SKILLS
          </p>

          <h2>
            Tools and technologies
            <span>
              {" "}I use.
            </span>
          </h2>

          <div className="skills">

            <div>

              <span>
                01
              </span>

              <h3>
                Frontend
              </h3>

              <p>
                HTML · CSS · JavaScript · React
              </p>

            </div>


            <div>

              <span>
                02
              </span>

              <h3>
                Backend
              </h3>

              <p>
                Python · Django · PHP
              </p>

            </div>


            <div>

              <span>
                03
              </span>

              <h3>
                Programming
              </h3>

              <p>
                C · C++ · Java · Python
              </p>

            </div>


            <div>

              <span>
                04
              </span>

              <h3>
                Database
              </h3>

              <p>
                MySQL · SQLite3
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================
          RESUME
      ================================== */}

      <section
        id="resume"
        className="resume-section scroll-section"
      >

        <div>

          <p className="label">
            MY RESUME
          </p>

          <h2>
            Want to know
            <span>
              {" "}more about me?
            </span>
          </h2>

          <p>
            View my resume for my education,
            technical skills, projects and experience.
          </p>

          <div className="resume-buttons">

          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>

            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Brahmya_B_Anand_Resume.pdf"
              className="button secondary"
            >
              Download Resume ↓
            </a>

          </div>

        </div>

      </section>


      {/* ==================================
          CONTACT
      ================================== */}

      <section
        id="contact"
        className="contact scroll-section"
      >

 

        <h2>
          Let's build
          <br />
          something
          <span>
            {" "}meaningful.
          </span>
        </h2>

        <p>
          I'm open to opportunities, collaborations
          and interesting projects. Feel free to
          get in touch.
        </p>

        <a
          href="mailto:brahmya1233@email.com"
          className="contact-button"
        >
          Let's Talk ↗
        </a>

      </section>


      {/* ==================================
          FOOTER
      ================================== */}

      <footer className="scroll-section">

        <span>
          © 2026 BRAHMYA B ANAND
        </span>

        <span>
          REACT · THREE.JS
        </span>

        <span>
          KERALA, INDIA
        </span>

      </footer>

    </div>
  );
}

export default App;