'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { Inquiry } from '@/types/property';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = inquiries.filter(i => {
    if (filterStatus === 'All') return true;
    return i.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Customer Inquiries &amp; Leads
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Track and manage site visit bookings, WhatsApp inquiries, and price requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none"
          >
            <option value="All">All Statuses ({inquiries.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Visit Scheduled">Visit Scheduled</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-xs text-gray-500">Loading leads...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-2">
          <MessageSquare className="w-8 h-8 text-gray-300 mx-auto" />
          <p className="text-sm font-semibold text-gray-700">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => (
            <div
              key={inq.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900">{inq.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    inq.status === 'New' ? 'bg-blue-100 text-blue-800' :
                    inq.status === 'Visit Scheduled' ? 'bg-purple-100 text-purple-800' :
                    inq.status === 'Contacted' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {inq.status}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {new Date(inq.createdAt).toLocaleDateString('en-IN', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gold-500" />
                    <strong>{inq.phone}</strong>
                  </div>
                  {inq.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gold-500" />
                      <span>{inq.email}</span>
                    </div>
                  )}
                  {inq.preferredDate && (
                    <div className="flex items-center gap-1 text-purple-700 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Site Visit: {inq.preferredDate}</span>
                    </div>
                  )}
                </div>

                {inq.propertyTitle && (
                  <div className="text-xs text-gold-800 font-semibold bg-gold-50 px-2.5 py-1 rounded-md inline-block">
                    Property: {inq.propertyTitle}
                  </div>
                )}

                {inq.message && (
                  <p className="text-xs text-gray-600 italic bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    &quot;{inq.message}&quot;
                  </p>
                )}
              </div>

              {/* Status Switcher & Contact Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <select
                  value={inq.status}
                  onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                  className="py-1.5 px-3 rounded-lg border border-gray-300 text-xs font-semibold bg-white focus:outline-none"
                >
                  <option value="New">Mark New</option>
                  <option value="Contacted">Mark Contacted</option>
                  <option value="Visit Scheduled">Visit Scheduled</option>
                  <option value="Closed">Mark Closed</option>
                </select>

                <a
                  href={`tel:${inq.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800"
                >
                  Call
                </a>

                <a
                  href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Home%20Circle%20Realty%20following%20up%20on%20your%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
