'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  PlusCircle, 
  ArrowLeft, 
  Building2, 
  IndianRupee, 
  MapPin, 
  Home, 
  Youtube, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  HelpCircle
} from 'lucide-react';

export default function AdminAddPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [developer, setDeveloper] = useState('Prestige Signature / Top Developer');
  const [type, setType] = useState<'Villa' | 'Villament' | 'Apartment' | 'Penthouse' | 'Plot' | 'Commercial'>('Villa');
  const [price, setPrice] = useState('₹5.50 Cr');
  const [numericPrice, setNumericPrice] = useState('55000000');
  const [pricePerSqFt, setPricePerSqFt] = useState('₹14,500 / sq.ft');
  
  // Location
  const [location, setLocation] = useState('Yelahanka, North Bengaluru');
  const [area, setArea] = useState('Yelahanka / Airport Road');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('560064');

  // Specifications
  const [bedrooms, setBedrooms] = useState('4');
  const [bathrooms, setBathrooms] = useState('5');
  const [balconies, setBalconies] = useState('3');
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState('4200');
  const [carpetArea, setCarpetArea] = useState('3500');
  const [furnishing, setFurnishing] = useState<'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished'>('Semi-Furnished');
  const [facing, setFacing] = useState<'East' | 'North' | 'North-East' | 'West' | 'South'>('East');
  const [possessionStatus, setPossessionStatus] = useState<'Ready to Move' | 'Under Construction' | 'New Launch' | 'Resale'>('Ready to Move');
  const [possessionDate, setPossessionDate] = useState('Immediate');
  const [reraNumber, setReraNumber] = useState('PRM/KA/RERA/1250/303/PR/240115/006120');

  // YouTube Walkthrough
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug');
  const [youtubeId, setYoutubeId] = useState('aqz-KE-bpKQ');

  // Media Images (newline separated URLs)
  const [imagesText, setImagesText] = useState(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80\nhttps://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80\nhttps://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80'
  );

  // Description & Highlights
  const [description, setDescription] = useState(
    'An architectural marvel offering expansive living pavilions, double-height ceilings, private landscaped garden, and state-of-the-art smart home automation. Located in one of Bengaluru’s most sought-after luxury corridors with seamless access to premier international schools, tech parks, and Kempegowda International Airport.'
  );
  const [highlightsText, setHighlightsText] = useState(
    'Private temperature-controlled swimming pool & deck\nDirect private elevator serving all levels\nItalian Statuario marble flooring across all living rooms\nZero common walls ensuring complete family privacy\n100% Vastu compliant East-facing entrance'
  );

  // Amenities
  const allAmenitiesList = [
    'Private Swimming Pool',
    'Private Elevator',
    'Home Automation',
    'Clubhouse Access',
    '24/7 Security & CCTV',
    'EV Charging Station',
    '100% Power Backup',
    'Private Landscaped Lawn',
    'Tennis & Badminton Courts',
    'Gymnasium & Spa',
    'Italian Marble Flooring',
    'Vastu Compliant',
    'Solar Water Heating',
    'Rainwater Harvesting',
    'Concierge Services'
  ];

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Private Swimming Pool',
    'Private Elevator',
    'Home Automation',
    'Clubhouse Access',
    '24/7 Security & CCTV',
    'EV Charging Station',
    '100% Power Backup',
    'Private Landscaped Lawn',
    'Italian Marble Flooring'
  ]);

  const [featured, setFeatured] = useState(true);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleFillSample = () => {
    setTitle('The Sovereign Grand Lake Villa');
    setTagline('Exclusive 5 BHK Mediterranean Estate with Private Plunge Pool & Solar Deck');
    setDeveloper('Sobha Royal Signature');
    setType('Villa');
    setPrice('₹9.85 Cr');
    setNumericPrice('98500000');
    setPricePerSqFt('₹16,400 / sq.ft');
    setLocation('IVC Road Corridor, North Bengaluru');
    setArea('North Bengaluru');
    setCity('Bengaluru');
    setPincode('562110');
    setBedrooms('5');
    setBathrooms('6');
    setBalconies('4');
    setSuperBuiltUpArea('6000');
    setCarpetArea('5100');
    setFurnishing('Fully Furnished');
    setFacing('East');
    setPossessionStatus('Ready to Move');
    setPossessionDate('Immediate');
    setReraNumber('PRM/KA/RERA/1250/303/PR/231120/005990');
    setYoutubeId('aqz-KE-bpKQ');
    setYoutubeUrl('https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const imagesArray = imagesText
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const highlightsArray = highlightsText
        .split('\n')
        .map(h => h.trim())
        .filter(h => h.length > 0);

      const payload = {
        title,
        tagline,
        developer,
        type,
        price,
        numericPrice: Number(numericPrice) || 0,
        pricePerSqFt,
        location,
        area,
        city,
        pincode,
        bedrooms: Number(bedrooms) || 0,
        bathrooms: Number(bathrooms) || 0,
        balconies: Number(balconies) || 0,
        superBuiltUpArea: Number(superBuiltUpArea) || 0,
        carpetArea: Number(carpetArea) || 0,
        furnishing,
        facing,
        possessionStatus,
        possessionDate,
        reraNumber,
        youtubeUrl,
        youtubeId,
        images: imagesArray,
        description,
        highlights: highlightsArray,
        amenities: selectedAmenities,
        featured
      };

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(true);
        setTimeout(() => {
          router.push(`/properties/${data.data.slug || data.data.id}`);
        }, 1500);
      } else {
        alert(data.error || 'Failed to create property');
      }
    } catch (err: any) {
      alert(`Error saving property: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy-950 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Add New Property Details
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Publish a new luxury residence or investment opportunity to the Home Circle Realty public catalogue.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleFillSample}
            className="px-3.5 py-2 rounded-lg bg-white border border-gold-300 text-gold-700 hover:bg-gold-50 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Auto-fill Luxury Sample</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-xs sm:text-sm font-semibold">
            Property successfully published! Redirecting to public property view...
          </div>
        </div>
      )}

      {/* Main Add Property Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: Basic Information */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Building2 className="w-5 h-5 text-gold-500" />
            <h2 className="text-base font-bold text-gray-900">1. Basic Property Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Property Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Presidential Spanish Lake Villa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Tagline / Subheading
              </label>
              <input
                type="text"
                placeholder="e.g. 5 BHK Spanish Architectural Villa with Private Heated Pool"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Property Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="Villa">Luxury Independent Villa</option>
                <option value="Villament">Premium Villament</option>
                <option value="Penthouse">Sky Duplex Penthouse</option>
                <option value="Apartment">Luxury Apartment</option>
                <option value="Plot">Gated Villa Plot</option>
                <option value="Commercial">Commercial Asset</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Developer / Builder Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Prestige Group / Sobha / Total Environment"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Pricing & Financials */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <IndianRupee className="w-5 h-5 text-gold-500" />
            <h2 className="text-base font-bold text-gray-900">2. Pricing &amp; Commercials</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Display Price (formatted) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹8.50 Cr or ₹95 Lakh"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 font-serif font-bold text-navy-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Numeric Price (INR for filters) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 85000000"
                value={numericPrice}
                onChange={(e) => setNumericPrice(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Price per Sq.Ft
              </label>
              <input
                type="text"
                placeholder="e.g. ₹15,200 / sq.ft"
                value={pricePerSqFt}
                onChange={(e) => setPricePerSqFt(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Location Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <MapPin className="w-5 h-5 text-gold-500" />
            <h2 className="text-base font-bold text-gray-900">3. Location &amp; Micro-Market</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Specific Location / Landmark *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IVC Road, Near Kempegowda International Airport"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Micro-Market Area
              </label>
              <input
                type="text"
                placeholder="e.g. Yelahanka / North Bengaluru"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Specifications & Configuration */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Home className="w-5 h-5 text-gold-500" />
            <h2 className="text-base font-bold text-gray-900">4. Property Specifications</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Bedrooms (BHK)
              </label>
              <input
                type="number"
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                min="0"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Balconies
              </label>
              <input
                type="number"
                min="0"
                value={balconies}
                onChange={(e) => setBalconies(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Facing
              </label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value as any)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="East">East (Vastu)</option>
                <option value="North">North</option>
                <option value="North-East">North-East</option>
                <option value="West">West</option>
                <option value="South">South</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Super Built-up Area (sq.ft) *
              </label>
              <input
                type="number"
                required
                value={superBuiltUpArea}
                onChange={(e) => setSuperBuiltUpArea(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Carpet Area (sq.ft)
              </label>
              <input
                type="number"
                value={carpetArea}
                onChange={(e) => setCarpetArea(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Furnishing Status
              </label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value as any)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Possession Status
              </label>
              <select
                value={possessionStatus}
                onChange={(e) => setPossessionStatus(e.target.value as any)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
                <option value="Resale">Resale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Possession Date / Timeline
              </label>
              <input
                type="text"
                placeholder="e.g. Immediate or Dec 2025"
                value={possessionDate}
                onChange={(e) => setPossessionDate(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Karnataka RERA Number
              </label>
              <input
                type="text"
                placeholder="PRM/KA/RERA/..."
                value={reraNumber}
                onChange={(e) => setReraNumber(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: Media & YouTube Channel Walkthrough */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Youtube className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-gray-900">5. YouTube Video Tour &amp; Photos</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                YouTube Video ID (11 chars)
              </label>
              <input
                type="text"
                placeholder="e.g. aqz-KE-bpKQ"
                value={youtubeId}
                onChange={(e) => setYoutubeId(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Found in YouTube URL: youtube.com/watch?v=<strong>aqz-KE-bpKQ</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Client YouTube Channel / Video URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug"
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Image URLs (one URL per line)
              </label>
              <textarea
                rows={4}
                value={imagesText}
                onChange={(e) => setImagesText(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-xs font-mono focus:outline-none focus:border-gold-500"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Paste high-resolution photo URLs (Unsplash or direct CDN links). The first image will be used as the primary card cover.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 6: Description & Highlights */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Sparkles className="w-5 h-5 text-gold-500" />
            <h2 className="text-base font-bold text-gray-900">6. Narrative &amp; Highlights</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Detailed Property Description *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              placeholder="Write a rich description of the architecture, finishings, and neighborhood..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Key Highlights (one bullet per line)
            </label>
            <textarea
              rows={4}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
              placeholder="Private swimming pool with heater&#10;Direct elevator access&#10;Italian marble throughout..."
            />
          </div>
        </div>

        {/* SECTION 7: Amenities Checklist */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-gold-500" />
              <h2 className="text-base font-bold text-gray-900">7. Amenities &amp; Features</h2>
            </div>
            <span className="text-xs text-gray-500">{selectedAmenities.length} selected</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allAmenitiesList.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{amenity}</span>
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 8: Featured Toggle & Submit */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured-toggle"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 text-gold-600 accent-gold-500 rounded cursor-pointer"
            />
            <label htmlFor="featured-toggle" className="cursor-pointer">
              <strong className="text-sm font-bold text-gray-900 block">Feature on Homepage</strong>
              <span className="text-xs text-gray-500">Show this property in the featured hero carousel and spotlight grid</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-gold-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{submitting ? 'Saving Property...' : 'Save &amp; Publish Property'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
