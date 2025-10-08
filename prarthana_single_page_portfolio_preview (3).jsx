import { useEffect, useRef, useState, ReactNode } from "react";
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
function useTypeLoop(strings: string[], speed = 90, pause = 1200) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const t = useRef<number | null>(null);

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
      setText((prev) => (dir === "fwd" ? current.slice(0, prev.length + 1) : current.slice(0, Math.max(0, prev.length - 1))));
    }, speed);
    return () => t.current && clearTimeout(t.current);
  }, [text, dir, i, strings, speed, pause]);

  return text;
}

/** Shared section title + gradient underline */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-3xl font-bold tracking-tight text-slate-900">{children}</h3>
      <div className="h-1 w-20 rounded mt-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />
    </div>
  );
}

/** Reusable card for skills */
function SkillCard({
  icon: Icon,
  title,
  left,
  right,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  left: string[];
  right?: string[];
}) {
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
  const [hasPhoto, setHasPhoto] = useState(true);
  const heroBg = "url(https://img.freepik.com/free-vector/abstract-technological-background_23-2148897676.jpg?w=1380)";

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-slate-800 bg-gradient-to-b from-white to-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0c111f] text-slate-50 hidden md:flex flex-col items-center py-8 gap-4 border-r border-slate-800">
        {/* Photo */}
        {hasPhoto ? (
          <img
            src="/profile.jpg"
            alt="Prarthana Suresh Kumar"
            onError={() => setHasPhoto(false)}
            className="w-48 h-48 rounded-full object-cover ring-4 ring-cyan-400"
          />
        ) : (
          <div className="w-48 h-48 rounded-full grid place-items-center bg-slate-800/60 ring-4 ring-dashed ring-cyan-400 text-sm text-slate-300 px-4 text-center">
            Add your photo as <span className="font-semibold text-white">profile.jpg</span>
          </div>
        )}
        <h1 className="text-center text-base font-semibold px-4 tracking-wide">Prarthana Suresh Kumar</h1>

        {/* Socials */}
        <div className="flex gap-4 mt-2">
          <a href="https://linkedin.com/in/prarthana-suresh-kumar-335697213" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 hover:text-cyan-400 transition-colors" />
          </a>
          <a href="tel:+14802876275" aria-label="Phone">
            <Phone className="w-6 h-6 hover:text-cyan-400 transition-colors" />
          </a>
          <a href="mailto:psures26@asu.edu" aria-label="Email">
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
            <button key={label} onClick={() => handleScroll(label.toLowerCase())} className="w-full text-left px-8 py-2 flex items-center hover:bg-slate-800/60 transition-colors rounded-lg">
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
          className="relative min-h-screen grid place-items-center"
          style={{ backgroundImage: heroBg, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-teal-200/20 to-cyan-200/20" />
          <div className="relative text-center px-6">
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
            <p className="mt-2 text-2xl text-slate-900">
              <span role="img" aria-label="wave">👋</span> Hi, I'm <span className="text-emerald-600 font-semibold">Prarthana Suresh Kumar</span>, a Software Engineer
            </p>
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

        {/* Resume (Education + Experience placeholder) */}
         {/* Experience Section */}
      <section id="experience" className="bg-slate-50 border-t border-slate-200/60 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Experience</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {/* EdPlus at ASU */}
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

            {/* Associate Software Engineer */}
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

            {/* Software Engineer Intern */}
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

          {/* Download Resume */}
          <div className="mt-12 flex justify-center">
            <a
              href="PrarthanaSureshKumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-transform hover:-translate-y-0.5"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>

        {/* Projects (placeholders) */}
        <section id="projects" className="bg-white border-t border-slate-200/60">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <SectionTitle>My Projects</SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {["Image Recognition Platform", "Book Recommendation System (placeholder)", "Supermarket Sales Dashboard (placeholder)"].map((title) => (
                <div key={title} className="rounded-xl overflow-hidden text-left border border-slate-200 bg-white shadow">
                  <div className="h-40 w-full bg-slate-100 flex items-center justify-center text-slate-500">Project Image</div>
                  <div className="p-4">
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-slate-600 mt-1">Click to add details later</div>
                  </div>
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
                <div className="flex items-center gap-3"><Phone className="w-5 h-5" /> +1 (480) 287‑6275</div>
                <div className="flex items-center gap-3"><Mail className="w-5 h-5" /> psures26@asu.edu</div>
                <div className="flex items-center gap-3"><Linkedin className="w-5 h-5" /> linkedin.com/in/prarthana-suresh-kumar-335697213</div>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input className="border rounded-xl px-3 py-2" placeholder="Name" />
                  <input className="border rounded-xl px-3 py-2" placeholder="Email" />
                </div>
                <textarea className="border rounded-xl px-3 py-2 w-full h-32" placeholder="Message" />
                <button type="button" className="px-5 py-3 rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
