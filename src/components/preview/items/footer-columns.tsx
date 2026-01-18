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

export function FooterColumns() {
  const columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Updates'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Support', links: ['Help Center', 'Contact', 'Documentation', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-gray-900 mb-4">Brand</div>
            <p className="text-sm text-gray-600">Building the future of web development.</p>
          </div>
          
          {/* Link columns */}
          {columns.map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-900 mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          © 2024 Brand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}