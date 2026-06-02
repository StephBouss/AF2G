"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Users, Calendar, MapPin } from "lucide-react";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { partenaires } from "@/data/partenaires";
import { actions } from "@/data/actions";
import { useRouter } from "next/navigation";

function CIGCountdownMini() {
  const eventDate = new Date("2026-06-08T08:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = eventDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex gap-3 md:gap-5">
      {[{ v: timeLeft.days, l: "J" }, { v: timeLeft.hours, l: "H" }, { v: timeLeft.minutes, l: "M" }, { v: timeLeft.seconds, l: "S" }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="w-14 md:w-16 h-14 md:h-16 bg-primary-gold/15 border border-primary-gold/50 rounded-sm flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-serif font-bold text-primary-gold">{String(v).padStart(2, "0")}</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-elegant-white/50 mt-1 block">{l}</span>
        </div>
      ))}
    </div>
  );
}

const slides = [
  {
    title: "Rencontre Officielle",
    subtitle: "Une audience auprès des autorités pour porter la voix des femmes greffières.",
    image: "/slider-1.jpg"
  },
  {
    title: "L'Équipe de l'AF2G",
    subtitle: "Des membres dynamiques et engagés pour l'excellence au sein de notre profession.",
    image: "/slider-2.jpg"
  },
  {
    title: "Concertation et Action",
    subtitle: "Des sessions de travail stratégiques pour bâtir une justice plus équitable au Gabon.",
    image: "/slider-3.jpg"
  },
  {
    title: "Non aux Cancers des Femmes",
    subtitle: "L'AF2G mobilisée pour la sensibilisation et la lutte contre les cancers féminins.",
    image: "/slider-4.jpg"
  }
];

