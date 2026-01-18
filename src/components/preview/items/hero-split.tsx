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

export function HeroSplit() {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              Welcome to Our Platform
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              The easiest way to manage your business
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600">
              Our platform provides all the tools you need to streamline operations,
              boost productivity, and grow your business to new heights.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition w-full sm:w-auto text-center">
                Get Started Free
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition w-full sm:w-auto text-center">
                Watch Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by 10,000+ companies</p>
              <div className="flex flex-wrap items-center gap-6 opacity-50">
                <div className="w-20 sm:w-24 h-8 bg-gray-300 rounded"></div>
                <div className="w-20 sm:w-24 h-8 bg-gray-300 rounded"></div>
                <div className="w-20 sm:w-24 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-xl bg-white shadow-2xl flex items-center justify-center">
                <span className="text-gray-400">Your Image Here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}