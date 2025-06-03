"use client";

import Head from 'next/head';
import { useEffect } from 'react';

import Hero from './components/Hero';
import FeaturesSteps from './components/FeaturesSteps';
import OfferPlans from './components/OfferPlans';
import SocialCall from './components/SocialCall';
import Footer from './components/Footer';

declare global {
  interface Window {
    plausible?: (eventName: string, options?: any) => void;
    __plausible_scroll_25?: boolean;
    __plausible_scroll_50?: boolean;
    __plausible_scroll_75?: boolean;
    __plausible_scroll_100?: boolean;
  }
}

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      const scrollPercent = Math.round(
        ((scrollTop + windowHeight) / docHeight) * 100
      );

      if (scrollPercent > 25 && !window.__plausible_scroll_25) {
        window.plausible?.('Scroll-25');
        window.__plausible_scroll_25 = true;
      }
      if (scrollPercent > 50 && !window.__plausible_scroll_50) {
        window.plausible?.('Scroll-50');
        window.__plausible_scroll_50 = true;
      }
      if (scrollPercent > 75 && !window.__plausible_scroll_75) {
        window.plausible?.('Scroll-75');
        window.__plausible_scroll_75 = true;
      }
      if (scrollPercent === 100 && !window.__plausible_scroll_100) {
        window.plausible?.('Scroll-100');
        window.__plausible_scroll_100 = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    const sessionTimer = setTimeout(() => {
      window.plausible?.('30s-stay');
    }, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(sessionTimer);
    };
  }, []);

  return (
    <>
      <Head>
        <script
          defer
          data-domain="ratos.fr"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <main>
        <Hero />
        <FeaturesSteps />
        <OfferPlans />
        <SocialCall />
        <Footer />
      </main>
    </>
  );
}
