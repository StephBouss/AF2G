"use client";

import { useState } from "react";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const categories = ["Tout", "Solidarité", "Formation", "Leadership", "Sensibilisation", "Actions Sociales"];

const actions = [
  {
    id: 1,
    title: "Séminaire de Renforcement des Capacités",
    category: "Formation",
    date: "Mars 2024",
    desc: "Une formation intensive pour les greffières sur les nouvelles procédures numériques.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Don à l'Orphelinat de Libreville",
    category: "Solidarité",
    date: "Février 2024",
    desc: "Remise de vivres et de kits scolaires aux enfants démunis.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Campagne de Sensibilisation sur les Droits des Femmes",
    category: "Sensibilisation",
    date: "Janvier 2024",
    desc: "Rencontre citoyenne pour éduquer et informer sur les droits juridiques fondamentaux.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Forum du Leadership Féminin",
    category: "Leadership",
    date: "Décembre 2023",
    desc: "Panel d'échanges avec des femmes leaders de divers secteurs professionnels.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Soutien aux Femmes Incarcérées",
    category: "Actions Sociales",
    date: "Novembre 2023",
    desc: "Visite et distribution de kits d'hygiène à la prison centrale.",
    image: "https://images.unsplash.com/photo-1593113589914-00ef4e562f05?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Atelier de Gestion du Stress au Travail",
    category: "Formation",
    date: "Octobre 2023",
    desc: "Une session dédiée au bien-être psychologique dans le milieu judiciaire.",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop"
  }
];

export default function NosActions() {
  const [activeCategory, setActiveCategory] = useState("Tout");

  const filteredActions = actions.filter(
    (action) => activeCategory === "Tout" || action.category === activeCategory
  );

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
                  {/* Image Placeholder */}
                  <div className="relative h-60 bg-[#1a1a1a] overflow-hidden">
                     <Image src={action.image} alt={action.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-primary-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                     <div className="absolute top-4 right-4 bg-primary-gold text-primary-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm z-10">
                        {action.category}
                     </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex-grow flex flex-col">
                    <span className="text-primary-gold/80 text-sm font-light mb-3">{action.date}</span>
                    <h3 className="text-2xl font-serif mb-4 text-elegant-white group-hover:text-primary-gold transition-colors">{action.title}</h3>
                    <p className="text-elegant-white/60 font-light leading-relaxed mb-6 flex-grow">
                      {action.desc}
                    </p>
                    <button className="flex items-center gap-2 text-primary-gold uppercase tracking-wider text-sm font-medium group/btn w-fit">
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
    </div>
  );
}
