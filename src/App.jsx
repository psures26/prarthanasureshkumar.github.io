
import { useEffect, useRef, useState } from "react";
import Profile from "./Profile.jsx";
import {
  Home,
  User,
  Code as CodeIcon,
  FileText,
  Folder,
  Mail,
  Linkedin,
  Phone,
  Code2,
  Database,
  Cloud,
  Wrench,
  Monitor,
  Workflow,
} from "lucide-react";

/** Typing effect for hero headline */
function useTypeLoop(strings, speed = 90, pause = 1200) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [dir, setDir] = useState("fwd"); // "fwd" | "back"
  const t = useRef(null);

  useEffect(() => {
    const current = strings[i % strings.length];
    const doneFwd = text === current;
    const doneBack = text === "";

    if (dir === "fwd" && doneFwd) {
      t.current = window.setTimeout(() => setDir("back"), pause);
      return () => t.current && clearTimeout(t.current);
    }
    if (dir === "back" && doneBack) {
      setDir("fwd");
      setI((v) => (v + 1) % strings.length);
      return;
    }
    t.current = window.setTimeout(() => {
      setText((prev) =>
        dir === "fwd"
          ? current.slice(0, prev.length + 1)
          : current.slice(0, Math.max(0, prev.length - 1))
      );
    }, speed);
    return () => t.current && clearTimeout(t.current);
  }, [text, dir, i, strings, speed, pause]);

  return text;
}

/** Shared section title + gradient underline */
function SectionTitle({ children }) {
  return (
    <div className="mb-8">
      <h3 className="text-3xl font-bold tracking-tight text-slate-900">{children}</h3>
      <div className="h-1 w-20 rounded mt-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />
    </div>
  );
}

