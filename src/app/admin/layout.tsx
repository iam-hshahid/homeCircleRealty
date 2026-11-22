'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  MessageSquare, 
  ExternalLink, 
  Home, 
  Lock, 
  KeyRound, 
  Mail, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Login form state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset password state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState<'request' | 'verify'>('request');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [demoCodeHelper, setDemoCodeHelper] = useState('');
  const [resetStatusMessage, setResetStatusMessage] = useState('');
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    // Check local session
    const token = localStorage.getItem('homecircle_admin_auth');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('homecircle_admin_auth', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid admin password');
      }
    } catch (err: any) {
      setLoginError('Authentication service unreachable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async () => {
    setResetError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request-reset' })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setResetStep('verify');
        setResetStatusMessage(data.message);
        if (data.demoCode) {
          setDemoCodeHelper(data.demoCode);
        }
      } else {
        setResetError(data.error || 'Failed to dispatch verification code');
      }
    } catch (err) {
      setResetError('Unable to connect to password reset service');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');

    if (newPassword !== confirmPassword) {
      setResetError('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-reset',
          code: resetCode,
          newPassword
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('homecircle_admin_auth', data.token);
        setIsAuthenticated(true);
        setShowResetModal(false);
      } else {
        setResetError(data.error || 'Password reset failed');
      }
    } catch (err) {
      setResetError('Error completing password reset');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('homecircle_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Loading state while checking localStorage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#080E1A] flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // UNAUTHENTICATED: Display Elegant Login Screen
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080E1A] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-[#0C1628] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full gold-gradient mx-auto flex items-center justify-center text-navy-950 shadow-lg mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Restricted Access</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">
              Home Circle Admin
            </h1>
            <p className="text-xs text-gray-400">
              Enter authorized administrator password to manage properties, YouTube walkthroughs, and client leads.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Admin Password
                </label>
                <span className="text-[11px] text-gold-400/90 font-mono">
                  Default: <strong>admin</strong>
                </span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#080E1A] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-lg shadow-gold-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Unlock Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Reset Password & Navigation */}
          <div className="pt-4 border-t border-white/10 space-y-3 text-center">
            <button
              type="button"
              onClick={() => {
                setShowResetModal(true);
                setResetStep('request');
                setResetError('');
                setResetStatusMessage('');
              }}
              className="text-xs text-gold-400 hover:text-gold-300 font-semibold transition inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Forgot Password? Reset via Company Email</span>
            </button>

            <div>
              <Link href="/" className="text-[11px] text-gray-400 hover:text-gray-200 transition">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>

        {/* RESET PASSWORD MODAL (Sends OTP to info@homecirclerealty.in) */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-[#0C1628] rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5 text-white">
              <button
                onClick={() => setShowResetModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center text-navy-950 font-bold">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-white">Reset Admin Password</h3>
                  <p className="text-[11px] text-gray-400">Target Email: <strong className="text-gold-400">info@homecirclerealty.in</strong></p>
                </div>
              </div>

              {resetError && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {resetStep === 'request' ? (
                <div className="space-y-4 pt-1">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Click the button below to generate a secure 6-digit verification code sent directly to the official company inbox (<strong className="text-white">info@homecirclerealty.in</strong>).
                  </p>
                  <button
                    type="button"
                    onClick={handleRequestReset}
                    disabled={loading}
                    className="w-full py-3 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition disabled:opacity-50"
                  >
                    {loading ? 'Dispatching Code...' : 'Send Verification Code to info@homecirclerealty.in'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyReset} className="space-y-4">
                  {resetStatusMessage && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span>{resetStatusMessage}</span>
                        {demoCodeHelper && (
                          <div className="mt-1 pt-1 border-t border-emerald-500/20 font-mono text-[11px] text-emerald-200">
                            Verification Code: <strong>{demoCodeHelper}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      6-Digit Verification Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 592810"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#080E1A] border border-white/10 text-white font-mono tracking-widest text-center text-base focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      New Admin Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter new secure password..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#080E1A] border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter new password..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#080E1A] border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setResetStep('request')}
                      className="px-4 py-2.5 rounded-xl border border-white/20 text-gray-300 text-xs font-semibold hover:bg-white/10"
                    >
                      Resend Code
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 rounded-xl gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition disabled:opacity-50"
                    >
                      {loading ? 'Verifying...' : 'Set New Password & Log In'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED: Display Full Admin Portal
  // ----------------------------------------------------
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Add Property', href: '/admin/add', icon: PlusCircle, highlight: true },
    { label: 'All Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Inquiries & Leads', href: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-[#080E1A] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-navy-950 font-bold">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif font-bold text-white text-base">HOME CIRCLE</span>
                <span className="text-gold-400 font-sans text-xs ml-1 font-semibold">ADMIN</span>
              </div>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] bg-gold-500/20 text-gold-400 font-medium border border-gold-500/30">
              Agency Management Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/add"
              className="px-3.5 py-1.5 rounded-lg gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Property</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="bg-[#0C1628] border-t border-white/5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-6 overflow-x-auto py-2 text-xs font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                      : item.highlight
                      ? 'text-gold-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
