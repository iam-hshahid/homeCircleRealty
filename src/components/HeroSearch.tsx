'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Home, IndianRupee, Layers } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'All' | 'Villa' | 'Penthouse' | 'Villament' | 'Plot'>('All');
  const [location, setLocation] = useState('All');
  const [bedrooms, setBedrooms] = useState('All');
  const [budget, setBudget] = useState('All');
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (activeTab !== 'All') params.append('type', activeTab);
    if (location !== 'All') params.append('location', location);
    if (bedrooms !== 'All') params.append('bedrooms', bedrooms);
    if (keyword.trim()) params.append('q', keyword.trim());

    if (budget === 'under3cr') {
      params.append('maxPrice', '30000000');
    } else if (budget === '3to5cr') {
      params.append('minPrice', '30000000');
      params.append('maxPrice', '50000000');
    } else if (budget === '5to10cr') {
      params.append('minPrice', '50000000');
      params.append('maxPrice', '100000000');
    } else if (budget === 'above10cr') {
      params.append('minPrice', '100000000');
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-3">
        {[
          { label: 'All Properties', value: 'All' },
          { label: 'Luxury Villas', value: 'Villa' },
          { label: 'Villaments', value: 'Villament' },
          { label: 'Sky Penthouses', value: 'Penthouse' },
          { label: 'Plots & Land', value: 'Plot' },
        ].map(tab => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value as any)}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab.value
                ? 'bg-white text-navy-900 shadow-md border-t-2 border-gold-500'
                : 'bg-black/40 text-gray-300 hover:bg-black/60 backdrop-blur-sm'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Search Container */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-none shadow-2xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
      >
        {/* Keyword / Project */}
        <div className="lg:col-span-1 border-b sm:border-b-0 sm:border-r border-gray-100 pb-2 sm:pb-0 sm:pr-3">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Search Project
          </label>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gold-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="e.g. Prestige, Sobha..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="border-b sm:border-b-0 sm:border-r border-gray-100 pb-2 sm:pb-0 sm:pr-3">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Location / Corridor
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs sm:text-sm text-gray-800 bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="All">All Bengaluru</option>
              <option value="Yelahanka">Yelahanka</option>
              <option value="IVC">IVC Road / Airport Corridor</option>
              <option value="Whitefield">Whitefield</option>
              <option value="Sarjapur">Sarjapur Road</option>
              <option value="Indiranagar">Indiranagar / Central</option>
              <option value="Devanahalli">Devanahalli</option>
            </select>
          </div>
        </div>

        {/* BHK Bedrooms */}
        <div className="border-b sm:border-b-0 lg:border-r border-gray-100 pb-2 sm:pb-0 sm:pr-3">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Configuration
          </label>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-gold-500 flex-shrink-0" />
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full text-xs sm:text-sm text-gray-800 bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="All">Any BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK Mansions</option>
            </select>
          </div>
        </div>

        {/* Budget */}
        <div className="pb-2 sm:pb-0 sm:pr-3">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Budget Range
          </label>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-gold-500 flex-shrink-0" />
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full text-xs sm:text-sm text-gray-800 bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="All">Any Budget</option>
              <option value="under3cr">Under ₹3.00 Cr</option>
              <option value="3to5cr">₹3.00 Cr - ₹5.00 Cr</option>
              <option value="5to10cr">₹5.00 Cr - ₹10.00 Cr</option>
              <option value="above10cr">Above ₹10.00 Cr</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Luxury</span>
          </button>
        </div>
      </form>
    </div>
  );
}
