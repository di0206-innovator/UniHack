'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { X, User, Mail, Building2, ShieldCheck, Image, Save, Check } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { user, showSettingsModal, closeSettingsModal, updateProfile } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<'admin' | 'steward' | 'engineer' | 'viewer'>('admin');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setOrganization(user.organization || '');
      setRole(user.role || 'admin');
      setAvatarUrl(user.avatarUrl || '');
    }
  }, [user, showSettingsModal]);

  if (!showSettingsModal || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      organization,
      role,
      avatarUrl: avatarUrl.trim() || undefined
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      closeSettingsModal();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e1424] border-2 border-slate-700 w-full max-w-lg shadow-[10px_10px_0px_0px_#000000] p-6 space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-purple-600 border-2 border-purple-300 text-slate-950 font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
              <User className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-slate-100 uppercase font-mono text-base tracking-wider">USER PROFILE SETTINGS</h3>
              <p className="text-[10px] font-mono text-purple-400">EDIT ACCOUNT & ORGANIZATION DETAILS</p>
            </div>
          </div>
          <button 
            onClick={closeSettingsModal}
            className="p-1.5 bg-[#070a12] border-2 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 shadow-[2px_2px_0px_0px_#000000]"
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
              <User className="h-3.5 w-3.5 text-cyan-400" /> Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full neo-brutal-input px-3 py-2 text-slate-200"
              placeholder="e.g. Alex Vance"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
              <Mail className="h-3.5 w-3.5 text-cyan-400" /> Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full neo-brutal-input px-3 py-2 text-slate-200"
              placeholder="alex.vance@gmail.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
                <Building2 className="h-3.5 w-3.5 text-purple-400" /> Organization
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full neo-brutal-input px-3 py-2 text-slate-200"
                placeholder="Acme Industrial Systems"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Platform Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full neo-brutal-input px-3 py-2 text-slate-200 bg-[#060911]"
              >
                <option value="admin">Administrator</option>
                <option value="steward">Data Steward</option>
                <option value="engineer">Catalog Engineer</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-bold uppercase flex items-center gap-1.5 text-[11px]">
              <Image className="h-3.5 w-3.5 text-amber-400" /> Avatar Image URL (Optional)
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full neo-brutal-input px-3 py-2 text-slate-200 text-[11px]"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-slate-800">
            <button
              type="button"
              onClick={closeSettingsModal}
              className="neo-brutal-btn px-4 py-2 text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="neo-brutal-btn-primary px-5 py-2 text-xs flex items-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-4 w-4 text-slate-950 stroke-[3]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 stroke-[2.5]" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
