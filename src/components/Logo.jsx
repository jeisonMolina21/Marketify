import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#008a3e" />
        <stop offset="100%" stopColor="#004d40" />
      </linearGradient>
      <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9800" />
        <stop offset="100%" stopColor="#f57c00" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Cart Bag Body */}
    <motion.path 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M25 35H35L40 75H80L85 50" 
      stroke="url(#primaryGradient)" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="drop-shadow-sm"
    />
    
    {/* Dynamic Wheels */}
    <circle cx="45" cy="85" r="8" fill="#004d40" className="animate-pulse" />
    <circle cx="75" cy="85" r="8" fill="#004d40" className="animate-pulse" />
    
    {/* Modern Store Icon */}
    <path 
      d="M40 55V40L55 50L70 40V55" 
      stroke="url(#secondaryGradient)" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      filter="url(#glow)"
    />
  </svg>
);

import { motion } from 'framer-motion';
export default Logo;
