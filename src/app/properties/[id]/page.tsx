'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  ShieldCheck, 
  Youtube, 
  CheckCircle2, 
  Calendar, 
  Compass, 
  Building2, 
  PhoneCall, 
  Share2, 
  Heart, 
  ArrowLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import EMICalculator from '@/components/EMICalculator';
import SiteVisitModal from '@/components/SiteVisitModal';
import { Property } from '@/types/property';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/properties/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProperty(data.data);
          if (data.data.images && data.data.images.length > 0) {
            setActiveImage(data.data.images[0]);
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Loading Property Portfolio...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF9F6] text-center p-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Property Not Found</h2>
        <p className="text-sm text-gray-500 mt-2 mb-6">The requested luxury residence could not be found or has been sold.</p>
        <Link href="/properties" className="px-6 py-2.5 rounded-full gold-gradient text-navy-950 text-xs font-bold uppercase tracking-wider">
          Browse Available Properties
        </Link>
      </div>
    );
  }

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          email: inquiryEmail,
          propertyId: property.id,
          propertyTitle: property.title,
          inquiryType: 'Price Inquiry',
          message: `Inquiry for ${property.title} (${property.price})`
        })
      });
      if (res.ok) {
        setInquirySubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Home Circle Realty, I am interested in viewing "${property.title}" (${property.price}) located in ${property.location}. Please share the floor plans, video tour, and arrange a site visit.`
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#080E1A] text-white py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-gold-400 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>RERA: <strong className="text-white font-mono">{property.reraNumber || 'Verified'}</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Title and Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase gold-gradient text-navy-950">
                {property.type}
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-800">
                {property.possessionStatus}
              </span>
              <span className="text-xs text-gold-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{property.developer}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0" />
              <span>{property.location}, {property.city}</span>
            </p>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-navy-950">
              {property.price}
            </div>
            {property.pricePerSqFt && (
              <div className="text-xs text-gray-500 font-medium mt-0.5">
                {property.pricePerSqFt}
              </div>
            )}
          </div>
        </div>

        {/* Gallery & Hero Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
          {/* Main Large Image */}
          <div className="lg:col-span-3 relative h-[380px] sm:h-[500px] rounded-2xl overflow-hidden bg-gray-900 shadow-md">
            <Image
              src={activeImage || property.images[0]}
              alt={property.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Thumbnail list */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[500px] scrollbar-none">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`relative h-24 lg:h-36 w-32 lg:w-full flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-gold-500 scale-[0.98]' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${property.title} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Key Quick Specifications Bar */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Bedrooms</span>
            <span className="text-lg font-bold text-navy-900 mt-1 flex items-center justify-center gap-1.5">
              <Bed className="w-5 h-5 text-gold-500" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Plot'}</span>
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Bathrooms</span>
            <span className="text-lg font-bold text-navy-900 mt-1 flex items-center justify-center gap-1.5">
              <Bath className="w-5 h-5 text-gold-500" />
              <span>{property.bathrooms || '-'}</span>
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Super Built-up</span>
            <span className="text-lg font-bold text-navy-900 mt-1 flex items-center justify-center gap-1.5">
              <Maximize className="w-5 h-5 text-gold-500" />
              <span>{property.superBuiltUpArea.toLocaleString()} sq.ft</span>
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Furnishing</span>
            <span className="text-sm font-bold text-navy-900 mt-2 block">
              {property.furnishing}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Facing</span>
            <span className="text-sm font-bold text-navy-900 mt-2 flex items-center justify-center gap-1">
              <Compass className="w-4 h-4 text-gold-500" />
              <span>{property.facing}</span>
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Possession</span>
            <span className="text-sm font-bold text-emerald-700 mt-2 block">
              {property.possessionDate || property.possessionStatus}
            </span>
          </div>
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          
          {/* Left Column: Details, Walkthrough Video, Highlights, Amenities */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* 1. Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-bold text-gray-900 pb-3 border-b border-gray-100">
                Property Overview
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* 2. YouTube Video Tour Walkthrough */}
            {(property.youtubeId || property.youtubeUrl) && (
              <div className="bg-[#080E1A] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
                      <Youtube className="w-4 h-4 fill-red-400" />
                      <span>Official Home Circle Walkthrough</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-white mt-1">
                      Virtual Video Tour
                    </h3>
                  </div>

                  <a
                    href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                  >
                    <Youtube className="w-3.5 h-3.5 fill-white" />
                    <span>Subscribe to Channel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${property.youtubeId || 'aqz-KE-bpKQ'}`}
                    title={`${property.title} Video Tour`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Watch full 4K walkthrough on the official Home Circle Realty YouTube channel.
                </p>
              </div>
            )}

            {/* 3. Key Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-xl font-serif font-bold text-gray-900 pb-3 border-b border-gray-100">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {property.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-xl font-serif font-bold text-gray-900 pb-3 border-b border-gray-100">
                  World-Class Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 border border-gray-100 text-xs font-medium text-gray-800 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. EMI Calculator */}
            <div className="mt-8">
              <EMICalculator initialPrice={property.numericPrice} />
            </div>
          </div>

          {/* Right Column: Sticky Booking Card & Quick Contact */}
          <div className="space-y-6">
            <div className="sticky top-28 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
              
              <div>
                <span className="text-xs uppercase tracking-wider text-gold-600 font-semibold">Bespoke Inquiry</span>
                <h3 className="text-2xl font-serif font-bold text-navy-950 mt-1">Schedule VIP Visit</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Private chauffeur pickup &amp; complete project documentation pack.
                </p>
              </div>

              {inquirySubmitted ? (
                <div className="py-6 text-center space-y-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Inquiry Received</h4>
                  <p className="text-xs text-emerald-700">
                    Our lead consultant will call you shortly on {inquiryPhone} with verified details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Reddy"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 76762 XXXXX"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-lg shadow-gold-500/20 disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Request Instant Callback'}
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-gray-100 space-y-2.5">
                <a
                  href={`https://wa.me/917676290057?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center block transition shadow-md"
                >
                  Chat on WhatsApp Now
                </a>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition text-center block"
                >
                  Book Private Site Visit
                </button>
              </div>

              <div className="text-center pt-2 text-[11px] text-gray-400 space-y-1">
                <p>0% Brokerage on Developer New Launches</p>
                <p>Karnataka RERA Authorized Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteVisitModal
        property={property}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
