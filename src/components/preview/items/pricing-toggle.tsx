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

export function PricingToggle() {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    { name: 'Basic', monthly: 15, yearly: 144 },
    { name: 'Standard', monthly: 30, yearly: 288 },
    { name: 'Premium', monthly: 60, yearly: 576 },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose your plan</h2>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 border">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${!isYearly ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${isYearly ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <h3 className="font-semibold text-gray-900 mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                ${isYearly ? plan.yearly : plan.monthly}
                <span className="text-base font-normal text-gray-500">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}