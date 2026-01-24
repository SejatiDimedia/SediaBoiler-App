// Sample component data for the library
// In production, this would come from a database

export interface ComponentData {
  slug: string;
  name: { id: string; en: string };
  description: { id: string; en: string };
  category: 'navbar' | 'hero' | 'features' | 'pricing' | 'footer' | 'cta' | 'testimonial' | 'faq' | 'contact' | 'blog' | 'gallery' | 'team' | 'stats' | 'sidebar' | 'modal' | 'card' | 'form' | 'table' | 'chart' | 'landing-page' | 'other';
  code: string;
}

export const components: ComponentData[] = [
  // NAVBAR COMPONENTS
  {
    slug: 'navbar-modern',
    name: { id: 'Navbar Modern', en: 'Modern Navbar' },
    description: {
      id: 'Navbar minimalis dengan efek blur saat scroll dan menu mobile responsive',
      en: 'Minimalist navbar with scroll blur effect and responsive mobile menu'
    },
    category: 'navbar',
    code: `export function NavbarModern() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={\`fixed top-0 w-full z-50 transition-all duration-300 \${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }\`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold text-gray-900">
            Brand<span className="text-blue-600">Name</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">Login</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
          
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}`,
  },
  {
    slug: 'navbar-sticky',
    name: { id: 'Navbar Sticky', en: 'Sticky Navbar' },
    description: {
      id: 'Navbar dengan posisi sticky dan border bawah halus',
      en: 'Navbar with sticky position and subtle bottom border'
    },
    category: 'navbar',
    code: `export function NavbarSticky() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 flex h-14 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <span>StickyNav</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="font-medium text-gray-900">Home</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Products</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Solutions</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Resources</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
            Sign in
          </button>
          <button className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}`,
  },
  {
    slug: 'navbar-transparent',
    name: { id: 'Navbar Transparan', en: 'Transparent Navbar' },
    description: {
      id: 'Navbar transparan cocok untuk hero section dengan gambar latar',
      en: 'Transparent navbar perfect for hero sections with background images'
    },
    category: 'navbar',
    code: `export function NavbarTransparent() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-bold text-white">
            TransparentNav
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white/80 hover:text-white transition">Home</a>
            <a href="#" className="text-white/80 hover:text-white transition">About</a>
            <a href="#" className="text-white/80 hover:text-white transition">Services</a>
            <a href="#" className="text-white/80 hover:text-white transition">Contact</a>
          </div>
          
          <button className="px-5 py-2.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}`,
  },

  // HERO COMPONENTS
  {
    slug: 'hero-centered',
    name: { id: 'Hero Tengah', en: 'Centered Hero' },
    description: {
      id: 'Hero section dengan teks terpusat dan dua tombol CTA',
      en: 'Hero section with centered text and two CTA buttons'
    },
    category: 'hero',
    code: `export function HeroCentered() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          🚀 Introducing v2.0
        </div>
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
          Build amazing products
          <br />
          <span className="text-blue-600">faster than ever</span>
        </h1>
        
        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
          Empower your team with the tools they need to create, collaborate, 
          and ship products that users love.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition">
            Learn More →
          </button>
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    slug: 'hero-split',
    name: { id: 'Hero Split', en: 'Split Hero' },
    description: {
      id: 'Hero dengan layout split - teks di kiri, gambar di kanan',
      en: 'Hero with split layout - text on left, image on right'
    },
    category: 'hero',
    code: `export function HeroSplit() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              Welcome to Our Platform
            </span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              The easiest way to manage your business
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Our platform provides all the tools you need to streamline operations, 
              boost productivity, and grow your business to new heights.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Get Started Free
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                Watch Demo
              </button>
            </div>
            
            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by 10,000+ companies</p>
              <div className="flex items-center gap-6 opacity-50">
                <div className="w-24 h-8 bg-gray-300 rounded"></div>
                <div className="w-24 h-8 bg-gray-300 rounded"></div>
                <div className="w-24 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-xl bg-white shadow-2xl flex items-center justify-center">
                <span className="text-gray-400">Your Image Here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    slug: 'hero-gradient',
    name: { id: 'Hero Gradien', en: 'Gradient Hero' },
    description: {
      id: 'Hero dengan latar gradien biru-ungu yang dramatis',
      en: 'Hero with dramatic blue-purple gradient background'
    },
    category: 'hero',
    code: `export function HeroGradient() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
          Transform Your
          <br />
          Digital Experience
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-white/80 mb-10">
          Create stunning websites and applications with our cutting-edge 
          platform. No coding required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition shadow-xl">
            Start Building Free
          </button>
          <button className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition border border-white/20">
            View Examples →
          </button>
        </div>
      </div>
    </section>
  );
}`,
  },

  // FEATURES COMPONENTS
  {
    slug: 'features-grid',
    name: { id: 'Features Grid', en: 'Grid Features' },
    description: {
      id: 'Tampilan features dalam grid 3 kolom dengan ikon',
      en: 'Features displayed in a 3-column grid with icons'
    },
    category: 'features',
    code: `export function FeaturesGrid() {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed and performance' },
    { icon: '🔒', title: 'Secure by Default', desc: 'Enterprise-grade security built-in' },
    { icon: '📱', title: 'Mobile First', desc: 'Responsive design for all devices' },
    { icon: '🎨', title: 'Customizable', desc: 'Easily adapt to your brand' },
    { icon: '🔄', title: 'Auto Updates', desc: 'Always have the latest features' },
    { icon: '💬', title: '24/7 Support', desc: 'Round-the-clock customer service' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive toolkit helps you build and scale faster
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    slug: 'features-icons',
    name: { id: 'Features Ikon', en: 'Icon Features' },
    description: {
      id: 'Features dengan ikon besar dan deskripsi singkat',
      en: 'Features with large icons and short descriptions'
    },
    category: 'features',
    code: `export function FeaturesIcons() {
  const features = [
    { icon: '🚀', title: 'Fast Deployment', desc: 'Deploy in seconds with zero configuration' },
    { icon: '🛡️', title: 'Built-in Security', desc: 'Automatic SSL and DDoS protection' },
    { icon: '📊', title: 'Analytics', desc: 'Real-time insights and reporting' },
    { icon: '🔌', title: 'Integrations', desc: 'Connect with your favorite tools' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    slug: 'features-bento',
    name: { id: 'Features Bento', en: 'Bento Features' },
    description: {
      id: 'Layout bento grid untuk menampilkan features dengan ukuran bervariasi',
      en: 'Bento grid layout for displaying features in varied sizes'
    },
    category: 'features',
    code: `export function FeaturesBento() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Powerful Features
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-blue-100">Get deep insights into your business with our powerful analytics dashboard.</p>
          </div>
          
          {/* Small card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Notifications</h3>
            <p className="text-gray-600 text-sm">Never miss important updates</p>
          </div>
          
          {/* Small card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
            <p className="text-gray-600 text-sm">Work together seamlessly</p>
          </div>
          
          {/* Large card */}
          <div className="md:col-span-2 bg-gray-900 rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold mb-2">Enterprise Security</h3>
            <p className="text-gray-300">Bank-level encryption and compliance with major security standards.</p>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },

  // PRICING COMPONENTS
  {
    slug: 'pricing-simple',
    name: { id: 'Pricing Simpel', en: 'Simple Pricing' },
    description: {
      id: 'Tampilan harga 3 tier dengan desain minimalis',
      en: '3-tier pricing display with minimalist design'
    },
    category: 'pricing',
    code: `export function PricingSimple() {
  const plans = [
    { name: 'Starter', price: '$9', features: ['5 Projects', '10GB Storage', 'Email Support', 'Basic Analytics'] },
    { name: 'Pro', price: '$29', popular: true, features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain'] },
    { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'SLA Guarantee', 'Custom Integrations', 'Dedicated Manager'] },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-600">No hidden fees. Cancel anytime.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={\`rounded-2xl border p-8 \${plan.popular ? 'border-blue-600 ring-2 ring-blue-600' : 'border-gray-200'}\`}>
              {plan.popular && (
                <div className="text-blue-600 text-sm font-semibold mb-4">Most Popular</div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-3 rounded-lg font-medium transition \${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}\`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    slug: 'pricing-toggle',
    name: { id: 'Pricing Toggle', en: 'Toggle Pricing' },
    description: {
      id: 'Pricing dengan toggle bulanan/tahunan',
      en: 'Pricing with monthly/yearly toggle'
    },
    category: 'pricing',
    code: `export function PricingToggle() {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    { name: 'Basic', monthly: 15, yearly: 144 },
    { name: 'Standard', monthly: 30, yearly: 288 },
    { name: 'Premium', monthly: 60, yearly: 576 },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose your plan</h2>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 border">
            <button 
              onClick={() => setIsYearly(false)}
              className={\`px-4 py-2 rounded-full text-sm font-medium transition \${!isYearly ? 'bg-blue-600 text-white' : 'text-gray-600'}\`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={\`px-4 py-2 rounded-full text-sm font-medium transition \${isYearly ? 'bg-blue-600 text-white' : 'text-gray-600'}\`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <h3 className="font-semibold text-gray-900 mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                \${isYearly ? plan.yearly : plan.monthly}
                <span className="text-base font-normal text-gray-500">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    slug: 'pricing-comparison',
    name: { id: 'Pricing Perbandingan', en: 'Comparison Pricing' },
    description: {
      id: 'Tabel perbandingan fitur lengkap antar paket',
      en: 'Full feature comparison table between plans'
    },
    category: 'pricing',
    code: `export function PricingComparison() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Compare Plans</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium text-gray-500">Features</th>
                <th className="text-center py-4 px-4 font-semibold">Free</th>
                <th className="text-center py-4 px-4 font-semibold text-blue-600">Pro</th>
                <th className="text-center py-4 px-4 font-semibold">Team</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ['Projects', '3', 'Unlimited', 'Unlimited'],
                ['Team Members', '1', '5', 'Unlimited'],
                ['Storage', '1GB', '50GB', '500GB'],
                ['Analytics', '❌', '✅', '✅'],
                ['API Access', '❌', '✅', '✅'],
                ['Priority Support', '❌', '❌', '✅'],
              ].map(([feature, ...values], idx) => (
                <tr key={idx}>
                  <td className="py-4 px-4 text-gray-600">{feature}</td>
                  {values.map((v, i) => (
                    <td key={i} className="text-center py-4 px-4">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}`,
  },

  // FOOTER COMPONENTS
  {
    slug: 'footer-simple',
    name: { id: 'Footer Simpel', en: 'Simple Footer' },
    description: {
      id: 'Footer minimalis dengan logo dan link essensial',
      en: 'Minimalist footer with logo and essential links'
    },
    category: 'footer',
    code: `export function FooterSimple() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold">BrandName</div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
          </div>
          
          <div className="text-sm text-gray-400">
            © 2024 BrandName. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}`,
  },
  {
    slug: 'footer-columns',
    name: { id: 'Footer Kolom', en: 'Column Footer' },
    description: {
      id: 'Footer dengan beberapa kolom kategori link',
      en: 'Footer with multiple link category columns'
    },
    category: 'footer',
    code: `export function FooterColumns() {
  const columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Updates'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Support', links: ['Help Center', 'Contact', 'Documentation', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-gray-900 mb-4">Brand</div>
            <p className="text-sm text-gray-600">Building the future of web development.</p>
          </div>
          
          {/* Link columns */}
          {columns.map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-900 mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          © 2024 Brand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}`,
  },
  {
    slug: 'footer-cta',
    name: { id: 'Footer CTA', en: 'CTA Footer' },
    description: {
      id: 'Footer dengan section CTA dan form newsletter',
      en: 'Footer with CTA section and newsletter form'
    },
    category: 'footer',
    code: `export function FooterCTA() {
  return (
    <footer className="bg-gray-900">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer links */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white font-bold">BrandName</div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <div className="text-sm text-gray-400">© 2024 All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}`,
  },

  // LANDING PAGE TEMPLATES
  {
    slug: 'landing-saas-startup',
    name: { id: 'Landing SaaS Startup', en: 'SaaS Startup Landing' },
    description: {
      id: 'Template landing page lengkap untuk startup SaaS dengan Navbar, Hero, Features, CTA, dan Footer dalam satu file',
      en: 'Complete landing page template for SaaS startups with Navbar, Hero, Features, CTA, and Footer in a single file'
    },
    category: 'landing-page',
    code: `// SaaS Startup Landing Page - Monolithic Template
// Copy this entire file to your project (e.g., app/page.tsx or components/LandingPage.tsx)
// Dependencies: lucide-react

"use client";

import { useState, useEffect } from "react";
import { 
  Menu, X, Zap, Shield, BarChart3, Users, ArrowRight, Check, 
  ChevronRight, Play, Globe, Star, ChevronDown 
} from "lucide-react";

export default function LandingSaaSStartup() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

// ============ NAVBAR ============
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header 
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3" 
          : "bg-transparent py-5"
      }\`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
              S
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              StartupKit
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">
              Log in
            </button>
            <button className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 md:hidden flex flex-col gap-4 shadow-xl">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-base font-medium text-slate-600 p-2 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-slate-100 my-2" />
          <button className="w-full py-3 text-center font-semibold text-slate-600 border border-slate-200 rounded-lg">
            Log in
          </button>
          <button className="w-full py-3 text-center font-semibold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          v2.0 is now live
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
          Ship your startup <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            in days, not weeks
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The comprehensive boilerplate for modern SaaS applications. 
          Authentication, payments, and dashboard — all pre-configured and ready to go.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="h-12 px-8 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-xl shadow-slate-900/20 flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button className="h-12 px-8 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Play className="w-4 h-4 fill-current" /> Watch Demo
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i}
                src={\`https://i.pravatar.cc/100?img=\${i + 10}\`} 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
              2k+
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="font-semibold text-slate-900 ml-2">5.0</span>
            <span className="text-slate-400">from 2,000+ developers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ LOGO CLOUD ============
function LogoCloud() {
  const logos = ["Acme", "Quantum", "Echo", "Celestial", "Pulse", "Apex"];
  return (
    <section className="py-10 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Trusted by innovative teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo) => (
            <div key={logo} className="text-xl font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-400 rounded-full" />
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FEATURES ============
function Features() {
  const features = [
    {
      title: "Authentication",
      desc: "Secure user management with social logins, magic links, and MFA support out of the box.",
      icon: Shield,
      colSpan: "lg:col-span-2",
      bg: "bg-blue-50"
    },
    {
      title: "Analytics",
      desc: "Real-time insights and beautiful dashboards to track your growth.",
      icon: BarChart3,
      colSpan: "lg:col-span-1",
      bg: "bg-white"
    },
    {
      title: "Team Collaboration",
      desc: "Built-in roles and permissions for seamless team management.",
      icon: Users,
      colSpan: "lg:col-span-1",
      bg: "bg-white"
    },
    {
      title: "Global Payments",
      desc: "Accept payments from anywhere with multi-currency support and tax handling.",
      icon: Globe,
      colSpan: "lg:col-span-2",
      bg: "bg-indigo-50"
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to launch
          </h2>
          <p className="text-lg text-slate-600">
            We've handled the boring stuff so you can focus on building your unique value proposition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={\`\${feature.colSpan} rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition duration-300 \${feature.bg}\`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
function HowItWorks() {
  const steps = [
    { title: "Clone Repo", desc: "Start with our production-ready codebase." },
    { title: "Configure", desc: "Update env variables for your services." },
    { title: "Deploy", desc: "Push to Vercel and go live in minutes." },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              From idea to production in three simple steps
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Stop wasting time on boilerplate. Focus on your business logic and ship faster than your competitors.
            </p>
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-none w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl bg-slate-800 border border-slate-700 p-2 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 blur-3xl -z-10" />
              <div className="rounded-xl bg-slate-950 p-6 overflow-hidden">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-sm text-slate-300 space-y-2">
                  <div className="flex">
                    <span className="text-blue-400 mr-2">➜</span>
                    <span>git clone https://github.com/startup/kit</span>
                  </div>
                  <div className="flex">
                    <span className="text-blue-400 mr-2">➜</span>
                    <span>cd kit && npm install</span>
                  </div>
                  <div className="flex">
                    <span className="text-blue-400 mr-2">➜</span>
                    <span>npm run dev</span>
                  </div>
                  <div className="text-green-400 mt-4">
                    ✓ Ready on http://localhost:3000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS ============
function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">Loved by developers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "This library saved me weeks of work. The components are beautiful and the code is clean. Highly recommended for any serious founder."
              </p>
              <div className="flex items-center gap-4">
                <img src={\`https://i.pravatar.cc/100?img=\${i + 5}\`} alt="Avatar" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-bold text-slate-900">Alex Johnston</div>
                  <div className="text-sm text-slate-500">Founder, TechFlow</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PRICING ============
function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, transparent pricing</h2>
        <p className="text-slate-600 mb-10">Start for free, scale as you grow.</p>
        
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={\`text-sm font-medium \${!isAnnual ? 'text-slate-900' : 'text-slate-500'}\`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-8 rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className={\`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 \${isAnnual ? 'translate-x-6' : 'translate-x-0'}\`} />
          </button>
          <span className={\`text-sm font-medium \${isAnnual ? 'text-slate-900' : 'text-slate-500'}\`}>
            Yearly <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {['Starter', 'Pro', 'Enterprise'].map((plan, idx) => (
            <div key={plan} className={\`relative p-8 rounded-3xl border \${idx === 1 ? 'border-blue-600 shadow-2xl scale-105 bg-white z-10' : 'border-slate-200 bg-slate-50'}\`}>
              {idx === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-bold mb-4">{plan}</h3>
              <div className="text-4xl font-bold mb-2">
                \${idx === 0 ? '0' : idx === 1 ? (isAnnual ? '29' : '39') : 'Custom'}
              </div>
              <div className="text-slate-500 text-sm mb-8">
                {idx === 2 ? 'Contact us' : '/month per user'}
              </div>
              <ul className="space-y-4 mb-8 text-left">
                {[1, 2, 3, 4, 5].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Feature item description goes here</span>
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-3 rounded-xl font-bold transition-all \${
                idx === 1 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }\`}>
                {idx === 0 ? 'Start Free' : idx === 1 ? 'Get Started' : 'Contact Sales'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FAQ ============
function FAQ() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <details key={i} className="group bg-white rounded-xl border border-slate-200 open:ring-2 open:ring-blue-100 transition-all">
              <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer select-none">
                Can I use this for commercial projects?
                <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                Yes, absolutely! Once you purchase the license, you can use it for as many projects as you want, both personal and commercial.
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CTA ============
function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-[2.5rem] bg-slate-900 py-20 px-8 text-center overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to ship your next big thing?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join 10,000+ developers who are building faster with StartupKit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                Get Started Now <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold text-slate-900">StartupKit</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
              The ultimate boilerplate for Next.js applications. Build better, ship faster.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'Discord'].map((social) => (
                <a key={social} href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          {[
            { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
            { title: 'Resources', links: ['Documentation', 'Guides', 'API Reference', 'Support'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Legal'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-slate-900 mb-4">{col.title}</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="hover:text-blue-600 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2024 StartupKit. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}`,
  },

  {
    slug: 'modern-blue-landing-page',
    name: { id: 'Modern Blue Landing Page', en: 'Modern Blue Landing Page' },
    description: {
      id: 'Template landing page dengan tema biru modern dan profesional.',
      en: 'Modern blue themed landing page template for professional use.'
    },
    category: 'landing-page',
    code: `// Please check src/components/preview/items/modern-blue-landing.tsx for full source code.
// This is a placeholder to keep the data file size manageable.`,
  },
  {
    slug: 'dark-white-modern-landing-page',
    name: { id: 'Dark White Modern Landing Page', en: 'Dark White Modern Landing Page' },
    description: {
      id: 'Template landing page dengan tema gelap putih yang elegan dan modern.',
      en: 'Elegant and modern dark white themed landing page template.'
    },
    category: 'landing-page',
    code: `// Please check src/components/preview/items/dark-white-modern-landing.tsx for full source code.
// This is a placeholder to keep the data file size manageable.`,
  },
];

export function getComponentBySlug(slug: string): ComponentData | undefined {
  return components.find(c => c.slug === slug);
}

export function getComponentsByCategory(category: string): ComponentData[] {
  if (category === 'all') return components;
  return components.filter(c => c.category === category);
}

export function getAllCategories(): string[] {
  return ['all', ...new Set(components.map(c => c.category))];
}
