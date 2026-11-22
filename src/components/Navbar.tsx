'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Phone, Mail, Youtube, Instagram, Menu, X, ShieldCheck, Calculator, Compass, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#080E1A]/95 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Top Banner / Agency Info */}
      <div className="bg-[#0c1626] border-b border-white/5 py-1.5 px-4 text-xs font-light text-gray-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold-400">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Bengaluru&apos;s Signature Real Estate &amp; Advisory</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <a 
              href="https://www.instagram.com/homecirclerealty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition font-medium"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden md:inline">@homecirclerealty</span>
            </a>
            <a 
              href="mailto:info@homecirclerealty.in"
              className="hidden lg:flex items-center gap-1.5 hover:text-gold-300 transition text-gray-300"
            >
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>info@homecirclerealty.in</span>
            </a>
            <a 
              href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition font-medium"
            >
              <Youtube className="w-4 h-4" />
              <span className="hidden sm:inline">Homecircle Tours</span>
            </a>
            <a 
              href="tel:+917676290057" 
              className="flex items-center gap-1 hover:text-gold-300 transition text-gray-200"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-medium">+91-7676290057</span>
            </a>
            <Link 
              href="/admin" 
              className="px-2 py-0.5 rounded text-[11px] bg-white/10 hover:bg-gold-500 hover:text-navy-950 transition font-medium text-gray-200"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <div className="w-9 h-9 rounded-full bg-[#080E1A] flex items-center justify-center">
                <Home className="w-5 h-5 text-gold-400" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-1">
                <span>HOME CIRCLE</span>
                <span className="text-gold-400 font-sans text-sm font-semibold tracking-widest uppercase">REALTY</span>
              </div>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">Luxury Residences &amp; Advisory</p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <Link href="/" className="text-gray-200 hover:text-gold-400 transition">
              Home
            </Link>
            <Link href="/properties" className="text-gray-200 hover:text-gold-400 transition">
              All Properties
            </Link>
            <Link href="/properties?type=Villa" className="text-gray-200 hover:text-gold-400 transition">
              Luxury Villas
            </Link>
            <Link href="/properties?type=Penthouse" className="text-gray-200 hover:text-gold-400 transition">
              Penthouses
            </Link>
            <Link href="/video-tours" className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition">
              <Youtube className="w-4 h-4" />
              <span>Video Tours</span>
            </Link>
            <Link href="/calculator" className="flex items-center gap-1 text-gray-200 hover:text-gold-400 transition">
              <Calculator className="w-3.5 h-3.5 text-gold-400" />
              <span>EMI Calculator</span>
            </Link>
            <Link href="/about" className="text-gray-200 hover:text-gold-400 transition">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-200 hover:text-gold-400 transition">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/917676290057?text=Hello%20Home%20Circle%20Realty,%20I%20am%20interested%20in%20Bangalore%20luxury%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm flex items-center gap-1.5"
            >
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/contact?type=SiteVisit"
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase rounded-full gold-gradient text-navy-950 hover:brightness-110 transition shadow-lg shadow-gold-500/20"
            >
              Book Site Visit
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080E1A] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Home
          </Link>
          <Link 
            href="/properties" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Explore All Properties
          </Link>
          <Link 
            href="/properties?type=Villa" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Luxury Villas &amp; Mansions
          </Link>
          <Link 
            href="/properties?type=Penthouse" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Sky Penthouses
          </Link>
          <Link 
            href="/video-tours" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-base font-medium text-red-400 hover:text-red-300"
          >
            <Youtube className="w-5 h-5" />
            <span>YouTube Video Tours</span>
          </Link>
          <a 
            href="https://www.instagram.com/homecirclerealty" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-base font-medium text-pink-400 hover:text-pink-300"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram @homecirclerealty</span>
          </a>
          <Link 
            href="/calculator" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Mortgage EMI Calculator
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-gold-400"
          >
            About Home Circle Realty
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Contact &amp; Site Visit
          </Link>
          <Link 
            href="/admin" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gold-400 hover:underline"
          >
            Admin Management Portal →
          </Link>

          <div className="pt-4 flex flex-col gap-2">
            <a
              href="https://wa.me/917676290057"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-sm font-semibold rounded-lg bg-emerald-600 text-white"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact?type=SiteVisit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold rounded-lg gold-gradient text-navy-950"
            >
              Book a Private Site Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
