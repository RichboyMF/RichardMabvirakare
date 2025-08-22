import type { ExperienceItem, ProjectItem, SocialLink } from "./types";
import { GithubIcon, LinkedinIcon, MailIcon } from "./components/Icons";

export const STUDENT_NAME = "Richard Mabvirakare";
export const STUDENT_HEADLINE =
  "Final Year Electrical Engineering Student at the University of Cape Town";

export const ABOUT_ME_TEXT = `I am a final year Electrical Engineering student at the University of Cape Town with a passion for bridging theoretical knowledge with practical solutions. My academic journey has been enriched by hands-on experience in power systems, control systems, software development, and engineering project management. Through internships at Kudon Engineering Services, I've gained diverse experience ranging from power station operations to developing full-stack mobile applications that automate business processes, demonstrating my ability to work across multiple engineering disciplines. As a top 10 finalist in the African Rover Challenge, I've proven my capabilities in robotics and autonomous systems design. My diverse skill set spans from MATLAB and Simulink for control systems to modern web technologies for application development. I thrive in collaborative environments where I can apply creative problem-solving to tackle engineering challenges that make a meaningful impact.`;

export const SKILLS = [
  "Python",
  "Dart",
  "Java",
  "JavaScript",
  "HTML",
  "CSS",
  "MATLAB",
  "Simulink",
  "DIgSILENT PowerFactory",
  "Flutter",
  "Full-Stack Development",
  "Mobile App Development",
  "Project Management",
  "Technical Report Writing",
  "Circuit Design",
  "Control Systems",
  "Power Systems Analysis",
  "Robotics",
  "Arduino",
  "MS Office Suite",
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Vocational Intern",
    company: "Kudon Engineering Services",
    duration: "Nov 2024 - Jan 2025",
    description: [
      "Conducted requirements analysis and user interface design for mobile application development.",
      "Developed a full-stack mobile software application for automating vehicle inspection processes.",
      "Implemented backend development, testing, and deployment of business automation solutions.",
      "Gained practical experience in the software development lifecycle from concept to deployment.",
    ],
    detailedDescription:
      "During my second internship at Kudon Engineering Services, I focused on software development and mobile application creation. I worked on a comprehensive vehicle inspection automation system that streamlined the company's inspection processes. This involved full-stack development using Flutter and Dart, implementing both frontend user interfaces and backend business logic. The project required close collaboration with stakeholders to understand requirements and deliver a solution that met their specific needs.",
    liveUrl: "https://youtu.be/UQKRiSOf0wg",
    media: [
      {
        type: "image",
        src: "/media/experience/NovJan_Vocational_Intern_KES_img1.jpg",
        alt: "Inspector writing on a clipboard during a vehicle inspection.",
        caption:
          "Automating the traditional pen-and-paper vehicle inspection process.",
      },
      {
        type: "image",
        src: "/media/experience/NovJan_Vocational_Intern_KES_img2.png",
        alt: "Login screen for the Kudon Engineering Services vehicle inspection mobile app.",
        caption:
          "The login interface for the custom-built vehicle inspection application.",
      },
    ],
  },
  {
    role: "Vocational Intern",
    company: "Kudon Engineering Services",
    duration: "June 2024 - July 2024",
    description: [
      "Gained hands-on experience in electrical maintenance and technical report writing.",
      "Worked on fuel oil burner maintenance for a coal power station.",
      "Developed foundational skills in project management and assisted in organizing the CV database.",
      "Participated in app development and observed control panel design for water pump systems.",
    ],
    detailedDescription:
      "My first internship at Kudon Engineering Services provided me with valuable hands-on experience in electrical maintenance and power station operations. I worked on fuel oil burner maintenance for a coal power station, gaining practical knowledge of industrial electrical systems. I also participated in control panel design for water pump systems and assisted with project management tasks. This experience gave me a solid foundation in both technical and administrative aspects of engineering work.",
    media: [
      {
        type: "image",
        src: "/media/experience/JuneJuly_Vocational_Intern_KES_img1.jpg",
        alt: "Electrical control panel interior showing organized wiring",
        caption:
          "Electrical control panel with organized wiring and components",
      },
      {
        type: "image",
        src: "/media/experience/JuneJuly_Vocational_Intern_KES_img2.jpg",
        alt: "Control panel with colorful buttons and switches",
        caption: "Training control panel with various switches and indicators",
      },
      {
        type: "image",
        src: "/media/experience/JuneJuly_Vocational_Intern_KES_img3.jpg",
        alt: "Cooling towers at power plant with steam",
        caption: "Cooling towers at the power plant facility",
      },
      {
        type: "image",
        src: "/media/experience/JuneJuly_Vocational_Intern_KES_img4.jpg",
        alt: "Large industrial turbine hall interior",
        caption: "Turbine hall showing massive industrial machinery",
      },
    ],
  },
  {
    role: "Practical Training Workshop",
    company: "CPUT",
    duration: "Nov 2022",
    description: [
      "Participated in an intensive training workshop for hands-on skills development for Engineering students.",
      "Engaged in daily workshops focusing on practical applications of engineering concepts.",
    ],
    detailedDescription:
      "I participated in an intensive practical training workshop at CPUT designed specifically for engineering students. The workshop focused on developing hands-on skills and applying theoretical engineering concepts in practical scenarios. We worked with various electrical and mechanical systems, learning about circuit design, component testing, and system integration. This experience was crucial in bridging the gap between classroom learning and real-world engineering applications.",
    media: [
      {
        type: "image",
        src: "/media/experience/Practical_Training_Workshop_img1.jpg",
        alt: "Person working on electrical circuit board with measuring devices",
        caption: "Working with electrical circuits and measurement equipment",
      },
      {
        type: "image",
        src: "/media/experience/Practical_Training_Workshop_img2.png",
        alt: "Demonstration of pneumatic training board",
        caption: "Demonstrating pneumatic system components and operation",
      },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "UI Design Concepts Editor (CS50x Final Project)",
    description:
      "A full-stack development tool built for Harvard's CS50x. It provides a live-editing environment with a code editor and real-time preview pane to streamline React component development and testing.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "TypeScript",
      "Full-Stack",
      "DevTools",
      "CS50",
    ],
    imageUrl: "https://picsum.photos/seed/cs50-editor/400/300",
    githubUrl: "https://github.com/me50/RichardM-0",
    liveUrl: "https://youtu.be/fGAjEeMaEHY",
    detailedDescription:
      "This was my final project for Harvard's CS50x, born from a need to efficiently test AI-generated code and experiment with React libraries. It's a specialized development environment featuring an Express.js backend that handles file system operations, and a React frontend that provides a powerful user interface. Key features include a Monaco-based code editor for syntax highlighting and auto-completion, a component registry, and a real-time preview that updates as you type. I tackled several technical challenges, including implementing atomic file writes to prevent race conditions and optimizing the system for performance. The project demonstrates a comprehensive understanding of full-stack development, from API design to front-end state management.",
    media: [
      {
        type: "image",
        src: "/media/projects/cs50_img.jpg",
        alt: "Harvard University crest over a background of colorful code on a dark screen.",
        caption:
          "Final Project for Harvard's CS50x: Introduction to Computer Science.",
      },
      {
        type: "image",
        src: "/media/projects/cs50_SnapshotFromDemo_img.png",
        alt: "Screenshot of the Design Editor application, showing a file tree and an open code editor with a React component.",
        caption:
          "A snapshot of the live development environment in action during the video demo.",
      },
    ],
  },
  {
    title: "Autonomous Maze-Solving Robot (Micro-mouse)",
    description:
      "Engineered an autonomous robot for the University of Cape Town's Micro-mouse challenge. The project focused on designing and implementing navigation, localization, mapping, and path-optimization algorithms in MATLAB and Simulink to solve a maze in the shortest possible time.",
    tags: ["Robotics", "MATLAB", "Simulink", "Control Systems", "Pathfinding"],
    imageUrl: "https://picsum.photos/seed/micromouse/400/300",
    githubUrl: "#",
    liveUrl: "https://youtube.com/shorts/KZcsqNrwRU4?feature=share",
    detailedDescription:
      "As a core component of my final year design curriculum, this project involved the complete lifecycle of creating an autonomous maze-solving robot. Working in a pair, the project was conceptualized in four key stages: 'See' (sensor data acquisition), 'Localisation & Mapping' (building a representation of the maze), 'Optimise' (calculating the shortest path), and 'Move' (implementing motion control). My responsibilities included developing simulation models in MATLAB and Simulink to test sensor integration, control logic using Stateflow, and pathfinding algorithms. The ultimate goal was to build upon each milestone to create a robust system that could efficiently navigate an unknown maze, minimize errors, and find the optimal route upon a second run.",
    media: [
      {
        type: "image",
        src: "/media/projects/3rdYearDesign_img1.jpg",
        alt: "Early-stage micromouse prototype wiring and testing on a breadboard",
        caption: "Prototyping the motor control circuits for the micromouse.",
      },
      {
        type: "video",
        src: "/media/projects/3rdYearDesign_vid1.mp4",
        alt: "Miniature maze with small robots for testing",
        caption:
          "Simulation and testing environment for micromouse navigation algorithms.",
      },
    ],
  },
  {
    title: "African Rover Challenge",
    description:
      "Designed and built a Mars rover prototype for the African Rover Challenge. The project involved creating a small, wirelessly controlled mobile robot with an independent power source. Proud to be a top 10 finalist in this prestigious competition.",
    tags: [
      "Robotics",
      "Prototyping",
      "Wireless Control",
      "STEM",
      "Competition",
    ],
    imageUrl: "https://picsum.photos/seed/rover/400/300",
    githubUrl: "#",
    liveUrl: "https://youtu.be/-dCe-NkaN2w?si=CkhKDQGj7hbzOqxX",
    detailedDescription:
      "The African Rover Challenge was a comprehensive robotics project that tested our skills in mechanical design, electrical engineering, and software development. Our team designed and built a Mars rover prototype that could navigate challenging terrain, perform scientific tasks, and operate autonomously. The rover featured wireless control systems, independent power management, and a robust mechanical design to withstand harsh conditions. Being selected as a top 10 finalist was a significant achievement that validated our engineering approach and problem-solving capabilities.",
    media: [
      {
        type: "image",
        src: "/media/projects/Cars4MarsProfile.png",
        alt: "The 'Locked In Aliens' team rover for the Cars4Mars African Rover Challenge",
        caption:
          "Our final rover design, 'Locked In Aliens,' for the African Rover Challenge.",
      },
      {
        type: "image",
        src: "/media/projects/Cars4MarsVehicleDemoSnapShoot.png",
        alt: "The rover during a demonstration run, carrying a payload.",
        caption:
          "Rover undergoing a payload-carrying test during a demonstration.",
      },
      {
        type: "image",
        src: "/media/projects/Cars4MarsBuildingVehicle.jpg",
        alt: "Messy workbench showing the electronics and wiring for the rover build",
        caption:
          "The complex electronics and wiring setup during the rover's development phase.",
      },
    ],
  },
  {
    title: "Vehicle Inspection Automation App",
    description:
      "Developed a full-stack mobile application to automate vehicle inspection processes for Kudon Engineering Services. The solution involved requirements analysis, UI/UX design, backend development, testing, and deployment.",
    tags: [
      "Full-Stack",
      "Mobile App",
      "Dart",
      "Flutter",
      "Business Automation",
    ],
    imageUrl: "https://picsum.photos/seed/inspection-app/400/300",
    githubUrl: "#",
    liveUrl: "https://youtu.be/UQKRiSOf0wg",
    detailedDescription:
      "The Vehicle Inspection Automation App was a comprehensive full-stack development project that aimed to digitize and streamline the vehicle inspection process. I worked closely with stakeholders to understand their specific requirements and designed a user-friendly interface that could be used by field inspectors. The app included features for photo capture, checklist management, report generation, and data synchronization. The backend was built to handle data storage, user authentication, and integration with existing business systems. This project demonstrated my ability to deliver end-to-end solutions that address real business needs.",
    media: [
      {
        type: "image",
        src: "/media/experience/NovJan_Vocational_Intern_KES_img1.jpg",
        alt: "Inspector writing on a clipboard during a vehicle inspection.",
        caption:
          "Automating the traditional pen-and-paper vehicle inspection process.",
      },
      {
        type: "image",
        src: "/media/experience/NovJan_Vocational_Intern_KES_img2.png",
        alt: "Login screen for the Kudon Engineering Services vehicle inspection mobile app.",
        caption:
          "The login interface for the custom-built vehicle inspection application.",
      },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Email",
    url: "mailto:richardmabvirakare@email.com",
    icon: MailIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/richardmabvirakare-190995225/",
    icon: LinkedinIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/RichboyMF",
    icon: GithubIcon,
  },
];
