'use client';
import React from 'react';
import BentoGrid from '../../components/layout/BentoGrid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// /lab — Experimental 3D Bento Experience
const LabPage = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Back to Overview Control */}
      <Link 
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 text-sm text-gray-400 hover:text-white transition-all backdrop-blur-sm"
      >
        <ArrowLeft size={16} />
        <span>Overview</span>
      </Link>

      {/* Full Bento Experience */}
      <BentoGrid />
    </main>
  );
};

export default LabPage;
