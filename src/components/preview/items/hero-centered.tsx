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

export function HeroCentered() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          🚀 Introducing v2.0
        </div>
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
          Build amazing products
          <br />
          <span className="text-blue-600">faster than ever</span>
        </h1>
        
        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
          Empower your team with the tools they need to create, collaborate, 
          and ship products that users love.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition">
            Learn More →
          </button>
        </div>
      </div>
    </section>
  );
}