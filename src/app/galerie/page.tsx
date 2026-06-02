"use client";

import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, FolderOpen, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Photo = { id: number; image: string; caption?: string };
type Album = { id: string; title: string; thumbnail: string; photos: Photo[] };

const seanceDeTravail: Photo[] = [
  { id: 1,  image: "/gallery-1.jpg",  caption: "Session de travail" },
  { id: 2,  image: "/gallery-2.jpg",  caption: "Le Bureau" },
  { id: 3,  image: "/gallery-3.jpg",  caption: "Visite sur le terrain" },
  { id: 4,  image: "/gallery-4.jpg",  caption: "Délégation" },
  { id: 5,  image: "/gallery-5.jpg",  caption: "Rencontre Officielle" },
  { id: 6,  image: "/gallery-6.jpg",  caption: "Rencontre Officielle" },
  { id: 7,  image: "/gallery-7.jpg",  caption: "Délégation AF2G" },
  { id: 8,  image: "/gallery-8.jpg",  caption: "Événement" },
  { id: 9,  image: "/gallery-9.jpg",  caption: "Intervention" },
  { id: 10, image: "/gallery-10.jpg", caption: "Visite INPTIC" },
];

const octobreRose: Photo[] = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  image: `/galerie/octobre-rose/oct-rose-${i + 1}.jpg`,
}));

const journeesEnfants: Photo[] = Array.from({ length: 62 }, (_, i) => ({
  id: i + 1,
  image: `/galerie/journees-enfants/enfants-${i + 1}.jpg`,
}));

const miseEnPlaceBureau: Photo[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  image: `/galerie/mise-en-place-bureau/bureau-${i + 1}.jpg`,
}));

const albums: Album[] = [
  {
    id: "seance-de-travail",
    title: "Séance de travail",
    thumbnail: "/gallery-1.jpg",
    photos: seanceDeTravail,
  },
  {
    id: "octobre-rose",
    title: "Octobre Rose",
    thumbnail: "/galerie/octobre-rose/oct-rose-1.jpg",
    photos: octobreRose,
  },
  {
    id: "journees-enfants",
    title: "Journées Internationales des Enfants Conscients",
    thumbnail: "/galerie/journees-enfants/enfants-1.jpg",
    photos: journeesEnfants,
  },
  {
    id: "mise-en-place-bureau",
    title: "Mise en place du bureau",
    thumbnail: "/galerie/mise-en-place-bureau/bureau-1.jpg",
    photos: miseEnPlaceBureau,
  },
];

export default function Galerie() {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const currentPhotos = openAlbum?.photos ?? [];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const idx = currentPhotos.findIndex((p) => p.id === selectedPhoto.id);
    setSelectedPhoto(currentPhotos[(idx + 1) % currentPhotos.length]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const idx = currentPhotos.findIndex((p) => p.id === selectedPhoto.id);
    setSelectedPhoto(currentPhotos[(idx - 1 + currentPhotos.length) % currentPhotos.length]);
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-primary-black">
      {/* HEADER */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-elegant-white">Galerie</h1>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-8" />
            <p className="text-xl text-elegant-white/70 max-w-2xl mx-auto font-light">
              Revivez les moments forts de l'AF2G en images.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-8 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">

            {/* VUE ALBUMS */}
            {!openAlbum && (
              <motion.div
                key="albums"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {albums.map((album) => (
                    <StaggerItem key={album.id}>
                      <button
                        className="group w-full text-left cursor-pointer"
                        onClick={() => setOpenAlbum(album)}
                      >
                        {/* Vignette */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-luxury-gray mb-4">
                          <Image
                            src={album.thumbnail}
                            alt={album.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-primary-black/50 group-hover:bg-primary-black/30 transition-colors duration-300 flex flex-col items-center justify-center gap-3">
                            <FolderOpen className="w-12 h-12 text-white/70 group-hover:text-primary-gold transition-colors duration-300" />
                            <span className="text-white/60 text-sm uppercase tracking-widest">
                              {album.photos.length} photos
                            </span>
                          </div>
                        </div>
                        {/* Titre */}
                        <h3 className="text-xl font-serif text-elegant-white group-hover:text-primary-gold transition-colors duration-300 text-center">
                          {album.title}
                        </h3>
                        <div className="w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-500 mt-2 mx-auto" />
                      </button>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            )}

            {/* VUE ALBUM OUVERT */}
            {openAlbum && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Fil d'Ariane */}
                <div className="flex items-center gap-4 mb-10">
                  <button
                    onClick={() => setOpenAlbum(null)}
                    className="flex items-center gap-2 text-elegant-white/60 hover:text-primary-gold transition-colors group shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-wider">Albums</span>
                  </button>
                  <div className="h-px flex-1 bg-white/10" />
                  <h2 className="text-2xl font-serif text-elegant-white shrink-0">{openAlbum.title}</h2>
                </div>

                <FadeIn>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {openAlbum.photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative group cursor-pointer overflow-hidden rounded-sm bg-luxury-gray aspect-[4/3]"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <Image
                          src={photo.image}
                          alt={photo.caption ?? openAlbum.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-primary-gold" />
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </motion.div>
            )}
          </AnimatePresence>
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
              className="relative max-w-5xl w-full max-h-[70vh] aspect-video bg-luxury-gray rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.caption ?? ""}
                fill
                className="object-contain"
              />
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

            {/* Compteur */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-elegant-white/50 text-sm tracking-widest">
              {currentPhotos.findIndex((p) => p.id === selectedPhoto.id) + 1} / {currentPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
