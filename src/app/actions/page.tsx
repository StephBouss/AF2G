"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { ArrowRight, X, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { actions, type Action } from "@/data/actions";

const categories = ["Tout", "Solidarité", "Formation", "Leadership", "Sensibilisation", "Actions Sociales"];

function ActionsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const found = actions.find(a => a.id === Number(id));
      if (found) setSelectedAction(found);
    }
  }, [searchParams]);

  const filteredActions = [...actions]
    .filter((action) => activeCategory === "Tout" || action.category === activeCategory)
    .sort((a, b) => b.dateSort - a.dateSort);

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-primary-black">
      {/* HEADER SECTION */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-elegant-white">Nos Actions</h1>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-8"></div>
            <p className="text-xl text-elegant-white/70 max-w-2xl mx-auto font-light">
              Découvrez nos initiatives sur le terrain pour soutenir, former et faire rayonner les femmes au Gabon.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="pb-10">
        <div className="container mx-auto px-6">
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 border",
                    activeCategory === cat
                      ? "bg-primary-gold text-primary-black border-primary-gold glow-gold"
                      : "bg-transparent text-elegant-white/70 border-white/20 hover:border-primary-gold/50 hover:text-primary-gold"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ACTIONS GRID */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredActions.map((action) => (
              <StaggerItem key={action.id}>
                <div className="group bg-luxury-gray border border-white/5 rounded-sm overflow-hidden hover:border-primary-gold/30 transition-colors h-full flex flex-col">
                  <div className="relative h-60 bg-[#1a1a1a] overflow-hidden">
                    <Image src={action.image} alt={action.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-primary-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 right-4 bg-primary-gold text-primary-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm z-10">
                      {action.category}
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <span className="text-primary-gold/80 text-sm font-light mb-3">{action.date}</span>
                    <h3 className="text-2xl font-serif mb-4 text-elegant-white group-hover:text-primary-gold transition-colors">{action.title}</h3>
                    <p className="text-elegant-white/60 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                      {action.desc}
                    </p>
                    <button
                      onClick={() => setSelectedAction(action)}
                      className="flex items-center gap-2 text-primary-gold uppercase tracking-wider text-sm font-medium group/btn w-fit"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredActions.length === 0 && (
            <div className="text-center py-20">
              <p className="text-elegant-white/60 text-xl font-light">Aucune action trouvée dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* MODAL DÉTAIL */}
      <AnimatePresence>
        {selectedAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-black/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedAction(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative bg-luxury-gray border border-primary-gold/20 rounded-sm overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 md:h-96 w-full">
                <Image
                  src={selectedAction.image}
                  alt={selectedAction.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-gray via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-primary-gold text-primary-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                  {selectedAction.category}
                </div>
                <button
                  onClick={() => setSelectedAction(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-primary-black/60 hover:bg-primary-gold text-elegant-white hover:text-primary-black rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-elegant-white/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-gold" />
                    {selectedAction.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-primary-gold" />
                    {selectedAction.category}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif text-elegant-white mb-6 leading-snug">
                  {selectedAction.title}
                </h2>

                <div className="w-16 h-0.5 bg-primary-gold mb-6" />

                <p className="text-elegant-white/70 font-light leading-relaxed text-base">
                  {selectedAction.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NosActions() {
  return (
    <Suspense>
      <ActionsContent />
    </Suspense>
  );
}
