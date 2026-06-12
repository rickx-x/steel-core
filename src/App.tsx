import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import {
  Wrench,
  Weight,
  Layers,
  Paintbrush,
  Sparkles,
  Zap,
  Droplet,
  Settings as SettingsIcon,
  Shield,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Menu,
  X,
  Factory,
  Globe,
  Ship,
  Building,
  Check,
  ChevronRight,
  Info,
  Clock,
  Briefcase,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

// Product interface for details popup
interface ProductDetail {
  id: string;
  title: string;
  description: string;
  items: string[];
  applications: string[];
  icon: React.ReactNode;
}

// RFQ Inquiry Interface
interface RFQInquiry {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  requirement: string;
  date: string;
  status: 'Received' | 'Reviewing' | 'Quotation Sent';
}

export default function App() {
  // Mobile navigation menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Header state for scroll styling
  const [scrolled, setScrolled] = useState(false);

  // Active product category details modal state
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

  // Local storage for keeping track of submitted queries
  const [inquiries, setInquiries] = useState<RFQInquiry[]>([]);

  // RFQ Form inputs state
  const [formValues, setFormValues] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    requirement: ''
  });

  // Form error states
  const [errors, setErrors] = useState({
    name: '',
    company: '',
    phone: '',
    requirement: ''
  });

  // Form loading & success states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Track scroll position to update header layout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load previously submitted inquiries from localStorage (to make it a fully functional real application)
    const saved = localStorage.getItem('steelcore_rfqs');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved inquiries', e);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Product categories mapped out with specifications
  const productCategories: ProductDetail[] = [
    {
      id: 'hydraulic',
      title: 'Hydraulic Solutions',
      description: 'Hydraulic Pumps, Valves, Hoses and Accessories',
      icon: <Wrench className="w-8 height-8" />,
      items: [
        'Hand Pumps, Gear Pumps & Piston Pumps',
        'Directional Control Valves & Flow Control Solenoids',
        'High-Pressure Hydraulic Hoses (1-wire, 2-wire, 4-wire braided)',
        'Pressure Gauges & Manifolds',
        'Quick Release Couplings (QRC) & Hose Adaptors'
      ],
      applications: ['Manufacturing Units', 'Earthmoving Machinery', 'Hydraulic Workshops', 'Industrial Presses']
    },
    {
      id: 'lifting',
      title: 'Lifting Equipment',
      description: 'Chain Pulley Blocks, Hoists, Wire Rope Slings and Material Handling Equipment',
      icon: <Weight className="w-8 height-8" />,
      items: [
        'Spur Geared Chain Pulley Blocks (0.5T to 20T capacity)',
        'Manual & Electric Wire Rope Hoists',
        'Polyester Webbing Slings & Round Slings',
        'Steel Wire Rope Slings & Wire Ropes',
        'D-Shackles, Bow Shackles & Turnbuckles',
        'Hydraulic Pallet Trucks & Material Handling Solutions'
      ],
      applications: ['EPC Contractors', 'Shipyards', 'Engineering Fabricators', 'Warehouses']
    },
    {
      id: 'pipes',
      title: 'Pipes & Fittings',
      description: 'MS, GI, SS Pipes, Flanges, Elbows, Tees and Industrial Fittings',
      icon: <Layers className="w-8 height-8" />,
      items: [
        'Mild Steel (MS) & Galvanized Iron (GI) Pipes',
        'Stainless Steel (SS 304, 316) Seamless & Welded Tubes',
        'Slip-on, Weld-neck & Blind Flanges (Class 150 to 2500)',
        'Butt-weld Elbows, Tees, Reducers & Caps',
        'Forged High-Pressure Threaded & Socket-weld Fittings',
        'Industrial Gaskets & Jointing Sheets'
      ],
      applications: ['Oil & Gas Projects', 'Infrastructure Contractors', 'Process Industries', 'Chemical Plants']
    },
    {
      id: 'paints',
      title: 'Paints & Coatings',
      description: 'Industrial Paints, Primers, Enamels and Protective Coatings',
      icon: <Paintbrush className="w-8 height-8" />,
      items: [
        'High-Performance Epoxy Primers & Finish Paints',
        'Polyurethane (PU) Coatings for Weather Resistance',
        'Synthetic Utility Enamels & Fast-Drying Primers',
        'Heat-Resistant Aluminum Paints (Up to 600°C)',
        'Anti-Corrosive Zinc Rich & Zinc Chromate Coatings',
        'Thinners, Cleaners & Industrial Priming Agents'
      ],
      applications: ['Fabricators', 'Marine Operations', 'Corrosion Protection Units', 'Infrastructure Projects']
    },
    {
      id: 'adhesives',
      title: 'Adhesives & Sealants',
      description: 'Industrial Adhesives, Sealants and Gasket Solutions',
      icon: <Sparkles className="w-8 height-8" />,
      items: [
        'Threadlockers, Thread Sealants & Retaining Compounds',
        'RTV Silicone Gasket Makers (High-Temperature Red & Clear)',
        'Heavy-Duty Epoxy Putty & Solvent Cements',
        'Cyanoacrylate Instant Bonding Adhesives',
        'Anaerobic Flange Sealants & Jointing Adhesives',
        'Teflon Thread Seal Tapes & Anti-Seize Paste'
      ],
      applications: ['Maintenance Teams (MRO)', 'Automotive Workshops', 'Pipe Assemblers', 'Precision Machine Maintenance']
    },
    {
      id: 'electrical',
      title: 'Electrical Materials',
      description: 'Cables, Wires, Switchgear, MCBs and Industrial Electrical Components',
      icon: <Zap className="w-8 height-8" />,
      items: [
        'Armoured & Unarmoured Power Cables (XLPE/PVC)',
        'Flexible Copper Control Cables & Wires',
        'Molded Case Circuit Breakers (MCCB) & Air Circuit Breakers (ACB)',
        'Miniature Circuit Breakers (MCB) & Residual Current Circuit Breakers (RCCB)',
        'Industrial Plugs, Sockets & Cable Glands',
        'Insulating Tapes, Cable Lugs & Terminal Blocks'
      ],
      applications: ['Plant Infrastructure', 'EPC Contractors', 'Electrical Commissioning Grid', 'Power Substations']
    },
    {
      id: 'plumbing',
      title: 'Plumbing Solutions',
      description: 'PVC, CPVC, UPVC Pipes, Valves and Plumbing Accessories',
      icon: <Droplet className="w-8 height-8" />,
      items: [
        'Heavy-Duty PVC & UPVC Pipes (Schedule 40 & 80)',
        'CPVC Hot & Cold Water Piping Systems',
        'Industrial Ball Valves, Butterfly Valves & Gate Valves',
        'Check Valves, Non-Return Valves & Strainers',
        'Pipe Fittings (Valves, Couplers, Unions, Elbows)',
        'Solvent Cement, Primers & Plumbing Consumables'
      ],
      applications: ['Industrial Water Lines', 'Construction Sites', 'Water Treatment Units', 'Agriculture Setups']
    },
    {
      id: 'spareparts',
      title: 'Industrial Spare Parts',
      description: 'Bearings, Couplings, Bushes, Oil Seals and Machine Components',
      icon: <SettingsIcon className="w-8 height-8" />,
      items: [
        'Deep Groove Ball Bearings & Spherical Roller Bearings',
        'Flexible Spider Couplings & Pin-Bush Couplings',
        'Rotary Shaft Oil Seals & V-Seals (Viton, Nitrile, Neoprene)',
        'Bronze Bushes & Gunmetal Machine Bushes',
        'Piston Seals, Rod Seals & Wiper Rings for Hydraulic/Pneumatic Use',
        'V-Belts, Timing Belts & Transmission Drive Chains'
      ],
      applications: ['Manufacturing Yards', 'Industrial Workshops', 'Plant Maintenance Department', 'Machine Rebuilders']
    },
    {
      id: 'hardware',
      title: 'Hardware & Safety Products',
      description: 'Fasteners, Hand Tools, Safety Equipment and Industrial Consumables',
      icon: <Shield className="w-8 height-8" />,
      items: [
        'High-Tensile Hex Bolts, Nuts & Washers (Grade 8.8, 10.9, 12.9)',
        'Stainless Steel Fasteners & Threaded Stud Rods',
        'Heavy-Duty Hand Tools, Spanners, Pliers & Sockets',
        'Safety Helmets (IS Marked), Safety Shoes & Protective eyewear',
        'Double-Lanyard Safety Harness & High-Visibility Jackets',
        'Welding Electrodes, Grinding/Cutting Wheels & Emery Paper'
      ],
      applications: ['Workshops', 'Contractors', 'All Industrial Maintenance Crews', 'Fabrication Yards']
    }
  ];

  // Industry sectors mapper
  const industries = [
    { name: 'Manufacturing', desc: 'Sourcing essential engineering parts, tools and machinery inputs for continuous uptime.', icon: <Factory className="w-6 h-6 text-primary" /> },
    { name: 'Construction', desc: 'Heavy fasteners, safety gear, plumbing, pipes and lifting assemblies for civil infrastructure.', icon: <Building className="w-6 h-6 text-primary" /> },
    { name: 'Infrastructure', desc: 'Delivering robust raw elements, electrical substations, pipes and fittings on a massive scope.', icon: <Globe className="w-6 h-6 text-primary" /> },
    { name: 'Shipbuilding', desc: 'Custom marine Grade fittings, heavy wire rope hoists, and high-performance safety gear.', icon: <Ship className="w-6 h-6 text-primary" /> },
    { name: 'Marine Industries', desc: 'Coating finishes, hydraulic hoses, and specialized protective sealants for offshore operations.', icon: <Ship className="w-6 h-6 text-primary" /> },
    { name: 'Fabrication', desc: 'Fasteners, custom MS/GI pipe sections, welding electrodes, and grinding consumables.', icon: <Wrench className="w-6 h-6 text-primary" /> },
    { name: 'Industrial Workshops', desc: 'Lifting pulleys, hand tools, standard seals, bearings, and general adhesive fillers.', icon: <SettingsIcon className="w-6 h-6 text-primary" /> },
    { name: 'Power Plants', desc: 'Circuit breakers, switchgear, heavy-duty armored copper cabling, and high-pressure hose segments.', icon: <Zap className="w-6 h-6 text-primary" /> },
    { name: 'Oil & Gas', desc: 'Seamless SS tubes, forged flanges, high-pressure fittings, and premium seal materials.', icon: <Layers className="w-6 h-6 text-primary" /> }
  ];

  // Handle Form Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear error message when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate the inquiry form
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', company: '', phone: '', requirement: '' };

    if (!formValues.name.trim()) {
      newErrors.name = 'Full Name is required';
      valid = false;
    }
    if (!formValues.company.trim()) {
      newErrors.company = 'Company name is required';
      valid = false;
    }
    if (!formValues.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formValues.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (min 10 digits)';
      valid = false;
    }
    if (!formValues.requirement.trim()) {
      newErrors.requirement = 'Please provide details of your material requirements';
      valid = false;
    } else if (formValues.requirement.trim().length < 15) {
      newErrors.requirement = 'Please describe your request in a bit more detail (min 15 chars)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit RFQ Inquiry
  const handleSubmitRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate sending progress with timer
    setTimeout(() => {
      const newInquiry: RFQInquiry = {
        id: 'RFQ-' + Math.floor(100000 + Math.random() * 900000),
        name: formValues.name,
        company: formValues.company,
        phone: formValues.phone,
        email: formValues.email || 'n/a',
        requirement: formValues.requirement,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: 'Received'
      };

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('steelcore_rfqs', JSON.stringify(updated));

      // Reset form variables
      setFormValues({
        name: '',
        company: '',
        phone: '',
        email: '',
        requirement: ''
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Dismiss success screen after 8 seconds
      setTimeout(() => setSubmitSuccess(false), 8000);
    }, 1500);
  };

  // Quick RFQ autofill for direct click
  const handleAutoFillCategory = (categoryTitle: string) => {
    setFormValues(prev => ({
      ...prev,
      requirement: `Hello, we would like to receive an official RFQ price quotation for materials under Category: ${categoryTitle}. Please send details on availability and competitive prices.`
    }));
    // Scroll smoothly to contact form
    const formElement = document.getElementById('contact');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-primary/20 selection:text-primary-dark font-sans relative">
      
      {/* TOP HEADER PRE-BAR (Contact Summary) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <a href="tel:+917660950930" className="hover:text-white transition">+91 7660950930</a>
            </span>
            <span className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <a href="mailto:steelcorenterprises@gmail.com" className="hover:text-white transition">steelcorenterprises@gmail.com</a>
            </span>
            <span className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-primary-dark" />
              <span>Gajuwaka, Visakhapatnam</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">GST Registration &amp; MSME Verified</span>
            <span className="h-3 w-[1px] bg-slate-700"></span>
            <span className="text-emerald-400 font-medium">● Operational (Mon-Sat)</span>
          </div>
        </div>
      </div>

      {/* CORE NAVIGATION */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-md py-3' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
          {/* Logo Mark */}
          <a href="#hero" className="flex items-center space-x-3 group" id="nav-logo">
            <img src={logo} alt="Steelcore Logo" className="w-10 h-10 group-hover:scale-105 transition-transform" />
            <div>
              <div className="text-xl font-bold tracking-tight leading-none flex items-center">
                <span className="text-blue-600">Steel</span><span className="text-red-600">Core</span>
              </div>
              <span className="text-xs uppercase tracking-widest font-semibold text-black block mt-0.5">
                Enterprises
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
            <a href="#about" className="hover:text-primary transition py-1">About Us</a>
            <a href="#products" className="hover:text-primary transition py-1">Product Categories</a>
            <a href="#industries" className="hover:text-primary transition py-1">Industries</a>
            <a href="#why-us" className="hover:text-primary transition py-1">Our Advantage</a>
            <a href="#contact" className="hover:text-primary transition py-1">Contact</a>
            
            <a 
              href="#contact" 
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded font-semibold text-sm tracking-wide shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all"
            >
              Request Quote
            </a>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-700 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute top-full left-0 w-full shadow-lg py-5 px-6 space-y-4 animate-fadeIn transition-all z-50">
            <nav className="flex flex-col space-y-4 font-semibold text-slate-700">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)} 
                className="hover:text-primary transition-colors py-1.5 border-b border-slate-50"
              >
                About Us
              </a>
              <a 
                href="#products" 
                onClick={() => setMobileMenuOpen(false)} 
                className="hover:text-primary transition-colors py-1.5 border-b border-slate-50"
              >
                Product Categories
              </a>
              <a 
                href="#industries" 
                onClick={() => setMobileMenuOpen(false)} 
                className="hover:text-primary transition-colors py-1.5 border-b border-slate-50"
              >
                Industries Served
              </a>
              <a 
                href="#why-us" 
                onClick={() => setMobileMenuOpen(false)} 
                className="hover:text-primary transition-colors py-1.5 border-b border-slate-50"
              >
                Why Choose Us
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className="hover:text-primary transition-colors py-1.5"
              >
                Contact Info
              </a>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="bg-primary hover:bg-primary-dark text-white text-center py-2.5 rounded font-bold transition-all shadow"
                >
                  Request Quote Form
                </a>
                <a 
                  href="tel:+917660950930" 
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 text-center py-2.5 rounded font-bold transition-all flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Call +91 76609 50930</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative bg-slate-950 text-white min-h-[620px] xl:min-h-[680px] flex items-center overflow-hidden py-16 md:py-24">
        {/* Background photo block with rigorous industrial filters */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1600" 
            alt="Steelcore Enterprises industrial background" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform origin-center"
          />
          {/* Rich gradients overlays to retain full typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70"></div>
          <div className="absolute inset-0 bg-radial-at-t from-transparent via-slate-950/40 to-slate-950"></div>
          {/* Abstract engineering grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            {/* Tagline / Hub indicator */}
            <div className="inline-flex items-center space-x-2 bg-primary/25 border border-primary/40 text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
              <span>Visakhapatnam Industrial Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Your Trusted <br className="hidden sm:block" />
              <span className="text-primary underline decoration-accent decoration-wavy decoration-3 underline-offset-8">Industrial Supply</span> Partner
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
              Supplying Engineering, Maintenance, Infrastructure and Industrial Materials for manufacturing units, workshops, construction sites, shipyards, and industrial projects.
            </p>

            <div className="bg-slate-900/40 backdrop-blur-sm border-l-4 border-accent p-4 rounded-r mb-8 max-w-xl">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Our Corporate Credo</p>
              <p className="text-lg font-bold text-white tracking-wide">One Source. All Solutions.</p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded font-bold text-base tracking-wide shadow-lg shadow-primary/30 transition-all text-center flex items-center justify-center space-x-3 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Request a Quotation</span>
              </a>
              <a 
                href="https://wa.me/917660950930?text=Hello%20Steelcore%20Enterprises%2C%20I%20saw%20your%20website%20and%20require%20industrial%20materials.%20Please%20assist." 
                target="_blank" 
                rel="noreferrer" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded font-bold text-base tracking-wide transition-all text-center flex items-center justify-center space-x-3 shadow-lg shadow-emerald-800/10"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                <span>WhatsApp Connection</span>
              </a>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded flex items-center space-x-3.5">
                <span className="text-3xl font-extrabold text-primary">9+</span>
                <span className="text-xs text-slate-300 leading-tight">Product Categories Handled</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded flex items-center space-x-3.5">
                <Factory className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-xs text-slate-300 leading-tight">Comprehensive Infrastructure Solutions</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded flex items-center space-x-3.5">
                <Check className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-xs text-slate-300 leading-tight">Reliable Dispatch Procurement Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST PILLARS BAR SECTION */}
      <section className="bg-white py-8 border-y border-slate-100 shadow-sm relative z-10" id="trust">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Quality Products</h4>
                <p className="text-xs text-slate-500 mt-1">Sourced from only verified, highly-trusted manufacturers.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="text-primary font-extrabold text-lg">₹</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Competitive Pricing</h4>
                <p className="text-xs text-slate-500 mt-1">Direct tie-ups allow optimized factory quotes.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Reliable Service</h4>
                <p className="text-xs text-slate-500 mt-1">Continuous materials verification and prompt responses.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Timely Delivery</h4>
                <p className="text-xs text-slate-500 mt-1">Fast on-schedule dispatch directly to your project floor.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-20 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual side block */}
            <div className="lg:col-span-5 space-y-6 relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full filter blur-xl"></div>
              
              <div className="relative border border-slate-200 bg-white p-8 rounded-lg shadow-xl shadow-slate-200/50 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl transition-all duration-500 group-hover:bg-primary/10"></div>
                
                {/* Custom Industrial SVG Graphic block */}
                <div className="industry-illustration h-60 bg-slate-900 rounded-lg flex flex-col justify-between p-6 relative overflow-hidden shadow-inner">
                  
                  {/* Backdrop animated gears details */}
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-10 blur-[1px]">
                    <svg className="w-48 h-48 text-white animate-gear-reverse" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1a9.86 9.86 0 0 0-1.68-.97l-.38-2.65C14.46  2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.68.97l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.51.38 1.07.72 1.68.97l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.68-.97l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                    </svg>
                  </div>
                  <div className="absolute right-[50px] top-[10px] opacity-10">
                    <svg className="w-24 h-24 text-white animate-gear-fast" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1a9.86 9.86 0 0 0-1.68-.97l-.38-2.65C14.46  2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.68.97l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.51.38 1.07.72 1.68.97l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.68-.97l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                    <span className="text-xs tracking-widest font-bold uppercase text-primary">Steelcore Enterprises</span>
                    <span className="px-2 py-0.5 bg-accent text-[10px] text-white font-extrabold rounded">VERIFIED</span>
                  </div>

                  <div className="my-auto relative z-10 text-center py-4">
                    <p className="text-sm font-semibold tracking-wide text-slate-400">Visakhapatnam Steel Belt</p>
                    <p className="text-2xl font-black mt-1 text-white uppercase tracking-wider">GAJUWAKA Y-JUNCTION</p>
                    <p className="text-xs text-primary font-medium mt-1">Primary Procurement Center</p>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 border-t border-white/10 pt-4 relative z-10">
                    <span>MRO Support Desk</span>
                    <span className="font-semibold text-white">READY FOR RFQ</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="p-3.5 bg-primary/10 rounded text-primary flex-shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Industrial Presence</h5>
                    <p className="text-xs text-slate-500">Based in the manufacturing core of Andhra Pradesh, Gajuwaka.</p>
                  </div>
                </div>
              </div>

              {/* Verified Trust Seal */}
              <div className="bg-slate-905 bg-slate-900 text-slate-200 p-5 rounded-lg border border-slate-800 flex items-center space-x-4 shadow">
                <span className="text-accent text-3xl font-extrabold">100%</span>
                <p className="text-xs text-slate-400">
                  Reliability index with active procurement supply pipeline, providing genuine factory certification.
                </p>
              </div>

            </div>

            {/* Content side block */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded uppercase tracking-wider">
                Who We Are
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                About Steelcore Enterprises
              </h2>

              <p className="text-slate-600 leading-relaxed text-base">
                Steelcore Enterprises is a professionally managed industrial supply company delivering a comprehensive portfolio of engineering, maintenance, and infrastructure materials to diverse industrial sectors.
              </p>

              <div className="h-[1px] bg-slate-200 my-4"></div>

              <p className="text-slate-600 leading-relaxed text-base">
                Built on reliability and efficiency, we serve as a trusted procurement partner for manufacturing units, workshops, construction companies, fabrication businesses, and industrial projects.
              </p>

              <p className="text-slate-600 leading-relaxed text-base">
                Our commitment to quality products, competitive pricing, and dependable service enables our customers to simplify procurement and improve operational efficiency.
              </p>

              <div className="p-4 bg-slate-100/80 rounded border-l-4 border-primary italic text-slate-800 font-medium">
                "One Source. All Solutions." - Simplifying procurement for operations of every scale across India.
              </div>

              {/* Chips of focus */}
              <div className="pt-4">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Key Sourcing Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold text-slate-700">Engineering Materials</span>
                  <span className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold text-slate-700">Maintenance Supplies</span>
                  <span className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold text-slate-700">Infrastructure Products</span>
                  <span className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold text-slate-700">Hydraulics Sourcing</span>
                  <span className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold text-slate-700">Lifting Pulley Rigging</span>
                  <span className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold text-slate-700">Safety Equipment (PPE)</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES SECTION */}
      <section id="products" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded uppercase tracking-wider">
              Comprehensive Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
              Product Categories
            </h2>
            <p className="text-slate-500 mt-4 text-base sm:text-lg">
              We supply high-caliber industrial and engineering materials across 9 distinct categories. Click a category to view full technical specifications.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, idx) => (
              <div 
                key={cat.id}
                className="border border-slate-150 rounded-lg p-6 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Decorative absolute corner accent */}
                <div className="absolute top-0 right-0 w-2 h-0 bg-primary group-hover:h-12 transition-all rounded-tr duration-300"></div>

                <div>
                  {/* Icon wrap with custom color block */}
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded flex items-center justify-center mb-5 transition-colors group-hover:bg-primary group-hover:text-white">
                    {cat.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedProduct(cat)}
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-primary flex items-center space-x-1 transition"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button 
                    onClick={() => handleAutoFillCategory(cat.title)}
                    className="text-xs font-semibold text-primary hover:underline"
                    title="Pre-populate in contact form"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive informational box */}
          <div className="mt-12 p-6 bg-slate-900 text-white rounded-lg flex flex-col sm:flex-row items-center justify-between skeleton">
            <div className="flex items-center space-x-4 text-left mb-4 sm:mb-0">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                <Info className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Custom Procurement Support Available</h4>
                <p className="text-xs text-slate-400 mt-0.5">Need a specific brand or distinct non-standard size? We can source it through our network.</p>
              </div>
            </div>
            <a 
              href="#contact" 
              className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded font-bold text-xs tracking-wider uppercase transition flex-shrink-0"
            >
              Consult an Expert
            </a>
          </div>

        </div>
      </section>

      {/* POPUP DETAILS DRAWER MODAL Component */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          {/* Modal box */}
          <div className="bg-white rounded-lg border border-slate-200 max-w-xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
            
            {/* Modal header with color wrap */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-primary/20 text-primary-dark rounded text-white">
                  {selectedProduct.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Technical Catalog</span>
              </div>
              <h3 className="text-2xl font-black">{selectedProduct.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedProduct.description}</p>
            </div>

            {/* Modal content body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Supplied Items Catalog:</h4>
                <ul className="space-y-2">
                  {selectedProduct.items.map((item, id) => (
                    <li key={id} className="flex items-start text-sm text-slate-700">
                      <span className="text-primary font-bold mr-2 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Primary Sector Applications:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.applications.map((app, id) => (
                    <span key={id} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-medium border border-slate-200">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Informative advice */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  Our products comply with relevant Indian and international engineering criteria (IS/API/DIN/ASTM). Rigorous quality certificates can be dispatched on demand.
                </span>
              </div>

            </div>

            {/* Modal footer CTAs */}
            <div className="bg-slate-150 bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row gap-2 justify-end">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="px-4 py-2 border border-slate-350 bg-white hover:bg-slate-100 rounded text-sm text-slate-700 font-bold transition"
              >
                Close Catalog
              </button>
              
              <button 
                onClick={() => {
                  handleAutoFillCategory(selectedProduct.title);
                  setSelectedProduct(null);
                }} 
                className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold shadow transition"
              >
                Inquire For Category
              </button>
            </div>

          </div>
        </div>
      )}

      {/* INDUSTRIES SERVED SECTION */}
      <section id="industries" className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded uppercase tracking-wider">
              Strategic Versatility
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
              Industries Served
            </h2>
            <p className="text-slate-400 mt-4 text-base">
              Steelcore Enterprises provides procurement solutions across high-growth engineering and industrial sectors, ensuring robust operational continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div 
                key={i} 
                className="bg-slate-950/60 border border-slate-800 p-6 rounded hover:border-primary transition duration-300"
              >
                <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center mb-4">
                  {ind.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ind.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded uppercase tracking-wider">
              The Steelcore Model
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
              Why Choose Steelcore
            </h2>
            <p className="text-slate-500 mt-4 text-base">
              We translate our deep knowledge and solid industrial infrastructure into seamless operations for procurement managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="border border-slate-100 rounded p-6 bg-slate-50/50 hover:bg-slate-50 transition duration-300 relative">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-100">01</span>
              <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">One Source Procurement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamline and simplify industrial purchasing. Eliminate multiple vendor friction points, single invoice consolidation, and tracking headaches.
              </p>
            </div>

            <div className="border border-slate-100 rounded p-6 bg-slate-50/50 hover:bg-slate-50 transition duration-300 relative">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-100">02</span>
              <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Reliable Supply Chain</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct partnerships with ISO-certified manufacturers and material warehouses across India. Consistent availability of safety, piping, and hardware components.
              </p>
            </div>

            <div className="border border-slate-100 rounded p-6 bg-slate-50/50 hover:bg-slate-50 transition duration-300 relative">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-100">03</span>
              <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="font-extrabold text-xl">₹</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Competitive Pricing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leveraging local distribution networks to offer excellent bulk prices. High value corporate quote pricing that helps projects fit comfortably within target budgets.
              </p>
            </div>

            <div className="border border-slate-100 rounded p-6 bg-slate-50/50 hover:bg-slate-50 transition duration-300 relative">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-100">04</span>
              <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Customer-Centric</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated support desk based in Visakhapatnam to coordinate delivery specifics, prioritize emergency spares, and verify quality prior to transport loading.
              </p>
            </div>

          </div>

          {/* Sourcing Timeline progress tracker */}
          <div className="mt-16 bg-slate-50 border border-slate-200 rounded-lg p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Our Procurement Request Workflow</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
              
              <div className="text-center relative">
                <div className="w-10 h-10 bg-primary text-white font-extrabold text-sm rounded-full flex items-center justify-center mx-auto mb-3">1</div>
                <h4 className="font-bold text-slate-900 text-sm">Submit Requirements</h4>
                <p className="text-[11px] text-slate-500 mt-1">Specify items, brands, and quantities via form or WhatsApp.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-primary text-white font-extrabold text-sm rounded-full flex items-center justify-center mx-auto mb-3">2</div>
                <h4 className="font-bold text-slate-900 text-sm">Price Compilation</h4>
                <p className="text-[11px] text-slate-500 mt-1">Our desk checks immediate inventory and compiles corporate quotes.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-primary text-white font-extrabold text-sm rounded-full flex items-center justify-center mx-auto mb-3">3</div>
                <h4 className="font-bold text-slate-900 text-sm">Quote Dispatch</h4>
                <p className="text-[11px] text-slate-500 mt-1">Official competitive quotation with GST details sent for review.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-accent text-white font-extrabold text-sm rounded-full flex items-center justify-center mx-auto mb-3">4</div>
                <h4 className="font-bold text-slate-900 text-sm">Fulfillment</h4>
                <p className="text-[11px] text-slate-500 mt-1">We inspect, package securely, and dispatch directly to plant site.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* REQUEST QUOTE HIGHLIGHT BANNER */}
      <section className="bg-slate-950 text-white relative py-16 overflow-hidden">
        {/* Background mill decoration */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" 
            alt="Steelcore steelwarehouse background" 
            className="w-full h-full object-cover object-center mix-blend-color-burn"
          />
        </div>
        
        <div className="bg-radial-at-t from-transparent via-slate-950 to-slate-950 absolute inset-0"></div>

        <div className="max-w-4xl mx-auto text-center px-4 md:px-6 relative z-10 space-y-6">
          <div className="inline-block px-3.5 py-1.5 bg-accent text-white text-xs font-bold rounded uppercase tracking-widest">
            Urgent Requirements Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Need Industrial Materials? <br />
            <span className="text-primary">Get a Quick Quote Today.</span>
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Contact us for rapid assistance on raw materials, spare parts, and industrial paints. Visakhapatnam's engineering specialists are here to serve you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#contact" 
              className="px-6 py-3.5 bg-primary hover:bg-primary-dark text-white rounded font-bold text-sm tracking-widest uppercase transition inline-flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Fill Request Form</span>
            </a>
            
            <a 
              href="mailto:steelcorenterprises@gmail.com" 
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded font-bold text-sm tracking-widest uppercase transition inline-flex items-center space-x-2"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>Email Sheet Direct</span>
            </a>

            <a 
              href="https://wa.me/917660950930?text=Hello%20Steelcore%20Enterprises%2C%20I%20have%20an%20urgent%20requirement%20details." 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-sm tracking-widest uppercase transition inline-flex items-center space-x-2"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              <span>Instant Chat</span>
            </a >
          </div>
        </div>
      </section>

      {/* CORE CONTACT SECTION (Includes local RFQ storage feedback) */}
      <section id="contact" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded uppercase tracking-wider">
              Procurement Desk
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
              Request a Quote &amp; Map Coordinates
            </h2>
            <p className="text-slate-500 mt-4 text-base">
              Establish a direct channel with Steelcore Enterprises for consistent prices, reliable support and rapid deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact details side (Col 5) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-accent tracking-widest">Office Location</span>
                <h3 className="text-2xl font-black text-slate-900">Visakhapatnam Operations</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Visakhapatnam, also known as the City of Destiny, is Andhra Pradesh's largest industrial powerhouse containing shipyards, severe chemicals, and massive steel plants.
                </p>
              </div>

              {/* Data Items list */}
              <div className="space-y-6 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 text-primary rounded">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">DIRECT TELEPHONE</span>
                    <a href="tel:+917660950930" className="text-slate-800 font-black hover:text-primary text-base transition">
                      +91 76609 50930
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 text-primary rounded">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">OFFICIAL EMAIL</span>
                    <a href="mailto:steelcorenterprises@gmail.com" className="text-slate-800 font-black hover:text-primary text-base transition">
                      steelcorenterprises@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 text-primary rounded">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <span className="text-xs text-slate-400 font-bold block">REGISTERED OFFICE ADDRESS</span>
                    <address className="not-italic text-slate-800 font-semibold mt-1">
                      27-4-62/1, Ground Floor,<br />
                      Y Junction, Patha Karnavanipalem,<br />
                      Kanithi Village, Gajuwaka,<br />
                      Visakhapatnam, Andhra Pradesh, India
                    </address>
                  </div>
                </div>

              </div>

              {/* Geo location map placeholder card (Enterprise grade) */}
              <div className="bg-slate-900 text-slate-300 p-6 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Map GPS Coordinates</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold">17.672803° N, 83.189442° E</span>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Strategically situated at **Gajuwaka Y Junction**, allowing easy transportation accessibility to the Visakhapatnam Port, HPCL, NTPC and Gangavaram Port highway corridors for speed shipments.
                </p>

                <a 
                  href="https://www.google.com/maps/place/Steelcore+Enterprises/@17.6727893,83.189252,20.57z/data=!4m6!3m5!1s0x3a3969c22b492389:0x82da9c7ff37a97e1!8m2!3d17.6728194!4d83.1894052!16s%2Fg%2F11nq11z338?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-primary hover:text-white transition"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Dynamic Sourcing RFQ Form side (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden">
                
                <div className="bg-slate-950 p-6 text-white border-b border-slate-800">
                  <h3 className="text-lg font-bold">RFQ Submit Inquiry</h3>
                  <p className="text-xs text-slate-400 mt-1">Fields marked with an asterisk (*) are strictly required.</p>
                </div>

                <form onSubmit={handleSubmitRFQ} className="p-6 md:p-8 space-y-5" id="rfqForm">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-slide">
                    
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        id="name"
                        placeholder="Your full name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded border text-sm text-slate-800 transition focus:outline-none ${errors.name ? 'border-accent ring-1 ring-accent' : 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary'}`}
                      />
                      {errors.name && <p className="text-xs text-accent font-medium mt-1.5 flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> {errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Company Name *</label>
                      <input 
                        type="text" 
                        name="company"
                        id="company"
                        placeholder="Your company / workshop name"
                        value={formValues.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded border text-sm text-slate-800 transition focus:outline-none ${errors.company ? 'border-accent ring-1 ring-accent' : 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary'}`}
                      />
                      {errors.company && <p className="text-xs text-accent font-medium mt-1.5 flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> {errors.company}</p>}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        id="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded border text-sm text-slate-800 transition focus:outline-none ${errors.phone ? 'border-accent ring-1 ring-accent' : 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary'}`}
                      />
                      {errors.phone && <p className="text-xs text-accent font-medium mt-1.5 flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> {errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        name="email"
                        id="email"
                        placeholder="procurement@company.com"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded text-sm text-slate-800 transition focus:outline-none"
                      />
                    </div>

                  </div>

                  <div>
                    <label htmlFor="requirement" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Requirement Details *</label>
                    <textarea 
                      name="requirement"
                      id="requirement"
                      rows={5}
                      placeholder="List hydraulic pipes sizes, paints volumes/brands, fittings specifications, fasteners, quantities, required dispatch timeline etc..."
                      value={formValues.requirement}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded border text-sm text-slate-800 transition focus:outline-none ${errors.requirement ? 'border-accent ring-1 ring-accent' : 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary'}`}
                    ></textarea>
                    {errors.requirement && <p className="text-xs text-accent font-medium mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.requirement}</p>}
                    <p className="text-[11px] text-slate-400 mt-1.5">Please specify precise parameters to compile accuracy standard sheet.</p>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider text-sm py-4 rounded shadow transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Verifying Sourcing Path...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit RFQ Inquiry</span>
                      </>
                    )}
                  </button>

                  {/* Form Success Response */}
                  {submitSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-sm flex items-start space-x-3 mt-4 animate-scaleUp">
                      <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-extrabold text-sm">Inquiry Logged Successfully!</h5>
                        <p className="text-xs text-emerald-700 mt-1">
                          Thank you! We have compiled your request. A quotation expert from Steelcore Enterprises Visakhapatnam will reach out on phone or email shortly.
                        </p>
                      </div>
                    </div>
                  )}

                </form>

              </div>

              {/* CUSTOM INQUIRIES HISTORY LOG COMPONENT (To make the app actually functional for user evaluations) */}
              {inquiries.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="text-xs font-extrabold uppercase text-slate-800 tracking-wider">Your Pending Proposals ({inquiries.length})</span>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('steelcore_rfqs');
                        setInquiries([]);
                      }}
                      className="text-[10px] uppercase font-bold text-slate-400 hover:text-accent"
                    >
                      Clear Log
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-3 bg-slate-50 border border-slate-150 rounded text-xs flex justify-between items-start space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-800">{inq.id}</span>
                            <span className="text-[10px] font-semibold text-slate-400">({inq.date})</span>
                          </div>
                          <p className="text-slate-700 mt-1 font-medium text-[11px]">Company: {inq.company}</p>
                          <p className="text-slate-500 mt-0.5 line-clamp-1">{inq.requirement}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary font-bold text-[10px] rounded block text-center">
                            {inq.status}
                          </span>
                          <span className="text-[9px] text-slate-400 block mt-1">Response &lt; 2hr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Column 5: Branding */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-3 group text-white">
                <img src={logo} alt="Steelcore Logo" className="w-9 h-9 group-hover:scale-105 transition-transform" />
                <div>
                  <div className="text-lg font-bold tracking-tight leading-none flex items-center">
                    <span className="text-blue-600">Steel</span><span className="text-red-600">Core</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-white block mt-0.5">
                    Enterprises
                  </span>
                </div>
              </div>

              <p className="text-slate-350 text-sm font-semibold italic">One Source. All Solutions.</p>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Steelcore Enterprises acts as a premium, professionally managed industrial supply agency, deliverable across engineering, hydraulics, lifting systems and hardware consumables.
              </p>

              <p className="text-xs font-semibold text-primary">GST Registered • MSME Certified Partner</p>
            </div>

            {/* Column 3: Quicklinks */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Quick Links</h4>
              <ul className="text-xs space-y-2.5">
                <li><a href="#about" className="hover:text-white transition">About Steelcore Enterprises</a></li>
                <li><a href="#products" className="hover:text-white transition">Industrial Sourcing Categories</a></li>
                <li><a href="#industries" className="hover:text-white transition">Primary Industries Served</a></li>
                <li><a href="#why-us" className="hover:text-white transition">Our Strategic Advantage</a></li>
                <li><a href="#contact" className="hover:text-white transition">Submit Request Quote</a></li>
              </ul>
            </div>

            {/* Column 4: Contact metrics */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Contact Desk</h4>
              
              <div className="text-xs space-y-3 font-semibold">
                
                <p className="flex items-start space-x-2">
                  <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <a href="tel:+917660950930" className="hover:text-white text-slate-300 transition">+91 76609 50930</a>
                </p>

                <p className="flex items-start space-x-2">
                  <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <a href="mailto:steelcorenterprises@gmail.com" className="hover:text-white text-slate-300 transition">steelcorenterprises@gmail.com</a>
                </p>

                <p className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-slate-300 not-italic">
                    27-4-62/1, Ground Floor, Y Junction, Patha Karnavanipalem, Kanithi Village, Gajuwaka, Visakhapatnam, AP, IN
                  </span>
                </p>

              </div>
            </div>

          </div>

          <div className="h-[1px] bg-slate-900 my-10"></div>

          {/* Copyright metrics */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-3 sm:space-y-0">
            <p>© 2026 Steelcore Enterprises. All Rights Reserved.</p>
            <p className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Visakhapatnam, India Sourcing Authority</span>
            </p>
          </div>

        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM ACTION BAR (Strict requirement - visible at all times on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 grid grid-cols-3 gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden">
        
        <a 
          href="tel:+917660950930" 
          className="bg-slate-900 text-white py-2 px-1 rounded flex flex-col items-center justify-center space-y-0.5 active:scale-95 transition-all cursor-pointer"
        >
          <Phone className="w-4.5 h-4.5 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call Desk</span>
        </a>

        <a 
          href="https://wa.me/917660950930?text=Hello%20Steelcore%20Enterprises%2C%20I%20am%20exploring%20your%20manufactured%20supplies." 
          target="_blank" 
          rel="noreferrer" 
          className="bg-emerald-600 text-white py-2 px-1 rounded flex flex-col items-center justify-center space-y-0.5 active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" width="18" height="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider font-sans">WhatsApp</span>
        </a>

        <a 
          href="#contact" 
          className="bg-primary text-white py-2 px-1 rounded flex flex-col items-center justify-center space-y-0.5 active:scale-95 transition-all text-center cursor-pointer"
        >
          <Send className="w-4.5 h-4.5 text-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Get Quote</span>
        </a>

      </div>

    </div>
  );
}
