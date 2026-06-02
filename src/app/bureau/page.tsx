"use client";

import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { Globe, Mail } from "lucide-react";
import Image from "next/image";

const membres = [
  {
    nom: "Nom de la Présidente",
    fonction: "Présidente",
    bio: "Visionnaire et leader, elle a consacré sa carrière à l'amélioration du système judiciaire et à l'empowerment des femmes greffières.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    nom: "Nom de la Vice-Présidente",
    fonction: "Vice-Présidente",
    bio: "Forte de son expérience, elle seconde la présidence dans la mise en œuvre des actions stratégiques de l'association.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
  },
  {
    nom: "Nom de la Secrétaire",
    fonction: "Secrétaire Générale",
    bio: "Garante du fonctionnement administratif, elle assure la coordination et le suivi rigoureux des activités de l'AF2G.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
  },
  {
    nom: "Nom de la Trésorière",
    fonction: "Trésorière",
    bio: "Experte en gestion financière, elle veille à la transparence et à l'optimisation des ressources de notre institution.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bfa8c?q=80&w=800&auto=format&fit=crop"
  },
  {
    nom: "Nom de la Conseillère",
    fonction: "Conseillère Juridique",
    bio: "Elle apporte son expertise pointue pour éclairer les décisions du bureau et défendre les intérêts de nos membres.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=800&auto=format&fit=crop"
  },
  {
    nom: "Nom de la Chargée de Com",
    fonction: "Chargée de Communication",
    bio: "Elle valorise l'image de l'AF2G et assure le rayonnement de nos actions auprès du grand public et des partenaires.",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BureauExecutif() {
  return (
    <div className="flex flex-col min-h-screen pt-24 bg-primary-black">
      {/* HEADER SECTION */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-elegant-white">Bureau Exécutif</h1>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-8"></div>
            <p className="text-xl text-elegant-white/70 max-w-2xl mx-auto font-light">
              Découvrez les femmes engagées qui dirigent l'AF2G avec dévouement, expertise et passion.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* MEMBRES GRID */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {membres.map((membre, i) => (
              <StaggerItem key={i}>
                <div className="group relative bg-luxury-gray rounded-sm overflow-hidden h-[360px] md:h-[450px]">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                     <Image src={membre.image} alt={membre.nom} fill className="object-cover" />
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-serif text-primary-gold mb-1">{membre.nom}</h3>
                    <p className="text-sm uppercase tracking-widest text-elegant-white/90 mb-4">{membre.fonction}</p>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <p className="text-elegant-white/70 font-light text-sm mb-6 line-clamp-3">
                        {membre.bio}
                      </p>
                      <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-elegant-white hover:bg-primary-gold hover:border-primary-gold hover:text-primary-black transition-colors">
                          <Globe className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-elegant-white hover:bg-primary-gold hover:border-primary-gold hover:text-primary-black transition-colors">
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gold line accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
