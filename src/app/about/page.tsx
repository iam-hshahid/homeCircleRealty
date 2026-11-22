import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, Users, CheckCircle2, Youtube, ArrowRight, Building2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>About Home Circle Realty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Curating Bangalore&apos;s Finest Real Estate Heritage
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Home Circle Realty is a boutique luxury real estate advisory and consulting firm headquartered in Bengaluru. Similar to esteemed luxury brokerages, we guide High Net-Worth Individuals (HNIs), NRIs, and institutional investors to acquire bespoke residential assets.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm">
          <div className="space-y-6">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Our Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Transforming Luxury Real Estate into an Elevated Art Form
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Founded on principles of absolute transparency, architectural rigor, and personalized advisory, Home Circle Realty bridges the gap between Bangalore&apos;s most prestigious developers and discerning homebuyers.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Through our popular YouTube channel walkthroughs, we bring millions of viewers inside Bangalore&apos;s most exclusive gated enclaves, villas in Yelahanka &amp; IVC Road, and sky penthouses in Whitefield.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Visit YouTube Channel</span>
              </a>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full gold-gradient text-navy-950 text-xs font-bold"
              >
                Schedule Private Meeting
              </Link>
            </div>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-900">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Home Circle Realty Architecture"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-navy-950">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Karnataka RERA Compliant</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero tolerance for unregistered or legally gray projects. Every property listed by Home Circle Realty possesses verified title clearances, sanctioned plans, and active RERA registrations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-navy-950">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Tier-1 Developer Partnerships</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Direct authorized marketing alliances with Bangalore&apos;s leading builders including Prestige Group, Sobha Limited, Total Environment, Assetz, and Brigade.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-navy-950">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Bespoke Concierge Advisory</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              From private chauffeur site visits to home loan facilitation and legal agreement reviews, we provide high-touch advisory throughout your purchase journey.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
