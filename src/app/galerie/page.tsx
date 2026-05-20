"use client";

import { FadeIn, SlideUp } from "@/components/ui/animations";
import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const photos = [
  { id: 1, height: "h-64", category: "Session de travail", image: "/gallery-1.jpg" },
  { id: 2, height: "h-96", category: "Le Bureau", image: "/gallery-2.jpg" },
  { id: 3, height: "h-80", category: "Visite sur le terrain", image: "/gallery-3.jpg" },
  { id: 4, height: "h-72", category: "Délégation", image: "/gallery-4.jpg" },
  { id: 5, height: "h-96", category: "Rencontre Officielle", image: "/gallery-5.jpg" },
  { id: 6, height: "h-80", category: "Rencontre Officielle", image: "/gallery-6.jpg" },
  { id: 7, height: "h-96", category: "Délégation AF2G", image: "/gallery-7.jpg" },
  { id: 8, height: "h-64", category: "Événement", image: "/gallery-8.jpg" },
  { id: 9, height: "h-80", category: "Intervention", image: "/gallery-9.jpg" },
  { id: 10, height: "h-72", category: "Visite INPTIC", image: "/gallery-10.jpg" },
];

export default function Galerie() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-primary-black">
      {/* HEADER SECTION */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-elegant-white">Galerie</h1>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-8"></div>
            <p className="text-xl text-elegant-white/70 max-w-2xl mx-auto font-light">
              Revivez les moments forts de l'AF2G en images.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* GRID GALLERY */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer overflow-hidden rounded-sm bg-luxury-gray aspect-[4/3]"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="w-full h-full relative flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                     <Image src={photo.image} alt={photo.category} fill className="object-cover" />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-primary-gold mb-2 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                    <span className="text-elegant-white font-serif tracking-widest uppercase text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-black/95 backdrop-blur-sm p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-8 right-8 text-elegant-white hover:text-primary-gold transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full max-h-[80vh] aspect-video bg-luxury-gray rounded-sm overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedPhoto.image} alt={selectedPhoto.category} fill className="object-contain" />
              
              {/* Navigation Buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-black/50 hover:bg-primary-gold text-elegant-white hover:text-primary-black rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-black/50 hover:bg-primary-gold text-elegant-white hover:text-primary-black rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
