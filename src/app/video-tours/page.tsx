'use client';

import React, { useState } from 'react';
import { Youtube, ExternalLink, Play, Sparkles, ShieldCheck } from 'lucide-react';

export default function VideoToursPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const channelVideos = [
    {
      id: 'aqz-KE-bpKQ',
      title: 'Ultra Luxury 5 BHK Presidential Spanish Villa with Private Heated Infinity Pool',
      location: 'IVC Road, Near Kempegowda International Airport, Bengaluru',
      price: '₹12.50 Cr',
      duration: '14:20',
      thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      description: 'Step inside this Mediterranean architectural masterpiece boasting double-height ceilings, private hydraulic elevator, and bespoke Italian marble finishes.'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Whitefield Duplex Sky Penthouse with 360° Panoramic Deck & Plunge Pool',
      location: 'ITPL Main Road, Whitefield, Bengaluru',
      price: '₹7.45 Cr',
      duration: '16:05',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      description: 'Exclusive tour of a 4,920 sq.ft duplex penthouse featuring landscaped open-to-sky terrace gardens and direct private elevator foyer.'
    },
    {
      id: '3JZ_D3ELwOQ',
      title: 'Triplex Villament with Private 600 sq.ft Lawn & Solarium in Yelahanka',
      location: 'Doddaballapur Road, Yelahanka, Bengaluru',
      price: '₹4.85 Cr',
      duration: '11:45',
      thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      description: 'Experience the privacy of a villa with the security of a luxury gated community. Featuring 4 master suites and German modular fittings.'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Contemporary Courtyard Villa with Zen Water Garden | Sarjapur Corridor',
      location: 'Sarjapur Road, Near RGA Tech Park, Bengaluru',
      price: '₹3.95 Cr',
      duration: '12:30',
      thumbnail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      description: 'Stunning 3 BHK independent villa designed around a serene open-to-sky courtyard with custom waterfall feature and rooftop gazebo.'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-[#080E1A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute -top-12 -right-12 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/20 text-red-400 border border-red-500/30">
              <Youtube className="w-4 h-4 fill-red-400" />
              <span>Official YouTube Channel Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Home Circle Realty <span className="gold-text-gradient">Video Walkthroughs</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Immerse yourself in 4K luxury property walkthroughs across Bangalore&apos;s most prestigious addresses. Subscribe to our official channel for weekly high-end home tours.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-red-600/30 flex items-center gap-2"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Subscribe to Channel</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition flex items-center gap-1.5"
              >
                <span>View All Channel Videos</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Video Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {channelVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative h-64 sm:h-72 w-full cursor-pointer overflow-hidden bg-gray-900"
                onClick={() => setSelectedVideo(video.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-semibold bg-black/80 text-white">
                  {video.duration}
                </div>

                <div className="absolute top-3 left-3 px-3 py-1 rounded text-xs font-bold bg-navy-950/80 backdrop-blur-md text-gold-400">
                  {video.price}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-gray-500 font-medium">{video.location}</div>
                  <h3 
                    onClick={() => setSelectedVideo(video.id)}
                    className="text-lg font-bold text-gray-900 hover:text-gold-600 transition cursor-pointer mt-1"
                  >
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedVideo(video.id)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-red-600" />
                    <span>Watch Full Walkthrough</span>
                  </button>
                  <a
                    href={`https://wa.me/917676290057?text=Hello%20Home%20Circle%20Realty,%20I%20saw%20your%20video%20tour%20for%20${encodeURIComponent(video.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Inquire on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="Homecircle Realty Video Walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
