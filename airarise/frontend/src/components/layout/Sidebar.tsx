'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useApp();

  const roleDisplayNames = {
    ward_officer: 'Ward Officer',
    housing_admin: 'Housing Society Admin',
    school_admin: 'School Administrator',
    field_team: 'Ward Field Team'
  };

  const navItems = [
    { label: 'Overview', href: '/', icon: 'grid_view' },
    { label: 'Air Quality Intelligence', href: '/air-quality', icon: 'air' },
    { label: 'Data Upload', href: '/data-upload', icon: 'upload_file' },
    { label: 'AI Insights', href: '/ai-insights', icon: 'psychology', tag: 'AUTO' },
    { label: 'Pollution Hotspots', href: '/pollution-hotspots', icon: 'fmd_bad' },
    { label: 'Action Center', href: '/action-center', icon: 'campaign' },
    { label: 'Reports & Advisories', href: '/reports', icon: 'assignment' },
    { label: 'Historical Comparisons', href: '/historical', icon: 'compare_arrows' },
    { label: 'Settings', href: '/settings', icon: 'tune' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/30 z-50 flex flex-col justify-between">
      <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="px-space-lg pt-space-lg pb-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold shadow-md">
              <span className="material-symbols-outlined text-[22px]">energy_savings_leaf</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
                AiraRise
              </span>
              <span className="text-[11px] font-semibold text-secondary tracking-wide uppercase">
                Intelligence OS
              </span>
            </div>
          </div>
          <p className="mt-space-xs text-xs text-on-surface-variant leading-snug">
            Breathe Better. Build a Better Tomorrow.
          </p>
        </div>

        {/* Divider */}
        <div className="px-space-md py-space-xs">
          <div className="h-px w-full bg-surface-container" />
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-space-sm py-space-xs">
          <div className="px-space-sm pb-space-xs">
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Navigation
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium truncate">{item.label}</span>
                  {item.tag && (
                    <span className="ml-auto bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card */}
        <div className="p-space-sm bg-surface-container-low mt-auto border-t border-outline-variant/20">
          <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest shadow-xs border border-outline-variant/20 mb-space-xs">
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">
              AS
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface truncate">Anjali Sharma</span>
                <span className="text-[10px] font-mono text-secondary bg-surface-container px-1 py-0.2 rounded font-bold">BMC</span>
              </div>
              <span className="text-[11px] text-on-surface-variant truncate">Ward F-North (Matunga)</span>
              <span className="text-[11px] text-secondary font-medium">{roleDisplayNames[role]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 px-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">help_outline</span>
              Help & Support
            </a>
            <button
              onClick={() => alert('Evaluation Session Active')}
              className="flex items-center gap-1 text-[11px] text-error hover:text-on-error-container font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Exit
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
