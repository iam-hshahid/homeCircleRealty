'use client';

import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function YouTubeShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videoTours = [
    {
      id: 'aqz-KE-bpKQ',
      title: 'Mega 5 BHK Spanish Presidential Villa Walkthrough | IVC Road Bangalore',
      duration: '14:20',
      category: 'Luxury Villa Tour',
      location: 'IVC Road, Near Airport',
      views: '42K views',
      thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3JZ_D3ELwOQ',
      title: 'Triplex Villament with Private Solarium & Lawn | Yelahanka Bangalore',
      duration: '11:45',
      category: 'Villament Tour',
      location: 'Yelahanka, North Bangalore',
      views: '28K views',
      thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Duplex Penthouse with Private Plunge Pool & Sky Garden | Whitefield',
      duration: '16:05',
      category: 'Sky Penthouse',
      location: 'Whitefield EPIP Corridor',
      views: '35K views',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080E1A] text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/20 text-red-400 border border-red-500/30 mb-3">
              <Youtube className="w-4 h-4 fill-red-400" />
              <span>Official YouTube Channel Walkthroughs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
              Watch 4K Luxury Home <span className="gold-text-gradient">Video Tours</span>
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              Experience immersive walkthroughs of Bengaluru&apos;s most coveted luxury villas, penthouses, and gated communities directly through the official Home Circle Realty YouTube channel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-wide uppercase transition shadow-lg shadow-red-600/30 flex items-center gap-2"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Subscribe on YouTube</span>
            </a>
            <a
              href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <span>Visit Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {videoTours.map((video) => (
            <div
              key={video.id}
              className="group bg-[#0d1626] rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative h-56 w-full cursor-pointer overflow-hidden"
                onClick={() => setSelectedVideo(video.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Big Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration and Views Badges */}
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] font-medium bg-black/80 text-white">
                  {video.duration}
                </span>

                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/70 text-gold-400 border border-gold-500/30">
                  {video.category}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-1">{video.location}</div>
                  <h3 
                    onClick={() => setSelectedVideo(video.id)}
                    className="text-sm sm:text-base font-semibold text-white group-hover:text-gold-400 transition cursor-pointer line-clamp-2"
                  >
                    {video.title}
                  </h3>
                </div>

                <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>{video.views}</span>
                  <button
                    onClick={() => setSelectedVideo(video.id)}
                    className="text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1"
                  >
                    <span>Play Walkthrough</span>
                    <Play className="w-3 h-3 fill-gold-400" />
                  </button>
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
                  title="Homecircle Realty Property Walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
