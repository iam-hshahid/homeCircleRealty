'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Building2, 
  IndianRupee, 
  MapPin, 
  Home, 
  Youtube, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Save
} from 'lucide-react';
import { Property } from '@/types/property';

export default function AdminEditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [developer, setDeveloper] = useState('');
  const [type, setType] = useState<'Villa' | 'Villament' | 'Apartment' | 'Penthouse' | 'Plot' | 'Commercial'>('Villa');
  const [price, setPrice] = useState('');
  const [numericPrice, setNumericPrice] = useState('');
  const [pricePerSqFt, setPricePerSqFt] = useState('');
  
  // Location
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('');

  // Specifications
  const [bedrooms, setBedrooms] = useState('0');
  const [bathrooms, setBathrooms] = useState('0');
  const [balconies, setBalconies] = useState('0');
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState('0');
  const [carpetArea, setCarpetArea] = useState('0');
  const [furnishing, setFurnishing] = useState<'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished'>('Semi-Furnished');
  const [facing, setFacing] = useState<'East' | 'North' | 'North-East' | 'West' | 'South'>('East');
  const [possessionStatus, setPossessionStatus] = useState<'Ready to Move' | 'Under Construction' | 'New Launch' | 'Resale'>('Ready to Move');
  const [possessionDate, setPossessionDate] = useState('');
  const [reraNumber, setReraNumber] = useState('');

  // YouTube Walkthrough
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeId, setYoutubeId] = useState('');

  // Media Images
  const [imagesText, setImagesText] = useState('');
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);

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

  useEffect(() => {
    fetch(`/api/properties/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const p: Property = data.data;
          setTitle(p.title || '');
          setTagline(p.tagline || '');
          setDeveloper(p.developer || '');
          setType(p.type || 'Villa');
          setPrice(p.price || '');
          setNumericPrice(String(p.numericPrice || ''));
          setPricePerSqFt(p.pricePerSqFt || '');
          setLocation(p.location || '');
          setArea(p.area || '');
          setCity(p.city || 'Bengaluru');
          setPincode(p.pincode || '');
          setBedrooms(String(p.bedrooms || 0));
          setBathrooms(String(p.bathrooms || 0));
          setBalconies(String(p.balconies || 0));
          setSuperBuiltUpArea(String(p.superBuiltUpArea || 0));
          setCarpetArea(String(p.carpetArea || 0));
          setFurnishing(p.furnishing || 'Semi-Furnished');
          setFacing(p.facing || 'East');
          setPossessionStatus(p.possessionStatus || 'Ready to Move');
          setPossessionDate(p.possessionDate || '');
          setReraNumber(p.reraNumber || '');
          setYoutubeId(p.youtubeId || '');
          setYoutubeUrl(p.youtubeUrl || '');
          setImagesText((p.images || []).join('\n'));
          setDescription(p.description || '');
          setHighlightsText((p.highlights || []).join('\n'));
          setSelectedAmenities(p.amenities || []);
          setFeatured(Boolean(p.featured));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const imagesArray = imagesText.split('\n').map(u => u.trim()).filter(Boolean);
      const highlightsArray = highlightsText.split('\n').map(h => h.trim()).filter(Boolean);

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

      const res = await fetch(`/api/properties/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/properties');
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-500">Loading property data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <Link
            href="/admin/properties"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy-950 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Properties List</span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            Edit Property: {title}
          </h1>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Property updated successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">General Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Developer</label>
              <input
                type="text"
                required
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-white"
              >
                <option value="Villa">Luxury Villa</option>
                <option value="Villament">Villament</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Apartment">Apartment</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Price (Formatted)</label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Numeric Price (INR)</label>
              <input
                type="number"
                required
                value={numericPrice}
                onChange={(e) => setNumericPrice(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Location &amp; Specs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Bedrooms (BHK)</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Bathrooms</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Super Built-up (sq.ft)</label>
              <input
                type="number"
                value={superBuiltUpArea}
                onChange={(e) => setSuperBuiltUpArea(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Possession Status</label>
              <select
                value={possessionStatus}
                onChange={(e) => setPossessionStatus(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-white"
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
                <option value="Resale">Resale</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">YouTube Walkthrough</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">YouTube Video ID</label>
              <input
                type="text"
                value={youtubeId}
                onChange={(e) => setYoutubeId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Channel / Video URL</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="edit-featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-gold-600 rounded"
            />
            <label htmlFor="edit-featured" className="text-xs font-semibold text-gray-800 cursor-pointer">
              Mark as Featured Property
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Saving...' : 'Update Property'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
