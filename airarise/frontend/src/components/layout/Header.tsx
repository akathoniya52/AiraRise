'use client';

import React from 'react';
import { useApp, UserRole, Language } from '@/context/AppContext';

export default function Header() {
  const { role, setRole, language, setLanguage, activeRegion, setActiveRegion } = useApp();

  const roleLabels: Record<UserRole, string> = {
    ward_officer: 'Ward Officer',
    housing_admin: 'Housing Society Admin',
    school_admin: 'School Administrator',
    field_team: 'Ward-Level Field Team'
  };

  const languageLabels: Record<Language, string> = {
    en: 'English',
    hi: 'हिंदी (Hindi)',
    mr: 'मराठी (Marathi)'
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 z-40 px-space-lg flex items-center justify-between">
      <div className="flex items-center gap-space-md">
        {/* Active Region */}
        <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1.5 rounded-lg shadow-sm border border-outline-variant/20">
          <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider leading-none">Active Region</span>
            <select
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
              className="bg-transparent text-xs font-semibold text-primary focus:outline-none cursor-pointer"
            >
              <option value="Mumbai Central - Ward F-North">Mumbai Central - Ward F-North</option>
              <option value="Kingsway & Wadala West">Kingsway & Wadala West</option>
              <option value="Dadar Transit Corridor">Dadar Transit Corridor</option>
              <option value="Sion Circle Junction">Sion Circle Junction</option>
            </select>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-80 hidden md:block">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search telemetry, sensor IDs, AQI status..."
            className="w-full bg-surface-container-lowest pl-9 pr-14 py-1.5 text-xs rounded-lg border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-surface-container px-1.5 py-0.5 rounded text-on-surface-variant border border-outline-variant/20">
            Ctrl+K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-sm">
        {/* Role Switcher */}
        <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-xs border border-outline-variant/20">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="bg-transparent text-xs font-medium text-on-surface focus:outline-none cursor-pointer"
          >
            <option value="ward_officer">Ward Officer</option>
            <option value="housing_admin">Housing Society Admin</option>
            <option value="school_admin">School Administrator</option>
            <option value="field_team">Ward-Level Field Team</option>
          </select>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg shadow-xs border border-outline-variant/20">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">translate</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-xs text-on-surface focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-xs border border-outline-variant/20 transition-colors"
          title="Incident Alerts"
        >
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
            AS
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-on-surface leading-tight">Anjali Sharma</span>
            <span className="text-[10px] text-secondary font-medium leading-tight">BMC Municipal Officer</span>
          </div>
        </div>
      </div>
    </header>
  );
}
