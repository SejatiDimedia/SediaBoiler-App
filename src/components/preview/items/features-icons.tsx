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

export function FeaturesIcons() {
  const features = [
    { icon: '🚀', title: 'Fast Deployment', desc: 'Deploy in seconds with zero configuration' },
    { icon: '🛡️', title: 'Built-in Security', desc: 'Automatic SSL and DDoS protection' },
    { icon: '📊', title: 'Analytics', desc: 'Real-time insights and reporting' },
    { icon: '🔌', title: 'Integrations', desc: 'Connect with your favorite tools' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}