'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Youtube, ShieldCheck, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locationPref, setLocationPref] = useState('All');
  const [budget, setBudget] = useState('3to5cr');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          inquiryType: 'Site Visit',
          budget,
          message: `Location: ${locationPref}. ${message}`
        })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Connect with our Advisors</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900">
            Contact Home Circle Realty
          </h1>
          <p className="text-sm text-gray-600">
            Schedule a private consultation or arrange a chauffeur-driven site visit across Bangalore&apos;s finest residential developments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Details Card */}
          <div className="bg-[#080E1A] text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Bengaluru Head Office</span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">Get in Touch</h3>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Advisory Lounge</strong>
                    Level 4, Circle Tower, 100 Feet Road, Koramangala 7th Block &amp; Yelahanka Hub, Bengaluru 560034
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Direct Line &amp; WhatsApp</strong>
                    <a href="tel:+917676290057" className="hover:text-gold-300 transition">+91-7676290057</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Email Advisory</strong>
                    <a href="mailto:info@homecirclerealty.in" className="hover:text-gold-300 transition">info@homecirclerealty.in</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Operating Hours</strong>
                    Monday – Sunday: 9:30 AM – 7:30 PM IST
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube Channel Promo */}
            <div className="pt-6 border-t border-white/10">
              <a
                href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-red-600/30 hover:bg-red-600/40 border border-red-500/40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <Youtube className="w-4 h-4 fill-red-500 text-red-500" />
                <span>Visit YouTube Video Channel</span>
              </a>
            </div>
          </div>

          {/* Contact & Site Visit Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Message Received!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, {name}. Our senior luxury advisor will review your preferences and get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">Send an Inquiry or Schedule a Site Visit</h3>
                  <p className="text-xs text-gray-500 mt-1">Fill out the form below and an advisor will contact you within 30 minutes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 76762 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Preferred Location
                    </label>
                    <select
                      value={locationPref}
                      onChange={(e) => setLocationPref(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 bg-white"
                    >
                      <option value="All">Any Bengaluru Corridor</option>
                      <option value="Yelahanka / IVC">Yelahanka / IVC Road</option>
                      <option value="Whitefield">Whitefield</option>
                      <option value="Sarjapur">Sarjapur Road</option>
                      <option value="Indiranagar">Indiranagar / Central</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Requirements &amp; Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you are looking for (e.g. 4 BHK villa with private pool near airport)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-lg shadow-gold-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Inquiry &amp; Request Callback'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
