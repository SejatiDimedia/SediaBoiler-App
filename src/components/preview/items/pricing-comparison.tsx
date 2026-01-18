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

export function PricingComparison() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Compare Plans</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium text-gray-500">Features</th>
                <th className="text-center py-4 px-4 font-semibold">Free</th>
                <th className="text-center py-4 px-4 font-semibold text-blue-600">Pro</th>
                <th className="text-center py-4 px-4 font-semibold">Team</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ['Projects', '3', 'Unlimited', 'Unlimited'],
                ['Team Members', '1', '5', 'Unlimited'],
                ['Storage', '1GB', '50GB', '500GB'],
                ['Analytics', '❌', '✅', '✅'],
                ['API Access', '❌', '✅', '✅'],
                ['Priority Support', '❌', '❌', '✅'],
              ].map(([feature, ...values], idx) => (
                <tr key={idx}>
                  <td className="py-4 px-4 text-gray-600">{feature}</td>
                  {values.map((v, i) => (
                    <td key={i} className="text-center py-4 px-4">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}