import React from 'react';
import Link from 'next/link';
import { Home, Phone, Mail, Youtube, Instagram, ExternalLink, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060A13] text-gray-400 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 rounded-full bg-[#080E1A] flex items-center justify-center">
                  <Home className="w-4 h-4 text-gold-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-white tracking-wide">HOME CIRCLE</span>
                <span className="text-gold-400 font-sans text-xs ml-1.5 font-semibold uppercase tracking-wider">REALTY</span>
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Bengaluru&apos;s premier luxury real estate advisory firm. Similar to leading property consultancies, we curate verified high-yield residential villas, villaments, sky penthouses, and gated communities across North &amp; East Bangalore.
            </p>

            {/* YouTube Channel Promo */}
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 max-w-md">
              <div className="flex items-start gap-3">
                <Youtube className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Homecircle Realty YouTube Channel</h4>
                  <p className="text-xs text-gray-300 mt-0.5">Watch 4K luxury property walkthroughs, villa tours, and Bengaluru market insights.</p>
                  <a 
                    href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold mt-2"
                  >
                    <span>Watch Channel Walkthroughs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram Promo */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/30 to-pink-950/30 border border-pink-500/20 max-w-md">
              <div className="flex items-start gap-3">
                <Instagram className="w-6 h-6 text-pink-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Instagram @homecirclerealty</h4>
                  <p className="text-xs text-gray-300 mt-0.5">Follow daily villa reels, behind-the-scenes tours, and new launch previews.</p>
                  <a 
                    href="https://www.instagram.com/homecirclerealty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 font-semibold mt-2"
                  >
                    <span>Follow on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Property Portfolios */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">
              Property Types
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?type=Villa" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-400" /> Luxury Independent Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Villament" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-400" /> Premium Villaments
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Penthouse" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-400" /> Sky Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Apartment" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-400" /> Luxury High-Rise Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Plot" className="hover:text-gold-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-400" /> Plotted Gated Communities
                </Link>
              </li>
            </ul>
          </div>

          {/* Bengaluru Prime Corridors */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">
              Prime Locations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?location=Yelahanka" className="hover:text-gold-400 transition">
                  Yelahanka &amp; Doddaballapur Rd
                </Link>
              </li>
              <li>
                <Link href="/properties?location=IVC" className="hover:text-gold-400 transition">
                  IVC Road &amp; Airport Corridor
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Whitefield" className="hover:text-gold-400 transition">
                  Whitefield &amp; EPIP IT Corridor
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Sarjapur" className="hover:text-gold-400 transition">
                  Sarjapur Road &amp; Carmelaram
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Indiranagar" className="hover:text-gold-400 transition">
                  Indiranagar &amp; Sadashivanagar
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Devanahalli" className="hover:text-gold-400 transition">
                  Devanahalli Aerospace SEZ
                </Link>
              </li>
            </ul>
          </div>

          {/* Advisory & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">
              Advisory Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+917676290057" className="hover:text-gold-300 transition">+91-7676290057</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@homecirclerealty.in" className="hover:text-gold-300 transition">info@homecirclerealty.in</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <a href="https://www.instagram.com/homecirclerealty" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition">@homecirclerealty</a>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Home Circle Realty. All rights reserved. Registered Real Estate Consultant, Karnataka RERA.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-gray-400 transition">Disclaimer</Link>
            <Link href="/about" className="hover:text-gray-400 transition">Privacy Policy</Link>
            <Link href="/calculator" className="hover:text-gray-400 transition">EMI Calculator</Link>
          </div>
        </div>

        <div className="mt-4 text-[11px] text-gray-600 leading-normal">
          Disclaimer: All project information, layouts, specifications, and prices are subject to developer revisions and Karnataka RERA compliance. Home Circle Realty acts as a luxury real estate advisory and channel marketing partner.
        </div>
      </div>
    </footer>
  );
}
