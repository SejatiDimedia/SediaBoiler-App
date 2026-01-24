import { config } from 'dotenv';
config({ path: '.env.local' });
import postgres from 'postgres';

const templateCode = `// Mock Lucide icons for preview compatibility
const Menu = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowRight = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExternalLink = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const Mail = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapPin = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Phone = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Github = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Linkedin = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Twitter = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Dribbble = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm7.938 5.563c1.438 1.75 2.313 3.969 2.313 6.375h-.063c-2.563-.438-5-.5-7.313-.188.188-.438.375-.875.5-1.313 2-.625 3.688-1.563 4.563-4.875zm-1.126-.938c-.75 2.938-2.25 3.813-4.063 4.375-.813-1.5-1.75-2.938-2.813-4.313 1.563-.438 3.188-.563 4.813-.438.75.063 1.438.188 2.063.375zM12 1.875c1.5 0 2.938.313 4.25.875-1.125 1.438-2.125 2.938-3 4.5-2.188-.563-4.563-.875-7.063-.875-.375 0-.75 0-1.125.063C5.875 3.875 8.75 1.875 12 1.875zM3.938 8.313c.438 0 .875-.063 1.313-.063 2.688 0 5.188.313 7.5.938-.188.438-.375.875-.563 1.313-2.813.563-5.188 1.75-7.063 3.438-1.313-1.625-2.125-3.625-2.25-5.813.375.063.75.125 1.063.188zm.375 7.5c1.75-1.688 4-2.813 6.688-3.375.188.438.375.875.5 1.313-3.063 1.125-5.625 2.875-7.688 5.125-.313-.438-.563-.938-.75-1.438.375-.563.813-1.125 1.25-1.625zm4.5 5.938c-1.875-.5-3.5-1.5-4.813-2.813 2-2.188 4.438-3.875 7.375-4.938.563 1.438.938 2.938 1.188 4.5-.25.063-.5.125-.75.188-1 .313-2 .688-3 1.063zm5-.063c-.25-1.5-.625-2.938-1.125-4.375 2.188-.25 4.438-.188 6.813.25-.313 1.875-1.188 3.5-2.438 4.813-1 .25-2.125.313-3.25.313v-1z"/>
  </svg>
);

export default function LandingPortfolioAgency() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tighter">
            <span className="text-white">Studio</span>
            <span className="text-violet-500">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 px-5 py-2.5 rounded-full transition-all">
              Let's Talk
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/5 p-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 text-slate-300 hover:text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full mt-4 py-3 bg-violet-600 text-white rounded-lg font-medium">
            Let's Talk
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl">
          <p className="text-violet-400 font-medium mb-4 tracking-wide uppercase text-sm">
            Creative Digital Agency
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            We craft digital
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              experiences that matter
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Transform your brand with stunning designs, seamless development, and strategic solutions that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-full hover:bg-slate-100 transition-colors">
              View Our Work
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/5 transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      number: "01",
      title: "Brand Strategy",
      description: "We build compelling brand narratives that resonate with your audience and set you apart from competitors."
    },
    {
      number: "02",
      title: "Web Design",
      description: "Beautiful, responsive websites designed to convert visitors into customers."
    },
    {
      number: "03",
      title: "Development",
      description: "Clean, scalable code built with modern technologies for optimal performance."
    },
    {
      number: "04",
      title: "Digital Marketing",
      description: "Data-driven strategies to grow your online presence and reach your target audience."
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">What We Do</p>
          <h2 className="text-4xl lg:text-5xl font-bold">Our Services</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.number}
              className="group p-8 border border-white/10 rounded-2xl hover:border-violet-500/50 hover:bg-white/5 transition-all cursor-pointer"
            >
              <span className="text-5xl font-bold text-white/10 group-hover:text-violet-500/30 transition-colors">
                {service.number}
              </span>
              <h3 className="text-2xl font-bold mt-4 mb-3">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    {
      title: "Fintech Dashboard",
      category: "Web App",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    },
    {
      title: "E-commerce Redesign",
      category: "Website",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
      title: "Brand Identity",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop"
    },
    {
      title: "Mobile Banking",
      category: "Mobile App",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">Portfolio</p>
            <h2 className="text-4xl lg:text-5xl font-bold">Selected Work</h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mt-4 md:mt-0 transition-colors">
            View All Projects <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-violet-400 text-sm font-medium">{project.category}</span>
                <h3 className="text-2xl font-bold mt-1 flex items-center gap-2">
                  {project.title}
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { value: "150+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
    { value: "8+", label: "Years Experience" },
    { value: "15", label: "Team Members" },
  ];

  return (
    <section id="about" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">About Us</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              We're a team of creative problem solvers
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Founded in 2016, we've grown from a small design studio into a full-service digital agency. We believe in the power of design to transform businesses and create meaningful connections with audiences.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-violet-600 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">Contact</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's work together</h2>
          <p className="text-slate-400 text-lg mb-10">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>

          <form className="space-y-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all resize-none"
            />
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Send Message
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-bold tracking-tighter">
              <span className="text-white">Studio</span>
              <span className="text-violet-500">.</span>
            </a>
            <p className="text-slate-400 mt-4 max-w-md">
              A creative digital agency crafting beautiful digital experiences for ambitious brands worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Dribbble className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@studio.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-500 text-sm">
          © 2026 Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}`;

async function main() {
    const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
    try {
        // Check if already exists
        const existing = await sql`
            SELECT id FROM components WHERE slug = 'landing-portfolio-agency' LIMIT 1
        `;

        if (existing.length > 0) {
            console.log('Template already exists, updating...');
            await sql`
                UPDATE components 
                SET code = ${templateCode}, updated_at = NOW()
                WHERE slug = 'landing-portfolio-agency'
            `;
        } else {
            console.log('Creating new template...');
            await sql`
                INSERT INTO components (
                    slug, name, description, category, code, is_published
                ) VALUES (
                    'landing-portfolio-agency',
                    ${JSON.stringify({ id: 'Landing Portfolio Agency', en: 'Portfolio Agency Landing' })},
                    ${JSON.stringify({ id: 'Template landing page untuk agensi kreatif dan portfolio dengan tampilan dark mode modern, Services, Portfolio Gallery, About, dan Contact Form', en: 'Landing page template for creative agency and portfolio with modern dark mode, Services, Portfolio Gallery, About, and Contact Form' })},
                    'landing-page',
                    ${templateCode},
                    'true'
                )
            `;
        }

        console.log('Template inserted/updated successfully!');
        console.log('Template length:', templateCode.length, 'characters');

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await sql.end();
    }
}

main();
