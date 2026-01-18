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

export function NavbarTransparent() {
  return (
    <div className="relative w-full min-h-[200px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="text-2xl font-bold text-white">
              TransparentNav
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white/80 hover:text-white transition">Home</a>
              <a href="#" className="text-white/80 hover:text-white transition">About</a>
              <a href="#" className="text-white/80 hover:text-white transition">Services</a>
              <a href="#" className="text-white/80 hover:text-white transition">Contact</a>
            </div>

            <button className="px-5 py-2.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition">
              Get Started
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}