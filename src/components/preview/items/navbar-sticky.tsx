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

export function NavbarSticky() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 flex h-14 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <span>StickyNav</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="font-medium text-gray-900">Home</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Products</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Solutions</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Resources</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
            Sign in
          </button>
          <button className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}