'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Eye,
  Filter
} from 'lucide-react';
import { Property } from '@/types/property';

export default function AdminPropertiesListPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
        setFilteredProperties(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    let result = [...properties];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(q) ||
             p.location.toLowerCase().includes(q) ||
             p.developer.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== 'All') {
      result = result.filter(p => p.type.toLowerCase() === typeFilter.toLowerCase());
    }
    setFilteredProperties(result);
  }, [search, typeFilter, properties]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (prop: Property) => {
    try {
      const res = await fetch(`/api/properties/${prop.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !prop.featured })
      });
      if (res.ok) {
        setProperties(properties.map(p => p.id === prop.id ? { ...p, featured: !p.featured } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Manage Properties
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Total {properties.length} active luxury listings in the Home Circle Realty portfolio.
          </p>
        </div>

        <Link
          href="/admin/add"
          className="px-4 py-2.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by title, location, builder..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-gold-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Filter Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none focus:border-gold-500"
          >
            <option value="All">All Types</option>
            <option value="Villa">Luxury Villa</option>
            <option value="Villament">Villament</option>
            <option value="Penthouse">Sky Penthouse</option>
            <option value="Apartment">Apartment</option>
            <option value="Plot">Plot</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500">Loading portfolio...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-semibold text-gray-700">No properties found</p>
            <Link
              href="/admin/add"
              className="inline-block px-4 py-2 rounded-lg gold-gradient text-navy-950 font-bold text-xs"
            >
              Add a Property Now
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">BHK / Area</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prop.images && prop.images[0] ? prop.images[0] : ''}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/properties/${prop.slug || prop.id}`}
                            target="_blank"
                            className="font-bold text-gray-900 hover:text-gold-600 text-sm flex items-center gap-1"
                          >
                            <span>{prop.title}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </Link>
                          <div className="text-[11px] text-gray-500">{prop.developer}</div>
                          {prop.reraNumber && (
                            <div className="text-[10px] text-gray-400 font-mono">RERA: {prop.reraNumber}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                        {prop.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-navy-950 font-serif text-sm">
                      {prop.price}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      <div>{prop.location}</div>
                      <div className="text-[10px] text-gray-400">{prop.city}</div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-700">
                      <div>{prop.bedrooms > 0 ? `${prop.bedrooms} BHK` : 'Plot'}</div>
                      <div className="text-[11px] text-gray-400">{prop.superBuiltUpArea.toLocaleString()} sq.ft</div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(prop)}
                        className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                          prop.featured
                            ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title="Toggle Featured"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/properties/${prop.slug || prop.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-navy-950 hover:bg-gray-100"
                          title="View Live Property"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/edit/${prop.id}`}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="Edit Details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prop.id, prop.title)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
