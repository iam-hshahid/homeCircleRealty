'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Building2, 
  Users, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Youtube, 
  PhoneCall, 
  Home as HomeIcon,
  Search,
  Star
} from 'lucide-react';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import EMICalculator from '@/components/EMICalculator';
import SiteVisitModal from '@/components/SiteVisitModal';
import { Property } from '@/types/property';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedModalProperty, setSelectedModalProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProperties(data.data);
        }
      })
      .catch((err) => console.error('Failed to fetch properties:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleBookVisit = (property: Property) => {
    setSelectedModalProperty(property);
    setModalOpen(true);
  };

  const filteredProperties = properties.filter((p) => {
    if (selectedType === 'All') return true;
    if (selectedType === 'Featured') return p.featured;
    return p.type.toLowerCase() === selectedType.toLowerCase();
  });

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#080E1A] text-white pt-16 pb-20 overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Bangalore Villa"
            fill
            priority
            className="object-cover opacity-25 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E1A] via-[#080E1A]/70 to-[#080E1A]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold-300 text-xs sm:text-sm font-medium backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Bengaluru&apos;s Signature Real Estate &amp; Advisory Agency</span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
              Discover Bangalore&apos;s <br />
              <span className="gold-text-gradient">Most Exclusive</span> Residences
            </h1>
            <p className="text-base sm:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Curated luxury villas, villaments, and sky mansions across Yelahanka, IVC Road, Whitefield, and Sarjapur. Featuring verified RERA projects and YouTube 4K video walkthroughs.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-300 font-medium pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>0% Brokerage on Developer Launches</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gold-400" />
              <span>Prestige • Sobha • Total Environment</span>
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Official 4K Video Walkthroughs</span>
            </div>
          </div>

          {/* Search Widget */}
          <div className="pt-4">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* 2. TRUST / STATS BAR */}
      <section className="bg-[#0C1628] text-white py-10 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">₹650+ Cr</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Transaction Volume</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">420+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Luxury Homes Delivered</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">50+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Premier Builder Partners</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">RERA Verified Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked Luxury Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Featured Properties in <span className="text-gold-600">Bengaluru</span>
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Explore our signature residences offering high capital appreciation, prime connectivity, and international luxury standards.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All', value: 'All' },
                { label: 'Featured', value: 'Featured' },
                { label: 'Villas', value: 'Villa' },
                { label: 'Villaments', value: 'Villament' },
                { label: 'Penthouses', value: 'Penthouse' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedType(tab.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedType === tab.value
                      ? 'gold-gradient text-navy-950 shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading luxury residences...</div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onBookVisit={handleBookVisit}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-3">
              <HomeIcon className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-base font-bold text-gray-800">No properties found in this category</h3>
              <p className="text-xs text-gray-500">Please choose another category or reset your filter.</p>
              <button
                onClick={() => setSelectedType('All')}
                className="px-4 py-2 rounded-lg gold-gradient text-navy-950 text-xs font-bold"
              >
                Show All Properties
              </button>
            </div>
          )}

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950 font-bold text-xs uppercase tracking-wider transition shadow-lg"
            >
              <span>Explore All {properties.length} Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. YOUTUBE VIDEO TOURS SHOWCASE (Client Channel) */}
      <YouTubeShowcase />

      {/* 5. WHY HOME CIRCLE REALTY (Advisory & RSquare Reality style benefits) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>The Home Circle Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              Why Discerning Buyers Choose Us
            </h2>
            <p className="text-sm text-gray-600">
              Unlike generic listing portals, Home Circle Realty operates as your dedicated real estate advisory partner with end-to-end legal, financial, and site visit support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-stone-50 border border-gray-100 hover:border-gold-300 transition duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-navy-950 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">100% Verified Legal Due Diligence</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every residential villa and apartment is thoroughly vetted for clear title deeds, A-Katha status, and strict Karnataka RERA registration before being presented to you.
              </p>
              <div className="pt-2 text-xs font-semibold text-gold-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Legal Ambiguity</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-stone-50 border border-gray-100 hover:border-gold-300 transition duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-navy-950 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">0% Brokerage on Builder Units</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                As official channel partners with Tier-1 builders (Prestige, Sobha, Total Environment, Brigade), our professional advisory and booking assistance is 100% free of brokerage fees.
              </p>
              <div className="pt-2 text-xs font-semibold text-gold-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Direct Developer Pricing</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-stone-50 border border-gray-100 hover:border-gold-300 transition duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-navy-950 shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">VIP Chauffeur &amp; Site Visits</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We organize personalized site visits with luxury chauffeur service, on-ground walkthroughs, and comprehensive micro-market comparative analytics.
              </p>
              <div className="pt-2 text-xs font-semibold text-gold-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bespoke Luxury Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BENGALURU PRIME CORRIDORS SHOWCASE */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-gold-600 uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>High-Growth Real Estate Hubs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Bengaluru Prime Corridors
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Strategically located micro-markets commanding the strongest capital appreciation and infrastructure expansion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Corridor 1 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 shadow-md cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="North Bangalore"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Airport &amp; Luxury Hub</span>
                <h3 className="text-xl font-bold font-serif">Yelahanka &amp; IVC Road</h3>
                <p className="text-xs text-gray-300">Home to world-class golf communities, gated villas, and the International Airport corridor.</p>
                <Link
                  href="/properties?location=Yelahanka"
                  className="inline-flex items-center gap-1 text-xs text-gold-400 font-semibold pt-2 group-hover:translate-x-1 transition"
                >
                  <span>Explore Villas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Corridor 2 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 shadow-md cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                alt="Whitefield Tech Hub"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Tech Corridor</span>
                <h3 className="text-xl font-bold font-serif">Whitefield &amp; EPIP Zone</h3>
                <p className="text-xs text-gray-300">Bengaluru&apos;s established IT capital featuring premium sky penthouses and luxury high-rises.</p>
                <Link
                  href="/properties?location=Whitefield"
                  className="inline-flex items-center gap-1 text-xs text-gold-400 font-semibold pt-2 group-hover:translate-x-1 transition"
                >
                  <span>Explore Penthouses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Corridor 3 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 shadow-md cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
                alt="Sarjapur"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Family &amp; Green Enclaves</span>
                <h3 className="text-xl font-bold font-serif">Sarjapur Road &amp; ORR</h3>
                <p className="text-xs text-gray-300">Modern triplex villaments, international schools, and seamless commute to tech parks.</p>
                <Link
                  href="/properties?location=Sarjapur"
                  className="inline-flex items-center gap-1 text-xs text-gold-400 font-semibold pt-2 group-hover:translate-x-1 transition"
                >
                  <span>Explore Villaments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MORTGAGE EMI CALCULATOR SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EMICalculator initialPrice={65000000} />
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS */}
      <section className="py-20 bg-[#080E1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
              <span>Customer Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Trusted by HNI Buyers &amp; Investors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-2xl bg-[#0D1626] border border-white/10 space-y-4">
              <div className="flex gap-1 text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                &quot;We discovered Home Circle Realty through their YouTube channel walkthrough of an IVC Road villa. Ameen and his advisory team arranged our private visit and helped negotiate direct builder discounts. Flawless experience!&quot;
              </p>
              <div>
                <h4 className="text-sm font-bold text-white">Sanjay &amp; Priya Singhania</h4>
                <p className="text-xs text-gray-400">Buyers at Prestige Golfshire Corridor</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0D1626] border border-white/10 space-y-4">
              <div className="flex gap-1 text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                &quot;The transparency and knowledge of RERA legalities at Home Circle Realty is unmatched in Bangalore. They showed us 4 ultra-luxury penthouses in Whitefield and helped us finalize our dream home with 0% brokerage.&quot;
              </p>
              <div>
                <h4 className="text-sm font-bold text-white">Rajiv Nambiar</h4>
                <p className="text-xs text-gray-400">VP, Global Semiconductor Firm</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0D1626] border border-white/10 space-y-4">
              <div className="flex gap-1 text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                &quot;Being an NRI living in Dubai, finding genuine luxury property walkthroughs online was tough until I came across Home Circle Realty&apos;s video tours. They handled site inspections, legal vetting, and registration smoothly.&quot;
              </p>
              <div>
                <h4 className="text-sm font-bold text-white">Farhan Siddiqui</h4>
                <p className="text-xs text-gray-400">NRI Investor (Dubai / Bengaluru)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. VIP SITE VISIT BOOKING BANNER */}
      <section className="py-16 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-navy-900/80">
                Exclusive Homeowner Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-950">
                Ready to Experience Luxury in Person?
              </h2>
              <p className="text-sm text-navy-900 max-w-xl">
                Book a private chauffeur-driven property tour with our senior luxury advisors. Get complimentary comparative market reports and exclusive launch pricing.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-navy-950 text-white hover:bg-navy-900 font-bold text-xs uppercase tracking-wider transition shadow-xl"
              >
                Schedule Private Site Visit
              </button>
              <a
                href="tel:+917676290057"
                className="px-6 py-3.5 rounded-full bg-white/30 text-navy-950 hover:bg-white/50 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call +91-7676290057</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Site Visit Modal */}
      <SiteVisitModal
        property={selectedModalProperty}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedModalProperty(null);
        }}
      />
    </div>
  );
}
