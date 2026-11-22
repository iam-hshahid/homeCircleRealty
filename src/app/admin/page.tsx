'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  PlusCircle, 
  MessageSquare, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  ExternalLink,
  Search,
  Youtube
} from 'lucide-react';
import { Property, Inquiry } from '@/types/property';

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [propRes, inqRes] = await Promise.all([
        fetch('/api/properties'),
        fetch('/api/inquiries')
      ]);
      const propData = await propRes.json();
      const inqData = await inqRes.json();

      if (propData.success) setProperties(propData.data);
      if (inqData.success) setInquiries(inqData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const featuredCount = properties.filter(p => p.featured).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Agency Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your Home Circle Realty property portfolio, video walkthrough links, and client leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/add"
            className="px-4 py-2.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Property</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Properties</span>
            <div className="text-3xl font-bold font-serif text-navy-950 mt-1">{properties.length}</div>
            <Link href="/admin/properties" className="text-xs text-gold-600 hover:underline mt-1 inline-block">
              View all listings →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured Homes</span>
            <div className="text-3xl font-bold font-serif text-navy-950 mt-1">{featuredCount}</div>
            <span className="text-xs text-gray-400 mt-1 inline-block">Promoted on homepage</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Inquiries</span>
            <div className="text-3xl font-bold font-serif text-navy-950 mt-1">{inquiries.length}</div>
            <Link href="/admin/inquiries" className="text-xs text-gold-600 hover:underline mt-1 inline-block">
              Manage leads →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">YouTube Channel</span>
            <div className="text-sm font-bold text-gray-900 mt-1">Homecircle Realty</div>
            <a 
              href="https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-red-600 hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>Watch channel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Youtube className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Properties Management Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-gray-900">Recent Property Listings</h2>
            <p className="text-xs text-gray-500">Live listings visible to buyers on the public website</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/add"
              className="px-3.5 py-1.5 rounded-lg gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Property</span>
            </Link>
            <Link
              href="/admin/properties"
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50"
            >
              View All ({properties.length})
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500">Loading listings...</div>
        ) : properties.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-sm text-gray-500">No properties in the database yet.</p>
            <Link
              href="/admin/add"
              className="inline-block px-4 py-2 rounded-lg gold-gradient text-navy-950 font-bold text-xs"
            >
              Add First Property
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.slice(0, 6).map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prop.images && prop.images[0] ? prop.images[0] : ''}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/properties/${prop.slug || prop.id}`} target="_blank" className="font-semibold text-gray-900 hover:text-gold-600 flex items-center gap-1">
                            <span>{prop.title}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </Link>
                          <div className="text-[11px] text-gray-500">{prop.developer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                        {prop.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900 font-serif text-sm">
                      {prop.price}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {prop.location}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        {prop.possessionStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/edit/${prop.id}`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-navy-950 hover:bg-gray-200 transition"
                          title="Edit Property"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prop.id, prop.title)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
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

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-serif font-bold text-gray-900">Recent Customer Inquiries</h3>
            <p className="text-xs text-gray-500">Website visitors requesting site visits or callbacks</p>
          </div>
          <Link href="/admin/inquiries" className="text-xs text-gold-600 font-semibold hover:underline">
            View all ({inquiries.length})
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <p className="text-xs text-gray-500 py-4">No inquiries received yet.</p>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="p-3.5 rounded-xl bg-stone-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900 text-sm font-semibold">{inq.name}</strong>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gold-100 text-gold-800">
                      {inq.inquiryType}
                    </span>
                    <span className="text-gray-400">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-gray-600 mt-1">
                    Phone: <strong className="text-gray-800">{inq.phone}</strong> | Email: {inq.email || 'N/A'}
                  </div>
                  {inq.propertyTitle && (
                    <div className="text-gold-700 font-medium mt-0.5">
                      Property: {inq.propertyTitle}
                    </div>
                  )}
                  {inq.message && (
                    <p className="text-gray-500 mt-1 italic">&quot;{inq.message}&quot;</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${inq.phone}`}
                    className="px-3 py-1.5 rounded-lg bg-navy-900 text-white font-semibold text-[11px] hover:bg-navy-800"
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-500"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
