import { useState, useEffect, useRef, type ReactNode } from "react";

// Custom color palette - cool professional tones
const colors = {
  bg: "#0f0f0f",
  bgCard: "#1a1a1a",
  bgCardHover: "#222",
  accent: "#00e7ff",
  accentMuted: "#00b8cc",
  text: "#f5f5f5",
  textMuted: "#9a9a9a",
  border: "#2a2a2a",
};

// Scroll-triggered animation hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Animated wrapper component for scroll reveals
interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Staggered animation for list items
interface StaggeredItemProps {
  children: ReactNode;
  index: number;
  baseDelay?: number;
  className?: string;
}

function StaggeredItem({ children, index, baseDelay = 0, className = "" }: StaggeredItemProps) {
  const { ref, isVisible } = useScrollReveal();
  const delay = baseDelay + index * 0.1;
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen" style={{ background: colors.bg, color: colors.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Instrument+Serif:ital@0;1&display=swap');
        
        .font-display { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        
        .waveform-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%2300e7ff08' d='M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,202.7C672,203,768,149,864,128C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: 100% 100%;
        }
        
        .audio-wave {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 40px;
        }
        .audio-wave span {
          width: 3px;
          background: ${colors.accent};
          border-radius: 2px;
          animation: wave 1.2s ease-in-out infinite;
        }
        .audio-wave span:nth-child(1) { height: 40%; animation-delay: 0s; }
        .audio-wave span:nth-child(2) { height: 70%; animation-delay: 0.1s; }
        .audio-wave span:nth-child(3) { height: 100%; animation-delay: 0.2s; }
        .audio-wave span:nth-child(4) { height: 60%; animation-delay: 0.3s; }
        .audio-wave span:nth-child(5) { height: 80%; animation-delay: 0.4s; }
        .audio-wave span:nth-child(6) { height: 45%; animation-delay: 0.5s; }
        
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced hover transitions */
        .hover-lift {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 231, 255, 0.1);
        }
        
        .hover-glow {
          transition: box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-glow:hover {
          box-shadow: 0 0 40px rgba(0, 231, 255, 0.25);
          transform: scale(1.02);
        }
        
        .hover-scale {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .link-underline {
          position: relative;
        }
        .link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: ${colors.accent};
          transition: width 0.3s ease;
        }
        .link-underline:hover::after {
          width: 100%;
        }
        
        /* Button pulse animation */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(0, 231, 255, 0.3); }
          50% { box-shadow: 0 0 50px rgba(0, 231, 255, 0.5); }
        }
        
        .btn-primary {
          animation: pulse-glow 3s ease-in-out infinite;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary:hover {
          transform: scale(1.05);
          animation: none;
          box-shadow: 0 0 50px rgba(0, 231, 255, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <nav className="font-body fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: `${colors.bg}ee`, borderColor: colors.border }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="./level-14-logo-cyan-flBDFSiBeks40vBdS1jDQ.png" 
              alt="Level 14" 
              className="h-10 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl">Level 14</span>
              <span className="text-xs tracking-wide" style={{ color: colors.textMuted }}>Audio Lab</span>
            </div>
          </div>
          <a 
            href="#contact" 
            className="px-5 py-2 rounded-full text-sm font-medium hover-scale"
            style={{ background: colors.accent, color: colors.bg }}
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Value Props */}
      <ValueSection />
      
      {/* Services & Pricing */}
      <ServicesSection />
      
      {/* Audio Samples */}
      <SamplesSection />
      
      {/* How It Works */}
      <ProcessSection />
      
      {/* FAQ */}
      <FAQSection />
      
      {/* Terms */}
      <TermsSection />
      
      {/* Contact */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="font-body py-8 text-center text-sm border-t" style={{ borderColor: colors.border, color: colors.textMuted }}>
        <p>© {new Date().getFullYear()} Level 14 — Audio Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden waveform-bg">
      <div className="absolute inset-0 opacity-20" style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.accent}15, transparent 60%)`
      }} />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p 
          className="font-body text-sm uppercase tracking-[0.3em] mb-6"
          style={{ 
            color: colors.accent,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
          }}
        >
          Podcast & Voice Post-Production
        </p>
        
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
          }}
        >
          Your Voice,<br/>
          <span style={{ color: colors.accent }}>Perfected</span>
        </h1>
        
        <p 
          className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-12"
          style={{ 
            color: colors.textMuted,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.35s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s"
          }}
        >
          Professional audio cleanup for podcasters, YouTubers, and content creators. 
          Crystal-clear dialogue, delivered fast.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s"
          }}
        >
          <a 
            href="#contact"
            className="font-body px-8 py-4 rounded-full text-lg font-semibold btn-primary"
            style={{ background: colors.accent, color: colors.bg }}
          >
            Send a Clip — Get a Free Sample
          </a>
          <a 
            href="#services"
            className="font-body px-8 py-4 rounded-full text-lg font-medium hover-lift border"
            style={{ borderColor: colors.border, color: colors.text }}
          >
            View Pricing
          </a>
        </div>
        
        <p 
          className="font-body text-sm mt-6"
          style={{ 
            color: colors.textMuted,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.65s"
          }}
        >
          Free before/after sample • No commitment required
        </p>
      </div>
    </section>
  );
}

function ValueSection() {
  const values = [
    { icon: "🎙️", title: "Clean, Consistent Audio", desc: "Remove noise, hum, and inconsistencies. Your listeners only hear your voice." },
    { icon: "💬", title: "No Meetings Required", desc: "Async workflow. Send your files, get them back polished. Simple." },
    { icon: "⚡", title: "48-Hour Turnaround", desc: "Standard delivery in 2 days. Need it faster? Rush options available." },
    { icon: "🔄", title: "1 Revision Included", desc: "Small tweaks included at no extra cost. We get it right." },
    { icon: "🎧", title: "Free Sample", desc: "Send 30-60 seconds. Get a before/after demo. No strings attached." },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4">
            Why <span style={{ color: colors.accent }}>Level 14</span>?
          </h2>
          <p className="font-body text-center mb-16 max-w-xl mx-auto" style={{ color: colors.textMuted }}>
            Professional results without the agency overhead
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <StaggeredItem key={i} index={i} baseDelay={0.1}>
              <div 
                className="p-6 rounded-2xl border hover-lift h-full"
                style={{ 
                  background: colors.bgCard, 
                  borderColor: colors.border,
                }}
              >
                <span className="text-3xl mb-4 block">{v.icon}</span>
                <h3 className="font-display text-xl mb-2">{v.title}</h3>
                <p className="font-body text-sm" style={{ color: colors.textMuted }}>{v.desc}</p>
              </div>
            </StaggeredItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const dialogueTiers = [
    { name: "Basic", duration: "Up to 10 min", price: "$79" },
    { name: "Standard", duration: "Up to 30 min", price: "$149", popular: true },
    { name: "Plus", duration: "Up to 60 min", price: "$249" },
  ];

  const retainerPlans = [
    { name: "Starter", episodes: "2 episodes/month", price: "$400/mo" },
    { name: "Regular", episodes: "4 episodes/month", price: "$650/mo", popular: true },
  ];

  const extras = [
    { name: "Rush 24h", price: "+40%" },
    { name: "Extra revision", price: "+$25" },
    { name: "Stems delivery", price: "+$30" },
    { name: "Intro/outro insert", price: "+$20" },
    { name: "Heavy de-reverb", price: "Quote" },
  ];

  return (
    <section id="services" className="py-24" style={{ background: colors.bgCard }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4">
            Simple <span style={{ color: colors.accent }}>Pricing</span>
          </h2>
          <p className="font-body text-center mb-16 max-w-xl mx-auto" style={{ color: colors.textMuted }}>
            One-time cleanups or monthly retainers. Pick what works for you.
          </p>
        </AnimatedSection>

        {/* Dialogue Cleanup */}
        <AnimatedSection delay={0.1} className="mb-16">
          <h3 className="font-display text-2xl mb-6 text-center">Dialogue Cleanup</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {dialogueTiers.map((tier, i) => (
              <StaggeredItem key={i} index={i} baseDelay={0.15}>
                <div 
                  className="p-6 rounded-2xl border text-center relative hover-glow h-full"
                  style={{ 
                    background: tier.popular ? `linear-gradient(135deg, ${colors.accent}15, ${colors.bg})` : colors.bg,
                    borderColor: tier.popular ? colors.accent : colors.border,
                  }}
                >
                  {tier.popular && (
                    <span 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold font-body"
                      style={{ background: colors.accent, color: colors.bg }}
                    >
                      POPULAR
                    </span>
                  )}
                  <h4 className="font-display text-xl mb-2">{tier.name}</h4>
                  <p className="font-body text-sm mb-4" style={{ color: colors.textMuted }}>{tier.duration}</p>
                  <p className="font-display text-4xl mb-4" style={{ color: colors.accent }}>{tier.price}</p>
                  <a 
                    href="#contact"
                    className="font-body block w-full py-3 rounded-full text-sm font-medium border hover-scale"
                    style={{ borderColor: colors.accent, color: colors.accent }}
                  >
                    Choose {tier.name}
                  </a>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Podcast Retainer */}
        <AnimatedSection delay={0.1} className="mb-16">
          <h3 className="font-display text-2xl mb-6 text-center">Podcast Edit Lite — Retainer</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {retainerPlans.map((plan, i) => (
              <StaggeredItem key={i} index={i} baseDelay={0.15}>
                <div 
                  className="p-6 rounded-2xl border text-center relative hover-glow h-full"
                  style={{ 
                    background: plan.popular ? `linear-gradient(135deg, ${colors.accent}15, ${colors.bg})` : colors.bg,
                    borderColor: plan.popular ? colors.accent : colors.border,
                  }}
                >
                  {plan.popular && (
                    <span 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold font-body"
                      style={{ background: colors.accent, color: colors.bg }}
                    >
                      BEST VALUE
                    </span>
                  )}
                  <h4 className="font-display text-xl mb-2">{plan.name}</h4>
                  <p className="font-body text-sm mb-4" style={{ color: colors.textMuted }}>{plan.episodes}</p>
                  <p className="font-display text-4xl mb-4" style={{ color: colors.accent }}>{plan.price}</p>
                  <a 
                    href="#contact"
                    className="font-body block w-full py-3 rounded-full text-sm font-medium border hover-scale"
                    style={{ borderColor: colors.accent, color: colors.accent }}
                  >
                    Start {plan.name}
                  </a>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Extras */}
        <AnimatedSection delay={0.1} className="max-w-2xl mx-auto">
          <h3 className="font-display text-xl mb-4 text-center">Add-ons & Extras</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {extras.map((extra, i) => (
              <span 
                key={i}
                className="font-body px-4 py-2 rounded-full text-sm border transition-all duration-300 hover:border-opacity-70"
                style={{ 
                  borderColor: colors.border, 
                  color: colors.textMuted,
                  transitionProperty: "border-color, transform",
                }}
              >
                {extra.name}: <span style={{ color: colors.accent }}>{extra.price}</span>
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function SamplesSection() {
  const samples = [
    { label: "Noise Reduction", desc: "Background hum, AC noise, room tone — gone." },
    { label: "Voice Leveling", desc: "Consistent volume throughout, no sudden jumps." },
    { label: "De-essing & Polish", desc: "Smooth sibilants, crisp and pleasant to hear." },
  ];

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4">
            Hear the <span style={{ color: colors.accent }}>Difference</span>
          </h2>
          <p className="font-body text-center mb-12 max-w-xl mx-auto" style={{ color: colors.textMuted }}>
            Real samples showing before and after treatment
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {samples.map((sample, i) => (
            <StaggeredItem key={i} index={i} baseDelay={0.1}>
              <div 
                className="p-6 rounded-2xl border hover-lift"
                style={{ background: colors.bgCard, borderColor: colors.border }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-xl mb-1">{sample.label}</h3>
                    <p className="font-body text-sm" style={{ color: colors.textMuted }}>{sample.desc}</p>
                  </div>
                  <span 
                    className="font-body text-xs px-3 py-1 rounded-full shrink-0"
                    style={{ background: colors.accent + "20", color: colors.accent }}
                  >
                    Sample {i + 1}
                  </span>
                </div>
                
                {/* Audio Player Placeholder */}
                <div 
                  className="rounded-xl p-4 flex items-center gap-4"
                  style={{ background: colors.bg }}
                >
                  <button 
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 hover-scale"
                    style={{ background: colors.accent }}
                  >
                    <svg className="w-5 h-5" fill={colors.bg} viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-body text-xs px-2 py-0.5 rounded" style={{ background: colors.border }}>Before</span>
                      <span className="font-body text-xs">→</span>
                      <span className="font-body text-xs px-2 py-0.5 rounded" style={{ background: colors.accent, color: colors.bg }}>After</span>
                    </div>
                    {/* Waveform visualization placeholder */}
                    <div className="h-8 rounded flex items-end gap-[2px]">
                      {Array.from({ length: 60 }).map((_, j) => (
                        <div 
                          key={j}
                          className="flex-1 rounded-sm transition-all duration-300"
                          style={{ 
                            height: `${20 + Math.random() * 80}%`,
                            background: j < 30 ? colors.textMuted : colors.accent,
                            opacity: j < 30 ? 0.3 : 0.8
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <span className="font-body text-xs" style={{ color: colors.textMuted }}>0:30</span>
                </div>
              </div>
            </StaggeredItem>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <p className="font-body text-center mt-8 text-sm" style={{ color: colors.textMuted }}>
            Want to hear your own audio? <a href="#contact" style={{ color: colors.accent }} className="link-underline">Send us a clip</a> for a free demo.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Send Your File", desc: "Upload WAV, MP3, or MP4. Choose your package." },
    { num: "02", title: "Confirm Details", desc: "We agree on scope and delivery (usually 48h)." },
    { num: "03", title: "First Version", desc: "Receive your cleaned audio for review." },
    { num: "04", title: "Revision", desc: "One round of small tweaks included." },
    { num: "05", title: "Final Delivery", desc: "Polished file + invoice. You're done." },
  ];

  return (
    <section className="py-24" style={{ background: colors.bgCard }}>
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4">
            How It <span style={{ color: colors.accent }}>Works</span>
          </h2>
          <p className="font-body text-center mb-16 max-w-xl mx-auto" style={{ color: colors.textMuted }}>
            Simple, frictionless workflow. No complexity, no surprises.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-[27px] top-0 bottom-0 w-[2px] hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.border})` }}
          />
          
          <div className="space-y-8">
            {steps.map((step, i) => (
              <StaggeredItem key={i} index={i} baseDelay={0.1}>
                <div className="flex gap-6 items-start group">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-display text-lg relative z-10 transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      background: colors.bg, 
                      border: `2px solid ${colors.accent}`, 
                      color: colors.accent,
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-display text-xl mb-1 transition-colors duration-300 group-hover:text-white">{step.title}</h3>
                    <p className="font-body text-sm" style={{ color: colors.textMuted }}>{step.desc}</p>
                  </div>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      q: "What file formats do you accept?",
      a: "WAV, MP3, and MP4 files. For best results, send the highest quality source you have—ideally uncompressed WAV."
    },
    {
      q: "What's included in dialogue cleanup?",
      a: "Noise reduction, de-essing, volume leveling, EQ, and compression to broadcast standards. We make your voice clear, consistent, and pleasant to listen to."
    },
    {
      q: "What's NOT included?",
      a: "Music mixing, heavy editing (cutting sections, rearranging), adding sound effects, or creating intro/outro music. We focus on making your voice sound professional."
    },
    {
      q: "What are your delivery standards?",
      a: "Podcast: -16 LUFS integrated, -1 dBTP peak. Web video: ~-14 LUFS integrated, -1 dBTP peak. We match your distribution platform's requirements."
    },
    {
      q: "What counts as a revision?",
      a: "Small tweaks: adjusting EQ, changing volume slightly, minor fixes. Major changes (different processing approach, re-editing) count as new work."
    },
    {
      q: "Can you fix really bad audio?",
      a: "We work miracles when possible, but heavily clipped, distorted, or echoey recordings have limits. We'll be honest if your source audio needs more work—those cases are quoted separately."
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4">
            Common <span style={{ color: colors.accent }}>Questions</span>
          </h2>
          <p className="font-body text-center mb-12" style={{ color: colors.textMuted }}>
            Everything you need to know before getting started
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <StaggeredItem key={i} index={i} baseDelay={0.1}>
              <div 
                className="rounded-xl border overflow-hidden transition-all duration-300"
                style={{ 
                  background: colors.bgCard, 
                  borderColor: openIndex === i ? colors.accent : colors.border 
                }}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-5 text-left flex justify-between items-center font-body font-medium transition-colors duration-200"
                >
                  {faq.q}
                  <span 
                    className="text-2xl transition-transform duration-300"
                    style={{ 
                      color: colors.accent,
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}
                  >
                    +
                  </span>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-400 ease-out"
                  style={{ 
                    maxHeight: openIndex === i ? '200px' : '0',
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <div 
                    className="px-5 pb-5 font-body text-sm"
                    style={{ color: colors.textMuted }}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            </StaggeredItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function TermsSection() {
  const terms = [
    "No meetings required — async by default. Optional call if needed.",
    "1 revision included (small tweaks only).",
    "Send one final file per project. Multiple versions = new work.",
    "Not responsible for miracles on heavily clipped/distorted/echoey source audio.",
    "Heavy de-reverb or extreme restoration quoted separately.",
  ];

  return (
    <section className="py-16" style={{ background: colors.bg }}>
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection>
          <h3 className="font-display text-2xl text-center mb-8">
            Working <span style={{ color: colors.accent }}>Terms</span>
          </h3>
        </AnimatedSection>
        
        <AnimatedSection delay={0.1}>
          <div 
            className="p-6 rounded-2xl border"
            style={{ background: colors.bgCard, borderColor: colors.border }}
          >
            <ul className="space-y-3">
              {terms.map((term, i) => (
                <li 
                  key={i} 
                  className="font-body text-sm flex items-start gap-3 transition-all duration-300"
                  style={{ 
                    transitionDelay: `${i * 0.05}s`
                  }}
                >
                  <span style={{ color: colors.accent }}>•</span>
                  <span style={{ color: colors.textMuted }}>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24" style={{ background: colors.bgCard }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Let's <span style={{ color: colors.accent }}>Talk Audio</span>
          </h2>
          <p className="font-body mb-12" style={{ color: colors.textMuted }}>
            Send a clip, ask a question, or just say hello. We respond within 24 hours.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <a 
            href="mailto:hello@onzeaudiolab.com"
            className="font-body inline-block px-10 py-5 rounded-full text-xl font-semibold btn-primary"
            style={{ background: colors.accent, color: colors.bg }}
          >
            hello@onzeaudiolab.com
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="mt-12 pt-8 border-t" style={{ borderColor: colors.border }}>
            <p className="font-body text-sm mb-4" style={{ color: colors.textMuted }}>
              Payment options
            </p>
            <div className="flex justify-center gap-6">
              <span className="font-body text-sm transition-colors duration-300 hover:text-white cursor-default" style={{ color: colors.text }}>PayPal</span>
              <span className="font-body text-sm transition-colors duration-300 hover:text-white cursor-default" style={{ color: colors.text }}>Wise</span>
              <span className="font-body text-sm transition-colors duration-300 hover:text-white cursor-default" style={{ color: colors.text }}>Stripe</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Index;
