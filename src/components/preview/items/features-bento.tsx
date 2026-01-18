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

export function FeaturesBento() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Powerful Features
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-blue-100">Get deep insights into your business with our powerful analytics dashboard.</p>
          </div>
          
          {/* Small card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Notifications</h3>
            <p className="text-gray-600 text-sm">Never miss important updates</p>
          </div>
          
          {/* Small card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
            <p className="text-gray-600 text-sm">Work together seamlessly</p>
          </div>
          
          {/* Large card */}
          <div className="md:col-span-2 bg-gray-900 rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold mb-2">Enterprise Security</h3>
            <p className="text-gray-300">Bank-level encryption and compliance with major security standards.</p>
          </div>
        </div>
      </div>
    </section>
  );
}