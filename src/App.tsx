/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { GallerySection } from './components/GallerySection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F5F5F4] flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroVideo />
        <GallerySection />
        <ServicesSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
