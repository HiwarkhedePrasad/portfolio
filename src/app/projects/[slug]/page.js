'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ProjectPage = () => {
  const params = useParams();
  const slug = params.slug;

  // Format slug back to title (e.g., "chat-secure" -> "Chat Secure")
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur border border-gray-800 rounded-full text-sm text-gray-300 hover:text-white hover:border-white transition-all"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-gray-500 text-lg">Project details coming soon.</p>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
