'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  ArrowRight,
  Shield,
  Zap,
  BarChart,
  Globe,
  Smartphone,
  Layout,
  MessageSquare
} from 'lucide-react';

export function HeroGradient() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
          Transform Your
          <br />
          Digital Experience
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-white/80 mb-10">
          Create stunning websites and applications with our cutting-edge 
          platform. No coding required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition shadow-xl">
            Start Building Free
          </button>
          <button className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition border border-white/20">
            View Examples →
          </button>
        </div>
      </div>
    </section>
  );
}