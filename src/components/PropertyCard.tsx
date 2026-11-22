'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Maximize, MapPin, Youtube, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onBookVisit?: (property: Property) => void;
}

export default function PropertyCard({ property, onBookVisit }: PropertyCardProps) {
  const primaryImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  const whatsappMessage = encodeURIComponent(
    `Hello Home Circle Realty, I am interested in "${property.title}" priced at ${property.price} in ${property.location}. Please share the brochure and video walkthrough details.`
  );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Property Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-900">
        <Image
          src={primaryImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <div className="flex flex-wrap gap-1.5">
            {property.featured && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase gold-gradient text-navy-950 flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" /> FEATURED
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
              {property.type}
            </span>
          </div>

          <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-emerald-600/90 backdrop-blur-md text-white">
            {property.possessionStatus}
          </span>
        </div>

        {/* YouTube Video Tour Available Indicator */}
        {(property.youtubeId || property.youtubeUrl) && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-600/90 text-white backdrop-blur-md shadow-md">
              <Youtube className="w-3.5 h-3.5 fill-white" />
              <span>Video Walkthrough</span>
            </span>
          </div>
        )}

        {/* Price Tag in Image */}
        <div className="absolute bottom-3 right-3 z-10 text-right">
          <div className="text-xl font-bold font-serif text-white drop-shadow-md">
            {property.price}
          </div>
          {property.pricePerSqFt && (
            <div className="text-[11px] text-gray-300 font-medium drop-shadow-sm">
              {property.pricePerSqFt}
            </div>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gold-600 font-semibold mb-1 uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            <span>{property.developer}</span>
          </div>

          <Link href={`/properties/${property.slug || property.id}`}>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gold-600 transition line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{property.location}</span>
          </p>

          <p className="text-xs text-gray-600 mt-2.5 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Specifications Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 mt-3 border-y border-gray-100 text-xs text-gray-700 bg-stone-50/70 rounded-lg px-3">
            {property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span className="font-semibold">{property.bedrooms} <span className="text-gray-500 font-normal">BHK</span></span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span className="font-semibold">Plot</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-gold-600 flex-shrink-0" />
              <span className="font-semibold">{property.bathrooms || 1} <span className="text-gray-500 font-normal">Baths</span></span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-gold-600 flex-shrink-0" />
              <span className="font-semibold">{property.superBuiltUpArea.toLocaleString()} <span className="text-gray-500 font-normal">sq.ft</span></span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-2 flex items-center gap-2">
          <Link
            href={`/properties/${property.slug || property.id}`}
            className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950 transition text-center flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={`https://wa.me/917676290057?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition border border-emerald-200 text-xs font-semibold"
            title="Chat on WhatsApp"
          >
            WhatsApp
          </a>

          <button
            onClick={() => onBookVisit && onBookVisit(property)}
            className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-gold-50 text-gold-800 hover:bg-gold-500 hover:text-navy-950 transition border border-gold-300"
          >
            Site Visit
          </button>
        </div>
      </div>
    </div>
  );
}
