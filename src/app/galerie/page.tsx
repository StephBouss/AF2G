"use client";

import { FadeIn, SlideUp } from "@/components/ui/animations";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Placeholder photos array with varying aspect ratios for masonry effect
const photos = [
  { id: 1, height: "h-64", category: "Événement", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" },
  { id: 2, height: "h-96", category: "Action Sociale", image: "https://images.unsplash.com/photo-1593113589914-00ef4e562f05?q=80&w=800&auto=format&fit=crop" },
  { id: 3, height: "h-80", category: "Formation", image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop" },
  { id: 4, height: "h-72", category: "Solidarité", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
  { id: 5, height: "h-96", category: "Cérémonie", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" },
  { id: 6, height: "h-64", category: "Action Sociale", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop" },
  { id: 7, height: "h-80", category: "Événement", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop" },
  { id: 8, height: "h-72", category: "Formation", image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop" },
  { id: 9, height: "h-96", category: "Solidarité", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" },
];

export default function Galerie() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

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

      {/* MASONRY GALLERY */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm bg-luxury-gray"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className={`w-full ${photo.height} relative flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
