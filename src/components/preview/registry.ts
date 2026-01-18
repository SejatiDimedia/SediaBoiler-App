import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const componentRegistry: Record<string, ComponentType<any>> = {
  'navbar-modern': dynamic(() => import('./items/navbar-modern').then(mod => ({ default: mod.NavbarModern }))),
  'navbar-sticky': dynamic(() => import('./items/navbar-sticky').then(mod => ({ default: mod.NavbarSticky }))),
  'navbar-transparent': dynamic(() => import('./items/navbar-transparent').then(mod => ({ default: mod.NavbarTransparent }))),
  'hero-centered': dynamic(() => import('./items/hero-centered').then(mod => ({ default: mod.HeroCentered }))),
  'hero-split': dynamic(() => import('./items/hero-split').then(mod => ({ default: mod.HeroSplit }))),
  'hero-gradient': dynamic(() => import('./items/hero-gradient').then(mod => ({ default: mod.HeroGradient }))),
  'features-grid': dynamic(() => import('./items/features-grid').then(mod => ({ default: mod.FeaturesGrid }))),
  'features-icons': dynamic(() => import('./items/features-icons').then(mod => ({ default: mod.FeaturesIcons }))),
  'features-bento': dynamic(() => import('./items/features-bento').then(mod => ({ default: mod.FeaturesBento }))),
  'pricing-simple': dynamic(() => import('./items/pricing-simple').then(mod => ({ default: mod.PricingSimple }))),
  'pricing-toggle': dynamic(() => import('./items/pricing-toggle').then(mod => ({ default: mod.PricingToggle }))),
  'pricing-comparison': dynamic(() => import('./items/pricing-comparison').then(mod => ({ default: mod.PricingComparison }))),
  'footer-simple': dynamic(() => import('./items/footer-simple').then(mod => ({ default: mod.FooterSimple }))),
  'footer-columns': dynamic(() => import('./items/footer-columns').then(mod => ({ default: mod.FooterColumns }))),
  'footer-cta': dynamic(() => import('./items/footer-cta').then(mod => ({ default: mod.FooterCTA }))),
};
