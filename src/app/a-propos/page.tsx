"use client";

import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { BookOpen, Target, Eye } from "lucide-react";
import Image from "next/image";

export default function APropos() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      {/* HEADER SECTION */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-primary-black z-0">
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 z-[-2] bg-[url('/about-header.jpg')] bg-cover bg-[center_30%] opacity-40" />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-primary-black/50 via-primary-black/80 to-primary-black" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-gradient-gold drop-shadow-sm">À propos de l'AF2G</h1>
            <p className="text-xl text-elegant-white/90 max-w-2xl mx-auto font-light drop-shadow-md">
              Découvrez l'histoire, la mission et la vision de l'Association des Femmes Greffières du Gabon.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* MOT DE LA PRÉSIDENTE */}
      <section className="py-24 bg-primary-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <FadeIn className="w-full lg:w-1/2">
              <div className="relative aspect-square md:aspect-[4/5] rounded-sm overflow-hidden bg-luxury-gray">
                <div className="absolute inset-0 border-2 border-primary-gold/20 m-4 rounded-sm z-20 pointer-events-none"></div>
                <Image
                  src="/presidente.jpg"
                  alt="Présidente de l'AF2G"
                  fill
                  className="object-cover scale-150 object-[60%_20%]"
                />
              </div>
            </FadeIn>
            <SlideUp className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-serif mb-8 text-primary-gold">Le Mot de la Présidente</h2>
              <div className="space-y-6 text-lg text-elegant-white/70 font-light leading-relaxed">
                <p>
                  Chères consœurs, chers partenaires,
                </p>
                <p>
                  C'est avec une immense fierté que je m'adresse à vous. L'Association des Femmes Greffières du Gabon (AF2G) est née d'une volonté commune : celle de fédérer nos énergies, de faire entendre nos voix et de contribuer activement à l'excellence de notre système judiciaire.
                </p>
                <p>
                  Notre métier exige rigueur, intégrité et dévouement. En tant que femmes, nous y apportons notre sensibilité, notre force et notre capacité à transformer notre environnement. Ensemble, nous sommes une force de proposition et d'action.
                </p>
                <p>
                  Nous plaçons l'amour, la solidarité et l'empowerment (le pouvoir) au cœur de notre démarche pour bâtir une justice plus équitable et soutenir nos paires à travers tout le Gabon.
                </p>
                <div className="pt-6">
                  <h4 className="font-serif text-xl text-elegant-white">Me Augustine Wada épouse Barrault Adande</h4>
                  <p className="text-primary-gold/80 text-sm uppercase tracking-widest mt-1">Présidente de l'AF2G</p>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* MISSION, VISION, OBJECTIFS */}
      <section className="py-24 bg-luxury-gray relative">
        <div className="container mx-auto px-6 md:px-12">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="p-6 md:p-10 bg-primary-black border border-white/5 h-full rounded-sm hover:border-primary-gold/30 transition-colors">
                <Target className="w-12 h-12 text-primary-gold mb-6" />
                <h3 className="text-2xl font-serif mb-4 text-elegant-white">Notre Mission</h3>
                <p className="text-elegant-white/60 font-light leading-relaxed">
                  Défendre les droits des femmes greffières, promouvoir leur leadership dans le système judiciaire et mener des actions sociales à fort impact en faveur des plus démunis.
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="p-6 md:p-10 bg-primary-black border border-white/5 h-full rounded-sm hover:border-primary-gold/30 transition-colors">
                <Eye className="w-12 h-12 text-primary-gold mb-6" />
                <h3 className="text-2xl font-serif mb-4 text-elegant-white">Notre Vision</h3>
                <p className="text-elegant-white/60 font-light leading-relaxed">
                  Devenir l'institution féminine de référence au Gabon, reconnue pour son engagement professionnel, son intégrité et sa contribution au développement social.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 md:p-10 bg-primary-black border border-white/5 h-full rounded-sm hover:border-primary-gold/30 transition-colors">
                <BookOpen className="w-12 h-12 text-primary-gold mb-6" />
                <h3 className="text-2xl font-serif mb-4 text-elegant-white">Nos Objectifs</h3>
                <ul className="text-elegant-white/60 font-light leading-relaxed space-y-2 list-disc list-inside">
                  <li>Renforcer les capacités professionnelles.</li>
                  <li>Promouvoir l'entraide et la solidarité.</li>
                  <li>Lutter contre les discriminations.</li>
                  <li>Soutenir l'éducation et la santé des femmes.</li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* TIMELINE / HISTOIRE */}
      <section className="py-24 bg-primary-black">
        <div className="container mx-auto px-6 md:px-12">
          <SlideUp>
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-16">Notre Histoire</h2>
          </SlideUp>

          <div className="max-w-4xl mx-auto relative">
            {/* Ligne verticale */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary-gold/20"></div>

            <StaggerContainer className="space-y-16">
              {[
                { year: "2018", title: "La Genèse", desc: "Les premières réflexions sur la nécessité de créer un espace d'échange et de solidarité pour les femmes greffières." },
                { year: "2020", title: "Création Officielle", desc: "L'AF2G est officiellement reconnue, rassemblant les greffières autour de valeurs communes." },
                { year: "2023", title: "Expansion Nationale", desc: "Installation des bureaux de coordination dans toutes les provinces du Gabon." },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className={`flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="order-1 md:w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-primary-black shadow-xl w-16 h-16 rounded-full border-2 border-primary-gold justify-center my-4 md:my-0">
                      <span className="font-serif font-bold text-primary-gold">{item.year}</span>
                    </div>
                    <div className={`order-1 md:w-5/12 p-6 bg-luxury-gray rounded-sm border border-white/5 ${i % 2 === 0 ? 'text-left md:text-right' : 'text-left'}`}>
                      <h4 className="mb-2 font-serif text-xl text-elegant-white">{item.title}</h4>
                      <p className="text-elegant-white/60 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