export default function Home() {
  const router = useRouter();
  const lastThreeActions = [...actions].sort((a, b) => b.dateSort - a.dateSort).slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SLIDER SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-primary-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-primary-black/60 z-10" />
            <Image
              src={slides[currentSlide].image}
              alt="Slide background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 text-elegant-white">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-elegant-white/90 font-light mb-12 uppercase tracking-widest drop-shadow-lg">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <FadeIn delay={0.8} className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary-gold text-primary-black uppercase tracking-wider text-sm font-medium hover:bg-white transition-all duration-300 rounded-sm"
            >
              Nous contacter
            </Link>
          </FadeIn>

          {/* Slider Indicators */}
          <div className="absolute bottom-10 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-primary-gold scale-125 glow-gold" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BANNIÈRE CONGRÈS CIG */}
      <section className="relative bg-[#110B02] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-congres.jpg" 
            alt="Visuel Congrès" 
            fill 
            className="object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#110B02]/80 via-[#110B02]/30 to-[#110B02]/60" />
        </div>
        <div className="container mx-auto px-6 md:px-12 py-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <FadeIn className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary-gold/40 rounded-full mb-5 bg-primary-gold/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse" />
                <span className="text-primary-gold text-xs uppercase tracking-widest font-medium">Événement Historique</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-elegant-white mb-3 leading-tight">
                1<sup>er</sup> Congrès International<br />des Greffiers
              </h2>
              <div className="flex flex-wrap gap-5 text-elegant-white/70 text-sm mb-6">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary-gold" /> 08 – 10 Juin 2026</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary-gold" /> Libreville, Gabon</span>
              </div>
              <Link
                href="/congres"
                className="inline-flex items-center gap-3 px-8 py-4 border border-primary-gold text-primary-gold uppercase tracking-wider text-sm font-medium hover:bg-primary-gold hover:text-primary-black transition-all duration-300 rounded-sm glow-gold-hover"
              >
                S'inscrire au Congrès
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-col items-center gap-3">
              <p className="text-elegant-white/40 text-xs uppercase tracking-widest">L'événement commence dans</p>
              <CIGCountdownMini />
            </FadeIn>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent" />
      </section>

      {/* PRESENTATION SECTION */}
      <section className="py-24 bg-luxury-gray relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <SlideUp>
              <h2 className="text-3xl md:text-5xl font-serif mb-8">Qui sommes-nous ?</h2>
              <div className="w-24 h-1 bg-primary-gold mx-auto mb-10"></div>
              <p className="text-lg md:text-xl text-elegant-white/70 leading-relaxed font-light">
                L'AF2G est une institution dédiée à l'excellence, au leadership et à l'épanouissement des femmes au sein du système judiciaire gabonais. Nous unissons nos forces pour promouvoir la solidarité, défendre nos droits et impacter positivement notre société à travers des actions sociales concrètes.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* VALEURS SECTION */}
      <section className="py-24 bg-primary-black">
        <div className="container mx-auto px-6 md:px-12">
          <SlideUp>
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-16">Nos Valeurs</h2>
          </SlideUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Amour", icon: Heart, desc: "L'empathie et la bienveillance au cœur de toutes nos actions." },
              { title: "Solidarité", icon: Users, desc: "Une sororité infaillible pour s'élever mutuellement." },
              { title: "Pouvoir", icon: Shield, desc: "Le leadership et l'affirmation de la femme gabonaise." }
            ].map((valeur, i) => (
              <StaggerItem key={i}>
                <div className="p-10 border border-white/5 bg-luxury-gray/50 hover:bg-luxury-gray hover:border-primary-gold/50 transition-all duration-500 rounded-sm group h-full">
                  <valeur.icon className="w-12 h-12 text-primary-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-serif mb-4">{valeur.title}</h3>
                  <p className="text-elegant-white/60 font-light leading-relaxed">{valeur.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="py-24 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
        <div className="absolute inset-0 bg-primary-black/90 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { number: "500+", label: "Membres" },
              { number: "9", label: "Provinces" },
              { number: "50+", label: "Actions Sociales" },
              { number: "10k+", label: "Femmes Impactées" }
            ].map((stat, i) => (
              <StaggerItem key={i}>
                <div className="text-3xl md:text-5xl font-serif text-primary-gold mb-4 font-bold">{stat.number}</div>
                <div className="text-sm md:text-base uppercase tracking-widest text-elegant-white/80">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* NOS ACTIONS APERÇU */}
      <section className="py-24 bg-primary-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <SlideUp>
              <h2 className="text-3xl md:text-5xl font-serif">Nos Actions</h2>
              <div className="w-24 h-1 bg-primary-gold mt-6"></div>
            </SlideUp>
            <Link href="/actions" className="hidden md:flex items-center gap-2 text-primary-gold hover:text-white transition-colors group">
              <span className="uppercase tracking-wider text-sm">Voir tout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lastThreeActions.map((action) => (
              <StaggerItem key={action.id}>
                <div
                  className="group cursor-pointer"
                  onClick={() => router.push(`/actions?id=${action.id}`)}
                >
                  <div className="relative h-64 bg-luxury-gray rounded-sm overflow-hidden mb-6">
                    <Image src={action.image} alt={action.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-black/90 to-transparent z-10" />
                    <span className="absolute top-4 right-4 bg-primary-gold text-primary-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm z-20">
                      {action.category}
                    </span>
                    <span className="absolute bottom-4 left-4 text-elegant-white/60 text-xs z-20">{action.date}</span>
                  </div>
                  <h3 className="text-xl font-serif mb-2 group-hover:text-primary-gold transition-colors">{action.title}</h3>
                  <div className="w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-500" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-12 text-center md:hidden">
            <Link href="/actions" className="inline-flex items-center gap-2 text-primary-gold">
              <span className="uppercase tracking-wider text-sm">Voir toutes nos actions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NOS PARTENAIRES */}
      <section className="py-16 bg-dark-gray overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-10 text-center">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-serif">Nos Partenaires</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto mt-4" />
          </SlideUp>
        </div>

        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex gap-6 w-max animate-scroll-left">
            {[...partenaires, ...partenaires].map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-md p-3 flex items-center justify-center w-36 h-20 shrink-0"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={120}
                  height={64}
                  className="object-contain max-h-14 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 relative bg-luxury-gray">
        <div className="container mx-auto px-6 text-center">
          <SlideUp>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Ensemble, allons plus loin.</h2>
            <p className="text-xl text-elegant-white/70 mb-12 max-w-2xl mx-auto font-light">
              Rejoignez l'Association des Femmes Greffières du Gabon et participez à l'édification d'une justice forte et d'une société solidaire.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/contact"
                className="px-10 py-5 bg-primary-gold text-primary-black uppercase tracking-widest text-sm font-medium hover:bg-white transition-all duration-300 rounded-sm glow-gold"
              >
                Nous contacter
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
