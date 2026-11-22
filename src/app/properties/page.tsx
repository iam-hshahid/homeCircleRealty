'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import SiteVisitModal from '@/components/SiteVisitModal';
import { Property } from '@/types/property';
import { Search, Filter, SlidersHorizontal, RotateCcw, Home, Sparkles } from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All');
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get('bedrooms') || 'All');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All');
  const [priceSort, setPriceSort] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  const [selectedModalProperty, setSelectedModalProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProperties(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Synchronize state when URL query params change (e.g. clicking Navbar "Luxury Villas", "Penthouses", etc.)
  useEffect(() => {
    setSelectedType(searchParams.get('type') || 'All');
    setSelectedLocation(searchParams.get('location') || 'All');
    setSelectedBedrooms(searchParams.get('bedrooms') || 'All');
    setSelectedStatus(searchParams.get('status') || 'All');
    setKeyword(searchParams.get('q') || '');
  }, [searchParams]);

  // Filter effect
  useEffect(() => {
    let result = [...properties];

    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.developer.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedType !== 'All') {
      result = result.filter((p) => p.type.toLowerCase() === selectedType.toLowerCase());
    }

    if (selectedLocation !== 'All') {
      result = result.filter(
        (p) =>
          p.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
          p.area.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedBedrooms !== 'All') {
      const bhk = parseInt(selectedBedrooms);
      if (selectedBedrooms.includes('5')) {
        result = result.filter((p) => p.bedrooms >= 5);
      } else {
        result = result.filter((p) => p.bedrooms === bhk);
      }
    }

    if (selectedStatus !== 'All') {
      result = result.filter(
        (p) => p.possessionStatus.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    if (priceSort === 'low-to-high') {
      result.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (priceSort === 'high-to-low') {
      result.sort((a, b) => b.numericPrice - a.numericPrice);
    }

    setFilteredProperties(result);
  }, [properties, keyword, selectedType, selectedLocation, selectedBedrooms, selectedStatus, priceSort]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedType('All');
    setSelectedLocation('All');
    setSelectedBedrooms('All');
    setSelectedStatus('All');
    setPriceSort('default');
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', '/properties');
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gold-600 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bengaluru Luxury Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Exclusive Properties &amp; Residences
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse verified luxury villas, penthouses, and villaments across Bangalore&apos;s prime growth corridors.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Keyword Search */}
            <div className="lg:col-span-1">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Project or builder..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2 px-3 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="All">All Types</option>
                <option value="Villa">Luxury Villa</option>
                <option value="Villament">Villament</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Apartment">Apartment</option>
                <option value="Plot">Villa Plot</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-2 px-3 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="All">All Bengaluru</option>
                <option value="Yelahanka">Yelahanka</option>
                <option value="IVC">IVC Road / Airport</option>
                <option value="Whitefield">Whitefield</option>
                <option value="Sarjapur">Sarjapur Road</option>
                <option value="Indiranagar">Indiranagar</option>
                <option value="Devanahalli">Devanahalli</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Bedrooms
              </label>
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="w-full py-2 px-3 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="All">Any BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5+ BHK Mansions</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Sort By Price
              </label>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="w-full py-2 px-3 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="default">Featured / Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
            <span>
              Showing <strong className="text-gray-900">{filteredProperties.length}</strong> matching luxury properties
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-gold-600 hover:text-gold-700 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="py-24 text-center text-gray-500 font-medium">Loading luxury collection...</div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onBookVisit={(p) => {
                  setSelectedModalProperty(p);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 space-y-4">
            <Home className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-xl font-bold font-serif text-gray-800">No properties matched your criteria</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Try adjusting your bedroom configuration, budget, or location filters to see available listings.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

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

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading properties...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