/** Reusable card for skills */
function SkillCard({ icon: Icon, title, left, right }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0 grid place-items-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 text-emerald-600">
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
          <div className={`mt-3 grid ${right && right.length ? "grid-cols-2" : "grid-cols-1"} gap-6 text-slate-700`}>
            <ul className="list-disc pl-5 space-y-1">
              {left.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {right && right.length ? (
              <ul className="list-disc pl-5 space-y-1">
                {right.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Education sub-section (cards) */
export function EducationSection() {
  return (
    <div className="mt-4">
      <h4 className="text-xl font-semibold">Education</h4>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">2024 - 2025</div>
          <div className="font-semibold mt-1">Master of Science in Information Technology (MSIT)</div>
          <div className="italic text-slate-700">Arizona State University, Tempe, AZ, USA</div>
          <div className="text-slate-700 mt-1">GPA: 4.0</div>
          <div className="text-slate-700 mt-2 text-sm leading-6">
            <span className="font-semibold">Key Subjects:</span> Advanced Database Management Systems, Big Data, Data Visualization, Natural Language Processing
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">2018 - 2022</div>
          <div className="font-semibold mt-1">Bachelor of Engineering in Information Science & Engineering</div>
          <div className="italic text-slate-700">Vidyavardhaka College of Engineering, India</div>
          <div className="text-slate-700 mt-1">GPA: 3.62</div>
          <div className="text-slate-700 mt-2 text-sm leading-6">
            <span className="font-semibold">Key Subjects:</span> Data Structures, Object-Oriented Programming, Software Engineering, Database Systems, Algorithms, Operating Systems, Machine Learning
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {

  const typed = useTypeLoop([`I'm Prarthana Suresh Kumar`, "Software Engineer"], 90, 1200);
  const [openProject, setOpenProject] = useState(null);
  const heroBg = "url(https://img.freepik.com/free-vector/abstract-technological-background_23-2148897676.jpg?w=1380)";

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-slate-800 bg-gradient-to-b from-white to-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0c111f] text-slate-50 hidden md:flex flex-col items-center py-8 gap-4 border-r border-slate-800">
        {/* Profile Photo and Name */}
        <Profile />

        {/* Socials */}
        <div className="flex gap-4 mt-2">
          <a href="https://linkedin.com/in/prarthana-suresh-kumar-335697213" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 hover:text-cyan-400 transition-colors" />
          </a>
          <button
            onClick={() => alert('Contact Number: +1 (480) 287-6275')}
            aria-label="Phone"
            className="focus:outline-none"
            title="Show contact number"
          >
            <Phone className="w-6 h-6 hover:text-cyan-400 transition-colors" />
          </button>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=psures26@asu.edu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Send email via Gmail"
          >
            <Mail className="w-6 h-6 hover:text-cyan-400 transition-colors" />
          </a>
        </div>

        <nav className="mt-8 w-full space-y-1 text-sm">
          {[
            { label: "Home", icon: <Home className="inline w-4 h-4 mr-2" /> },
            { label: "About", icon: <User className="inline w-4 h-4 mr-2" /> },
            { label: "Skills", icon: <CodeIcon className="inline w-4 h-4 mr-2" /> },
            { label: "Resume", icon: <FileText className="inline w-4 h-4 mr-2" /> },
            { label: "Projects", icon: <Folder className="inline w-4 h-4 mr-2" /> },
            { label: "Contact", icon: <Mail className="inline w-4 h-4 mr-2" /> },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => handleScroll(label.toLowerCase())}
              className="w-full text-left px-8 py-2 flex items-center hover:bg-slate-800/60 transition-colors rounded-lg"
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto text-xs px-6 text-slate-400">© {new Date().getFullYear()} PSK</div>
      </aside>

      {/* Main */}
      <main className="md:ml-64">
  
      {/* Home */}
        <section
          id="home"
          className="relative min-h-screen grid place-items-center overflow-hidden"
          style={{ backgroundImage: 'url(/pot.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Animated SVG hexagon overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none animate-hex-lines" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{zIndex:0}}>
            <g stroke="#38bdf8" strokeWidth="2" opacity="0.18">
              <polygon points="120,60 180,100 180,180 120,220 60,180 60,100">
                <animateTransform attributeName="transform" type="translate" values="0 0; 20 10; 0 0" dur="8s" repeatCount="indefinite" />
              </polygon>
              <polygon points="320,160 380,200 380,280 320,320 260,280 260,200">
                <animateTransform attributeName="transform" type="translate" values="0 0; -15 20; 0 0" dur="10s" repeatCount="indefinite" />
              </polygon>
              <polygon points="520,260 580,300 580,380 520,420 460,380 460,300">
                <animateTransform attributeName="transform" type="translate" values="0 0; 10 -15; 0 0" dur="12s" repeatCount="indefinite" />
              </polygon>
              <polygon points="720,360 780,400 780,480 720,520 660,480 660,400">
                <animateTransform attributeName="transform" type="translate" values="0 0; -20 -10; 0 0" dur="9s" repeatCount="indefinite" />
              </polygon>
              <polygon points="920,460 980,500 980,580 920,620 860,580 860,500">
                <animateTransform attributeName="transform" type="translate" values="0 0; 15 15; 0 0" dur="11s" repeatCount="indefinite" />
              </polygon>
              <polygon points="1120,560 1180,600 1180,680 1120,720 1060,680 1060,600">
                <animateTransform attributeName="transform" type="translate" values="0 0; -10 10; 0 0" dur="13s" repeatCount="indefinite" />
              </polygon>
            </g>
          </svg>
          <div className="absolute inset-0 bg-black/60" style={{zIndex:1}} />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-teal-200/20 to-cyan-200/20" style={{zIndex:2}} />
          <div className="relative text-center px-6" style={{zIndex:3}}>
            <p className="uppercase tracking-[0.35em] text-sm text-cyan-300">Welcome</p>
            <h2 className="mt-4 text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              {typed}
              <span className="border-r-2 border-cyan-300 ml-0.5" />
            </h2>
            <p className="mt-4 text-slate-200 text-lg">Graduate student at Arizona State University</p>
            <div className="mt-10 flex justify-center">
              <button onClick={() => handleScroll("contact")} className="px-7 py-3 rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg">
                Hire Me
              </button>
            </div>
          </div>
        </section>





           {/* About */}
        <section id="about" className="bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <SectionTitle>Know Me More</SectionTitle>
            <p className="mt-2 text-2xl text-slate-900 font-extrabold flex items-center gap-2">
              <span
                role="img"
                aria-label="wave"
                className="inline-block animate-wave origin-[70%_70%]"
                style={{
                  display: "inline-block",
                  animation: "wave 2s infinite"
                }}
              >👋</span>
              Hi, I'm <span className="text-emerald-600 font-extrabold">Prarthana Suresh Kumar</span>, a Software Engineer
            </p>
            <style>
              {`
                @keyframes wave {
                  0% { transform: rotate(0deg); }
                  10% { transform: rotate(14deg); }
                  20% { transform: rotate(-8deg); }
                  30% { transform: rotate(14deg); }
                  40% { transform: rotate(-4deg); }
                  50% { transform: rotate(10deg); }
                  60% { transform: rotate(0deg); }
                  100% { transform: rotate(0deg); }
                }
              `}
            </style>
            <p className="mt-6 text-lg text-slate-700 leading-7">
              Hi, I'm Prarthana Suresh Kumar, a Software Engineer and graduate student at Arizona State University, with hands-on
              experience in building scalable software solutions and cloud-native systems. I specialize in Java, Python, and
              full-stack development using React, Spring Boot, and Node.js. I’m passionate about designing reliable, user-focused
              applications that merge innovation with practicality, and I take pride in creating software that makes technology
              accessible, efficient, and impactful.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="bg-white border-t border-slate-200/60">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <SkillCard icon={Code2} title="Programming Languages" left={["Java", "Python", "JavaScript/TypeScript"]} right={["SQL", "C"]} />
              <SkillCard icon={Database} title="Databases" left={["PostgreSQL", "MySQL"]} right={["MongoDB"]} />
              <SkillCard icon={Cloud} title="Cloud Technologies" left={["AWS"]} right={["Azure"]} />
              <SkillCard icon={Wrench} title="Development Tools" left={["Git", "Postman"]} right={["Selenium", "GitHub"]} />
              <SkillCard icon={Monitor} title="Web Development Technologies" left={["React", "Node.js", "Spring Boot"]} right={["Flask", "HTML/CSS", "REST API / JSON"]} />
              <SkillCard icon={Workflow} title="Methodologies" left={["CI/CD", "Agile", "Jira"]} right={["SDLC", "Scrum", "JUnit"]} />
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="bg-slate-50 border-t border-slate-200/60 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionTitle>Experience</SectionTitle>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
                <div className="text-sm font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full inline-block mb-3">May 2025 – Aug 2025</div>
                <h4 className="text-lg font-semibold text-slate-900">Software Developer Intern — EdPlus at ASU</h4>
                <p className="text-sm text-slate-700 mt-2 leading-6">
                  Built an AI-driven anomaly detection pipeline using AWS Bedrock and CloudWatch Logs Insights, enabling early
                  identification of performance bottlenecks and reducing incident response time by 50%. Integrated Lambda for
                  event-driven monitoring and enhanced the React dashboard with real-time anomaly visualization. Optimized Spring
                  Boot APIs with async REST and caching, improving anomaly retrieval speed by 30%.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
                <div className="text-sm font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full inline-block mb-3">Sept 2022 – Oct 2023</div>
                <h4 className="text-lg font-semibold text-slate-900">Associate Software Engineer — TEKsystems Global Services</h4>
                <p className="text-sm text-slate-700 mt-2 leading-6">
                  Developed microservices in .NET (C#) with optimized SQL queries and caching to boost response time by 35%. Built
                  Angular applications with modular components to enhance UX and workflow efficiency. Designed event-driven data
                  pipelines using Kafka and Azure Event Hubs, enabling real-time processing of millions of transactions. Automated
                  ETL pipelines with Azure Data Factory and improved test coverage to 70%.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
                <div className="text-sm font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full inline-block mb-3">Feb 2022 – Jun 2022</div>
                <h4 className="text-lg font-semibold text-slate-900">Software Engineer Intern — TEKsystems Global Services</h4>
                <p className="text-sm text-slate-700 mt-2 leading-6">
                  Developed Python API scripts to automate third-party data ingestion and improved internal reporting accuracy.
                  Enhanced C# microservices with Azure Redis and Service Bus for scalable, low-latency operations. Built a
                  monitoring dashboard in React using Azure Application Insights, providing real-time service visibility and
                  improving fault tolerance across distributed systems.
                </p>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="/PrarthanaSureshKumar_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-transform hover:-translate-y-0.5"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>

{/* Projects */}
<section id="projects" className="bg-white border-t border-slate-200/60">
  <div className="max-w-6xl mx-auto px-6 py-20">
    <SectionTitle>My Projects</SectionTitle>
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      {[
        {
          img: "/project_image_1.png",
          title: "AI-Powered Code Review Assistant",
          stack: "AWS Bedrock · LangChain · CrewAI · Pinecone · FastAPI · GitHub Actions",
          desc: "Developed an intelligent code-review assistant to address inefficiencies in manual pull-request validation. Leveraged large-language-model reasoning through AWS Bedrock and LangChain to detect logic flaws, performance bottlenecks, and security vulnerabilities in real time. Designed vector retrieval with Pinecone to reference historical code reviews and ensure contextual accuracy. Integrated seamlessly with GitHub Actions and Jenkins CI/CD pipelines, reducing review turnaround time by 50% and improving code quality consistency across teams.",
        },
        {
          img: "/project_image_2.png",
          title: "Image Recognition Platform",
          stack: "AWS EC2 · S3 · Lambda · DynamoDB · Flask · Docker",
          desc: "Engineered a scalable image-recognition service to automate visual data processing for enterprises handling millions of assets daily. Implemented an event-driven AWS architecture—S3 triggers invoking Lambda functions for AI inference, results stored in DynamoDB, and an auto-scaling Flask API layer for real-time retrieval. Deployed via Docker for portability and rapid scaling under high traffic. The solution achieved 99.3% inference uptime and processed 10K+ images monthly while maintaining cost efficiency through serverless design.",
        },
        {
          img: "/project_image_3.png",
          title: "Book Recommendation System",
          stack: "Python · NumPy · Pandas · SciPy · Collaborative Filtering · CSV",
          desc: "Built a large-scale recommendation engine to solve the challenge of personalization in digital reading platforms. Trained on 10K+ ratings across 5K books, the system applies collaborative filtering with cosine-similarity mapping to uncover latent user-preference patterns. Optimized sparse-matrix computations for rapid top-N generation and batch predictions. Produced data-driven insights that enhance engagement and retention by tailoring reading experiences at scale.",
        },
        {
          img: "/project_image_4.png",
          title: "Supermarket Sales Visualization Dashboard",
          stack: "Tableau · Python (ETL) · Excel",
          desc: "Designed an end-to-end retail analytics dashboard empowering decision-makers to identify revenue trends and optimize branch performance. Ingested and transformed 100 K+ transaction records via Python pipelines, modeled them into KPI scorecards in Tableau, and visualized sales growth, product-line profitability, and customer sentiment. Enabled business teams to reduce reporting cycles from days to minutes while uncovering actionable insights that boosted profit margins by 12% per branch.",
        },
        {
          img: "/project_image_5.png",
          title: "Intelligent IT Help Desk Ticket Tracking System",
          stack: "SQL Server · ER Modeling · Stored Procedures · Triggers · Power BI",
          desc: "Developed a data-driven IT ticketing platform addressing slow incident resolution and lack of transparency in enterprise support operations. Modeled 10+ relational entities linking tickets, departments, and SLA metrics with cascading triggers for automated assignment and escalation. Embedded analytics via Power BI to monitor workload, agent performance, and SLA breaches in real time. The system reduced average resolution time by 65% and established a foundation for predictive, AI-assisted ticket routing.",
        },
      ].map((proj, idx) => (
        <div key={proj.title} className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow hover:shadow-lg transition-shadow group">
          {/* Image with overlay title and hover effect */}
          <button
            className="block w-full h-56 relative focus:outline-none"
            onClick={() => setOpenProject(idx)}
            aria-label={`Show details for ${proj.title}`}
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <img
              src={proj.img}
              alt={proj.title}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:bg-black/60 transition">
              <span className="text-white text-xl font-bold text-center px-4 drop-shadow-lg transition-all duration-300 group-hover:scale-110">
                {proj.title}
              </span>
            </div>
          </button>
          {/* Tech stack below image */}
          <div className="p-4">
            <div className="text-xs text-slate-500 mb-1">{proj.stack}</div>
          </div>
          {/* Modal/Popup for description */}
          {openProject === idx && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              onClick={() => setOpenProject(null)}
            >
              <div
                className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-3 text-slate-400 hover:text-slate-700 text-2xl"
                  onClick={() => setOpenProject(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <div className="font-bold text-lg mb-2">{proj.title}</div>
                <div className="text-xs text-slate-500 mb-3">{proj.stack}</div>
                <div className="text-slate-700 text-sm">{proj.desc}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Contact */}
        <section id="contact" className="bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <SectionTitle>Get in Touch</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div className="space-y-3 text-slate-700">
                <div className="flex items-center gap-3"><Phone className="w-5 h-5" /> +1 (480) 287-6275</div>
                <div className="flex items-center gap-3"><Mail className="w-5 h-5" /> psures26@asu.edu</div>
                <div className="flex items-center gap-3"><Linkedin className="w-5 h-5" /> linkedin.com/in/prarthana-suresh-kumar-335697213</div>
              </div>
              <form 
                className="space-y-4"
                action="https://formspree.io/f/mnngbbda"
                method="POST"
              >
                <div className="grid grid-cols-2 gap-3">
                  <input name="name" required className="border rounded-xl px-3 py-2" placeholder="Name" />
                  <input name="email" type="email" required className="border rounded-xl px-3 py-2" placeholder="Email" />
                </div>
                <textarea name="message" required className="border rounded-xl px-3 py-2 w-full h-32" placeholder="Message" />
                <button type="submit" className="px-5 py-3 rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}