'use client';
import React from 'react';

const StatItem = ({ value, label, subtext }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-[#0f0f0f] border border-gray-800 rounded-lg hover:bg-[#151515] transition-colors">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
      {value}
    </div>
    <div className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">
      {label}
    </div>
    {subtext && <div className="text-xs text-gray-600 font-mono">{subtext}</div>}
  </div>
);

const Stats = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatItem 
          value="3+" 
          label="Years Exp" 
          subtext="Full Stack Development" 
        />
        <StatItem 
          value="12" 
          label="Projects" 
          subtext="Deployed & Maintained" 
        />
        <StatItem 
          value="20+" 
          label="Contributions" 
          subtext="Open Source Commits" 
        />
      </div>
      
      {/* Additional Context - stylized like a system status report */}
      <div className="mt-6 p-4 border-t border-dashed border-gray-800 flex justify-between text-xs font-mono text-gray-500">
        <span>STATUS: ONLINE</span>
        <span>LOC: 50,000+</span>
        <span>UPTIME: 99.9%</span>
      </div>
    </div>
  );
};

export default Stats;
