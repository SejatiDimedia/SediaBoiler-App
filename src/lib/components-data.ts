// Sample component data for the library
// In production, this would come from a database

export interface ComponentData {
    slug: string;
    name: { id: string; en: string };
    description: { id: string; en: string };
    category: 'navbar' | 'hero' | 'features' | 'pricing' | 'footer';
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
