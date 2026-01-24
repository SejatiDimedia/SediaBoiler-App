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

const Star = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Zap = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const Heart = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const Sparkles = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
  </svg>
);

const Check = ({ className = '' }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function LandingNeubrutalism() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFBEB] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF6B6B] border-4 border-black rounded-lg rotate-6 flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tight">Zonky</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {['Features', 'Pricing', 'About', 'Blog'].map((item) => (
              <a
                key={item}
                href={\`#\${item.toLowerCase()}\`}
                className="px-4 py-2 text-lg font-bold hover:bg-[#FFE566] hover:border-2 hover:border-black rounded-lg transition-all"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-5 py-2.5 text-lg font-bold border-4 border-black rounded-xl bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              Log In
            </button>
            <button className="px-5 py-2.5 text-lg font-bold border-4 border-black rounded-xl bg-[#A388EE] hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              Get Started 🚀
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FFE566] border-t-4 border-black p-6">
          {['Features', 'Pricing', 'About', 'Blog'].map((item) => (
            <a
              key={item}
              href={\`#\${item.toLowerCase()}\`}
              className="block py-3 text-xl font-bold border-b-2 border-black/20"
            >
              {item}
            </a>
          ))}
          <button className="w-full mt-4 py-3 text-lg font-bold border-4 border-black rounded-xl bg-[#A388EE]">
            Get Started 🚀
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE566] border-4 border-black rounded-full mb-6 rotate-[-2deg]">
              <Star className="w-5 h-5 text-black" />
              <span className="font-bold">Rated #1 by nobody lol</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] mb-6">
              Build Stuff
              <span className="block text-[#FF6B6B] [-webkit-text-stroke:3px_black]">
                That Doesn't Suck
              </span>
            </h1>

            <p className="text-xl lg:text-2xl font-medium text-gray-700 mb-8 max-w-lg">
              The anti-boring toolkit for rebels who want their websites to actually look different. No more template twins! ✨
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-black border-4 border-black rounded-2xl bg-[#A388EE] hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                Start Free Trial
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-black border-4 border-black rounded-2xl bg-white hover:bg-[#FFE566] transition-colors">
                Watch Demo 🎬
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 mt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-black bg-gradient-to-br from-pink-400 to-purple-500"
                    style={{ backgroundColor: ['#FF6B6B', '#FFE566', '#A388EE', '#4ECDC4'][i - 1] }}
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-[#FFE566]" />
                  ))}
                </div>
                <p className="font-bold">420+ happy weirdos</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-[#4ECDC4] border-4 border-black rounded-3xl p-6 rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-white border-4 border-black rounded-2xl p-4 -rotate-1">
                <div className="flex gap-2 mb-4">
                  <div className="w-4 h-4 bg-[#FF6B6B] border-2 border-black rounded-full" />
                  <div className="w-4 h-4 bg-[#FFE566] border-2 border-black rounded-full" />
                  <div className="w-4 h-4 bg-[#4ECDC4] border-2 border-black rounded-full" />
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-[#A388EE] border-2 border-black rounded-lg" />
                  <div className="h-8 bg-[#FFE566] border-2 border-black rounded-lg w-3/4" />
                  <div className="h-8 bg-[#FF6B6B] border-2 border-black rounded-lg w-1/2" />
                  <div className="h-24 bg-[#4ECDC4] border-2 border-black rounded-lg" />
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#FFE566] border-4 border-black rounded-xl rotate-12 flex items-center justify-center text-3xl">
              🎨
            </div>
            <div className="absolute -bottom-4 -left-6 w-20 h-20 bg-[#FF6B6B] border-4 border-black rounded-full flex items-center justify-center text-3xl animate-bounce">
              🔥
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: "🎯",
      title: "Zero BS Design",
      description: "No more generic templates. Every element screams personality.",
      color: "#FF6B6B"
    },
    {
      icon: "⚡",
      title: "Stupid Fast",
      description: "Loads faster than your attention span. We promise.",
      color: "#4ECDC4"
    },
    {
      icon: "🎪",
      title: "Weird & Proud",
      description: "Stand out from the boring crowd. Be memorable.",
      color: "#A388EE"
    },
    {
      icon: "🛠️",
      title: "Actually Easy",
      description: "Your grandma could use it. Probably. No offense, grandma.",
      color: "#FFE566"
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#4ECDC4] border-y-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black mb-4">
            Why We're <span className="bg-[#FFE566] px-2 -rotate-1 inline-block border-4 border-black">Different</span>
          </h2>
          <p className="text-xl font-medium max-w-2xl mx-auto">
            Spoiler: We actually care about making cool stuff, not just money (okay maybe a little money)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black rounded-2xl p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              style={{ transform: \`rotate(\${index % 2 === 0 ? '-1' : '1'}deg)\` }}
            >
              <div
                className="w-16 h-16 border-4 border-black rounded-xl flex items-center justify-center text-3xl mb-4"
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Broke",
      price: "$0",
      description: "For the budget-conscious rebels",
      features: ["5 Projects", "Basic Templates", "Community Support", "Bragging Rights"],
      color: "#FFE566",
      popular: false
    },
    {
      name: "Ballin'",
      price: "$29",
      description: "For serious troublemakers",
      features: ["Unlimited Projects", "All Templates", "Priority Support", "Custom Domains", "Analytics", "Remove Watermark"],
      color: "#A388EE",
      popular: true
    },
    {
      name: "Bougie",
      price: "$99",
      description: "For the fancy pants",
      features: ["Everything in Ballin'", "White Label", "API Access", "Personal Account Manager", "First-born child priority"],
      color: "#4ECDC4",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black mb-4">
            Simple <span className="text-[#FF6B6B]">Pricing</span>
          </h2>
          <p className="text-xl font-medium text-gray-600">No hidden fees. No BS. Pinky promise. 🤙</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={\`relative bg-white border-4 border-black rounded-3xl p-8 \${plan.popular ? 'scale-105' : ''}\`}
              style={{
                boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
                transform: \`rotate(\${plan.popular ? 0 : index === 0 ? -2 : 2}deg)\`
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF6B6B] border-4 border-black rounded-full font-black text-sm">
                  MOST POPULAR 🔥
                </div>
              )}
              <div
                className="w-full py-3 border-4 border-black rounded-xl text-center font-black text-xl mb-6"
                style={{ backgroundColor: plan.color }}
              >
                {plan.name}
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="text-gray-500 font-bold">/month</span>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#4ECDC4] border-2 border-black rounded-md flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-4 text-lg font-black border-4 border-black rounded-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                style={{ backgroundColor: plan.color }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      text: "Finally, a template that doesn't make me want to gouge my eyes out. 10/10 would recommend.",
      author: "Sarah K.",
      role: "Startup Founder",
      avatar: "#FF6B6B"
    },
    {
      text: "My competitors are so jealous of my site now. They keep asking where I got it. I just smile.",
      author: "Mike D.",
      role: "Agency Owner",
      avatar: "#A388EE"
    },
    {
      text: "Thought 'anti-mainstream' was just marketing BS. It's not. This is genuinely different.",
      author: "Lisa M.",
      role: "Designer",
      avatar: "#4ECDC4"
    }
  ];

  return (
    <section className="py-20 bg-[#A388EE] border-y-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black mb-4">
            Don't Trust Us? <span className="inline-block rotate-3">🤔</span>
          </h2>
          <p className="text-xl font-medium">Trust these random strangers on the internet instead</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: \`rotate(\${index % 2 === 0 ? '-1' : '1'}deg)\` }}
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-[#FFE566]" />
                ))}
              </div>
              <p className="text-lg font-medium mb-6">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 border-4 border-black rounded-full flex items-center justify-center font-black text-white"
                  style={{ backgroundColor: testimonial.avatar }}
                >
                  {testimonial.author[0]}
                </div>
                <div>
                  <p className="font-black">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FF6B6B] border-4 border-black rounded-3xl p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Ready to Stop Being Boring?
          </h2>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Join the rebellion. Build something that actually makes people say "woah". 
            Life's too short for bland websites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-black border-4 border-black rounded-2xl bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              Start Building Now
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-6 font-bold text-sm">No credit card needed. We're not that kind of company.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#FF6B6B] border-4 border-black rounded-lg rotate-6 flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-black tracking-tight">Zonky</span>
            </div>
            <p className="text-lg font-medium text-gray-600 max-w-sm">
              Making the internet weird again, one website at a time. 🌈
            </p>
          </div>

          <div>
            <h4 className="font-black text-lg mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Templates', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-medium text-gray-600 hover:text-black">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-medium text-gray-600 hover:text-black">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold text-gray-600">© 2026 Zonky. All rights reserved. Be weird. 🤘</p>
          <div className="flex gap-4">
            {['🐦', '📸', '💼', '🎵'].map((emoji, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-[#FFE566] border-4 border-black rounded-lg flex items-center justify-center text-lg hover:rotate-12 transition-transform"
              >
                {emoji}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}`;

async function main() {
    const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
    try {
        const existing = await sql`
            SELECT id FROM components WHERE slug = 'landing-neubrutalism' LIMIT 1
        `;

        if (existing.length > 0) {
            console.log('Template already exists, updating...');
            await sql`
                UPDATE components 
                SET code = ${templateCode}, updated_at = NOW()
                WHERE slug = 'landing-neubrutalism'
            `;
        } else {
            console.log('Creating new template...');
            await sql`
                INSERT INTO components (
                    slug, name, description, category, code, is_published
                ) VALUES (
                    'landing-neubrutalism',
                    ${JSON.stringify({ id: 'Landing Neubrutalism', en: 'Neubrutalism Landing' })},
                    ${JSON.stringify({ id: 'Template landing page dengan gaya Neubrutalism yang anti-mainstream - Bold borders, warna cerah, shadow tebal, dan vibes playful yang bikin beda dari yang lain', en: 'Neubrutalism style landing page template - Anti-mainstream with bold borders, vibrant colors, chunky shadows, and playful vibes that stand out from the crowd' })},
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
