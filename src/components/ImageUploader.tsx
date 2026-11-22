'use client';

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  X, 
  Star, 
  Link as LinkIcon, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  ImageIcon,
  CheckCircle2
} from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle files upload
  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      // Try uploading to /api/upload
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.urls && data.urls.length > 0) {
        onChange([...images, ...data.urls]);
      } else {
        // Fallback: Read as base64 Data URLs so images ALWAYS work even without a writable filesystem
        const dataUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          const p = new Promise<string>((resolve) => {
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
          const url = await p;
          if (url) dataUrls.push(url);
        }
        onChange([...images, ...dataUrls]);
      }
    } catch (err) {
      console.error('Upload failed, falling back to client-side data URLs:', err);
      // Fallback to Data URLs
      const dataUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const p = new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        const url = await p;
        if (url) dataUrls.push(url);
      }
      onChange([...images, ...dataUrls]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange([...images, urlInput.trim()]);
    setUrlInput('');
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const remaining = images.filter((_, i) => i !== index);
    onChange([selected, ...remaining]);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleAddSamplePhotos = () => {
    const samples = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80'
    ];
    onChange([...images, ...samples]);
  };

  return (
    <div className="space-y-4">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      {/* Drag & Drop Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-gold-500 bg-gold-50/50 scale-[0.99]'
            : 'border-gray-300 hover:border-gold-400 bg-stone-50/60 hover:bg-white'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center text-navy-950 shadow-md">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div>
            <div className="text-sm font-bold text-gray-900">
              {isUploading ? (
                <span className="text-gold-600 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-gold-600 border-t-transparent rounded-full animate-spin" />
                  Uploading images...
                </span>
              ) : (
                <span>Click to Upload or Drag &amp; Drop Property Photos</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Supports PNG, JPG, JPEG, and WebP (multiple files allowed at once)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 shadow-sm"
            >
              Select Images From Device
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowUrlInput(!showUrlInput);
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-xs flex items-center gap-1.5"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>{showUrlInput ? 'Hide URL Input' : 'Add via Image URL'}</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddSamplePhotos();
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-gold-300 text-gold-700 hover:bg-gold-50 font-semibold text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Add Sample Luxury Photos</span>
            </button>
          </div>
        </div>
      </div>

      {/* URL Input Form (Collapsible) */}
      {showUrlInput && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Add Image by Web Link
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 p-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-gold-500"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-2.5 rounded-lg gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105"
            >
              Add Photo
            </button>
          </div>
        </div>
      )}

      {/* Uploaded Gallery Grid Preview */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-gold-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Property Gallery ({images.length} Photos)
            </h4>
          </div>
          {images.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-red-500 hover:text-red-700 font-semibold"
            >
              Clear All Photos
            </button>
          )}
        </div>

        {images.length === 0 ? (
          <div className="p-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">
            No photos added yet. Upload from your device above or click &quot;Add Sample Luxury Photos&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {images.map((imgUrl, index) => (
              <div
                key={index}
                className={`group relative rounded-xl overflow-hidden bg-gray-900 border-2 shadow-sm transition-all ${
                  index === 0 ? 'border-gold-500 ring-2 ring-gold-400/30' : 'border-gray-200'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-video w-full bg-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`Property photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Cover Badge on first image */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider gold-gradient text-navy-950 shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-navy-950 text-navy-950" />
                    <span>Cover Photo</span>
                  </div>
                )}

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center transition shadow-md"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Reorder and Set Cover Controls Overlay */}
                <div className="p-2 bg-white/95 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'left')}
                      className="p-1 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-25"
                      title="Move earlier"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-semibold text-gray-500 font-mono">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      disabled={index === images.length - 1}
                      onClick={() => handleMove(index, 'right')}
                      className="p-1 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-25"
                      title="Move later"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(index)}
                      className="text-[10px] text-gold-700 hover:text-gold-900 font-bold hover:underline"
                    >
                      Set as Cover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
