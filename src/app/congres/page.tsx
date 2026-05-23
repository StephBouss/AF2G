"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import {
  Calendar, MapPin, Mail, Phone, Users, Globe, Briefcase, 
  ChevronDown, ArrowRight, Check, Star, Shield, Trophy, Award, Crown, CheckCircle2
} from "lucide-react";

// ---------- Countdown ----------
function Countdown() {
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

  const units = [
    { value: timeLeft.days, label: "Jours" },
    { value: timeLeft.hours, label: "Heures" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Secondes" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-5">
      {units.map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="bg-primary-gold/15 border border-primary-gold/50 rounded-sm p-3 md:p-5 backdrop-blur-sm">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-5xl font-serif font-bold text-primary-gold"
              >
                {String(value).padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-elegant-white/50 mt-2">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- Data ----------
const packs = [
  { 
    id: "bronze", 
    title: "BRONZE", 
    price: "250.000", 
    icon: Shield,
    color: "from-orange-700/20 to-orange-900/20",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-400",
    advantages: [
      "03 mois d'assistance judiciaire.",
      "Logo sur tous les supports de communication pendant 03 mois.",
      "Participation aux activités de l'AF2G durant la période.",
      "Statut de membre maintenu pendant un an."
    ] 
  },
  { 
    id: "argent", 
    title: "ARGENT / SILVER", 
    price: "350.000", 
    icon: Award,
    color: "from-slate-400/20 to-slate-600/20",
    borderColor: "border-slate-300/30",
    textColor: "text-slate-300",
    advantages: [
      "06 mois d'assistance judiciaire.",
      "Logo sur tous les supports de communication pendant 06 mois.",
      "Participation aux activités de l'AF2G durant la période.",
      "Statut de membre maintenu pendant un an."
    ] 
  },
  { 
    id: "or", 
    title: "OR / GOLD", 
    price: "500.000", 
    icon: Trophy,
    color: "from-yellow-500/20 to-yellow-700/20",
    borderColor: "border-yellow-400/50",
    textColor: "text-yellow-400",
    popular: true,
    advantages: [
      "09 mois d'assistance judiciaire.",
      "Participation aux Assemblées Générales (AG).",
      "Logo sur tous les supports de communication pendant 09 mois.",
      "Accès à toutes les activités de l'AF2G.",
      "Statut de membre maintenu pendant un an."
    ] 
  },
  { 
    id: "platine", 
    title: "PLATINE / PLATINUM", 
    price: "1.500.000", 
    icon: Star,
    color: "from-indigo-300/20 to-indigo-500/20",
    borderColor: "border-indigo-300/40",
    textColor: "text-indigo-200",
    advantages: [
      "01 an d'assistance judiciaire.",
      "Participation aux AG.",
      "Logo sur tous les supports de communication pendant 01 an.",
      "Accès à toutes les activités de l'AF2G avec 05 minutes d'intervention pour présenter votre structure.",
      "Statut de membre maintenu pendant 01 an.",
      "NB : Statut d'invité d'honneur à toutes les cérémonies."
    ] 
  },
  { 
    id: "diamant", 
    title: "DIAMANT / DIAMOND", 
    price: "10.000.000", 
    icon: Crown,
    color: "from-cyan-300/20 to-cyan-600/20",
    borderColor: "border-cyan-300/50",
    textColor: "text-cyan-300",
    advantages: [
      "01 an d'assistance judiciaire.",
      "Participation aux AG.",
      "Logo sur tous les supports de l'AF2G et de l'UPMG pendant 01 an.",
      "Accès aux activités AF2G et UPMG (stand à votre charge).",
      "10 min de présentation et intervention aux activités scientifiques.",
      "Statut de membre pendant 01 an.",
      "NB : Statut d'invité super privilégié."
    ] 
  },
];

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent" />;
}

const countryCodes = [
  { code: "+241", flag: "🇬🇦", name: "Gabon" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+237", flag: "🇨🇲", name: "Cameroun" },
  { code: "+225", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+242", flag: "🇨🇬", name: "Congo" },
  { code: "+243", flag: "🇨🇩", name: "RDC" },
  { code: "+221", flag: "🇸🇳", name: "Sénégal" },
  { code: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "+229", flag: "🇧🇯", name: "Bénin" },
  { code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "+224", flag: "🇬🇳", name: "Guinée" },
  { code: "+212", flag: "🇲🇦", name: "Maroc" },
  { code: "+213", flag: "🇩🇿", name: "Algérie" },
  { code: "+216", flag: "🇹🇳", name: "Tunisie" },
  { code: "+27", flag: "🇿🇦", name: "Afrique du Sud" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+1", flag: "🇺🇸", name: "USA/Canada" },
  { code: "+44", flag: "🇬🇧", name: "Royaume-Uni" },
  { code: "+32", flag: "🇧🇪", name: "Belgique" },
  { code: "+41", flag: "🇨🇭", name: "Suisse" },
  { code: "+971", flag: "🇦🇪", name: "Émirats Arabes Unis" },
  { code: "+86", flag: "🇨🇳", name: "Chine" },
];

export default function CongresPage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    denomination: "", formeJuridique: "", titre: "", 
    adresse: "", email: "", telephone: "", countryCode: "+241", montant: "", pack: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#110B02] font-sans">
      
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-congres.jpg" 
            alt="Hero Congrès" 
            fill 
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110B02]/30 via-[#110B02]/70 to-[#110B02]" />
        </div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-gold/10 blur-[150px] pointer-events-none z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center py-24 flex flex-col items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 border border-primary-gold/40 rounded-full mb-8 bg-primary-gold/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary-gold animate-pulse" />
              <span className="text-primary-gold text-xs uppercase tracking-[0.2em] font-medium">
                Opportunités Exclusives de Partenariat
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-elegant-white leading-tight mb-6 max-w-5xl mx-auto">
              1<sup>er</sup> CONGRÈS INTERNATIONAL DES GREFFIERS
            </h1>
            <p className="text-lg md:text-2xl text-gradient-gold font-medium uppercase tracking-[0.1em] mb-12 max-w-3xl mx-auto leading-relaxed">
              Devenez partenaire d'un événement d'envergure internationale incontournable
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 text-elegant-white/80 text-sm md:text-base font-medium bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md">
              <span className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary-gold" />
                08 - 10 Juin 2026
              </span>
              <span className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-gold" />
                Libreville, Gabon
              </span>
            </div>
          </FadeIn>

          {/* Countdown */}
          <FadeIn delay={0.45}>
            <div className="max-w-xl mx-auto mb-16">
              <p className="text-xs uppercase tracking-[0.2em] text-elegant-white/40 mb-6">L'événement commence dans</p>
              <Countdown />
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="#packs"
                className="px-10 py-5 bg-primary-gold text-primary-black uppercase tracking-wider text-sm font-bold hover:bg-white transition-all duration-300 rounded-sm glow-gold shadow-[0_0_40px_rgba(184,134,11,0.4)]"
              >
                Découvrir les Packs Partenaires
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ POURQUOI INVESTIR ═══════ */}
      <Divider />
      <section className="py-24 bg-[#1A1104] relative overflow-hidden">
        <div className="absolute -right-40 top-20 w-96 h-96 bg-primary-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <SlideUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-elegant-white mb-6">Pourquoi investir dans le CIG 2026 ?</h2>
              <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8" />
              <p className="text-lg text-elegant-white/70 max-w-4xl mx-auto font-light leading-relaxed">
                Le 1er Congrès International des Greffiers, organisé par l'AF2G, est une <strong>plateforme unique</strong> pour les acteurs majeurs de la justice et de l'économie.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StaggerItem>
              <div className="p-8 bg-[#241806]/40 border border-white/5 rounded-sm h-full hover:border-primary-gold/30 transition-colors">
                <Users className="w-10 h-10 text-primary-gold mb-6" />
                <h3 className="text-3xl font-serif font-bold text-elegant-white mb-2">1000+</h3>
                <p className="text-sm uppercase tracking-widest text-primary-gold mb-4">Participants Attendus</p>
                <p className="text-elegant-white/50 text-sm">Professionnels, experts et décideurs du secteur.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-8 bg-[#241806]/40 border border-white/5 rounded-sm h-full hover:border-primary-gold/30 transition-colors">
                <Globe className="w-10 h-10 text-primary-gold mb-6" />
                <h3 className="text-3xl font-serif font-bold text-elegant-white mb-2">10+</h3>
                <p className="text-sm uppercase tracking-widest text-primary-gold mb-4">Pays Invités</p>
                <p className="text-elegant-white/50 text-sm">Des délégations d'Afrique, d'Europe et d'Amérique.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-8 bg-[#241806]/40 border border-white/5 rounded-sm h-full hover:border-primary-gold/30 transition-colors">
                <Briefcase className="w-10 h-10 text-primary-gold mb-6" />
                <h3 className="text-xl font-serif font-bold text-elegant-white mb-2 leading-snug">Portée & Visibilité Exceptionnelles</h3>
                <p className="text-elegant-white/50 text-sm mt-4">Soutenu par le Ministre de la Justice et en collaboration avec <strong>18 ministères</strong> et administrations publiques.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-8 bg-[#241806]/40 border border-white/5 rounded-sm h-full hover:border-primary-gold/30 transition-colors">
                <Shield className="w-10 h-10 text-primary-gold mb-6" />
                <h3 className="text-xl font-serif font-bold text-elegant-white mb-2 leading-snug">Auditoire de Haute Qualité</h3>
                <p className="text-elegant-white/50 text-sm mt-4">Présidé par des professeurs éminents, docteurs et responsables d'organisations régionales.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <SlideUp>
            <div className="bg-gradient-to-r from-primary-gold/10 via-primary-gold/5 to-transparent border-l-4 border-primary-gold p-8 rounded-r-sm">
              <p className="text-elegant-white/90 text-lg md:text-xl font-light italic leading-relaxed">
                "Votre partenariat vous positionnera au cœur des discussions sur la modernisation de l'État, la performance économique, la transition numérique et la gouvernance interinstitutionnelle."
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════ BONUS EXCLUSIFS ═══════ */}
      <Divider />
      <section className="py-20 bg-[#110B02]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <SlideUp>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary-gold/40 rounded-full mb-6 bg-primary-gold/10">
                  <Star className="w-4 h-4 text-primary-gold" />
                  <span className="text-primary-gold text-xs uppercase tracking-widest font-medium">Avantages Uniques</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-elegant-white mb-6 leading-tight">
                  Bonus Exclusifs pour les Acheteurs du Premier Événement
                </h2>
                <p className="text-elegant-white/60 mb-10 text-lg">
                  En tant que partenaire privilégié de cette première édition, bénéficiez d'avantages exclusifs sur le long terme :
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Réduction Spéciale", desc: "Profitez de tarifs préférentiels sur les futures éditions du Congrès." },
                    { title: "Priorité de Réservation", desc: "Accédez en avant-première aux opportunités de sponsoring et aux meilleurs emplacements pour les événements futurs." },
                    { title: "Accès Networking Premium", desc: "Participez à des sessions de réseautage exclusives avec les personnalités clés et les décideurs du secteur." }
                  ].map((bonus, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary-gold/20 border border-primary-gold/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-gold" />
                      </div>
                      <div>
                        <h4 className="text-elegant-white font-bold text-lg mb-1">{bonus.title}</h4>
                        <p className="text-elegant-white/60 text-sm leading-relaxed">{bonus.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SlideUp>
            </div>
            <div className="flex-1 relative w-full">
              <SlideUp delay={0.2}>
                <div className="aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-gold/20 to-transparent rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 bg-[#110B02] rounded-full border border-primary-gold/30 flex items-center justify-center p-10 text-center">
                    <div>
                      <Crown className="w-16 h-16 text-primary-gold mx-auto mb-4" />
                      <h3 className="text-2xl font-serif font-bold text-elegant-white mb-2">Partenaire Privilégié</h3>
                      <p className="text-primary-gold/80 text-sm uppercase tracking-widest">Édition Historique</p>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PACKS PARTENAIRES ═══════ */}
      <Divider />
      <section id="packs" className="py-24 bg-[#241806] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-gold/50 to-transparent" />
        <div className="container mx-auto px-6 md:px-12">
          <SlideUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-elegant-white mb-6">Avantages Détaillés</h2>
              <p className="text-elegant-white/50 uppercase tracking-widest text-sm">Sélectionnez le pack qui correspond à vos ambitions</p>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {packs.map((pack, i) => (
              <SlideUp key={pack.id} delay={i * 0.1} className="h-full">
                <div 
                  className={`h-full flex flex-col relative bg-[#110B02] border rounded-md overflow-hidden transition-all duration-300 ${
                    selectedPack === pack.id 
                      ? `${pack.borderColor} ring-2 ring-primary-gold shadow-[0_0_30px_rgba(184,134,11,0.2)] scale-105 z-10` 
                      : `${pack.borderColor} hover:border-primary-gold/50 hover:-translate-y-2`
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute top-0 inset-x-0 bg-gradient-gold text-primary-black text-[10px] font-bold uppercase tracking-widest py-1.5 text-center">
                      Recommandé
                    </div>
                  )}
                  
                  <div className={`p-6 bg-gradient-to-b ${pack.color} border-b ${pack.borderColor} flex-shrink-0 ${pack.popular ? 'pt-8' : ''}`}>
                    <pack.icon className={`w-10 h-10 mb-4 ${pack.textColor}`} />
                    <h3 className={`text-xl font-serif font-bold mb-1 ${pack.textColor}`}>{pack.title}</h3>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-2xl lg:text-3xl font-bold text-elegant-white">{pack.price}</span>
                      <span className="text-xs text-elegant-white/50 font-medium">FCFA</span>
                    </div>
                    {pack.title.includes("PLATINE") || pack.title.includes("DIAMANT") ? (
                      <p className="text-xs text-elegant-white/40 mt-1 uppercase tracking-wider">À partir de</p>
                    ) : (
                      <div className="h-5" />
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <ul className="space-y-4 flex-1 mb-8">
                      {pack.advantages.map((adv, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pack.textColor}`} />
                          <span className={adv.startsWith("NB") ? "text-elegant-white/90 font-medium italic" : "text-elegant-white/70"}>
                            {adv}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        setSelectedPack(pack.id);
                        setFormData(f => ({ ...f, pack: pack.title, montant: pack.price }));
                        document.getElementById("formulaire")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`w-full py-3.5 rounded-sm uppercase tracking-wider text-xs font-bold transition-all duration-300 border ${
                        selectedPack === pack.id
                          ? "bg-primary-gold text-primary-black border-primary-gold"
                          : `bg-transparent ${pack.textColor} ${pack.borderColor} hover:bg-white/5`
                      }`}
                    >
                      {selectedPack === pack.id ? "Pack Sélectionné" : "Choisir ce Pack"}
                    </button>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FORMULAIRE PARTENARIAT ═══════ */}
      <Divider />
      <section id="formulaire" className="py-24 bg-[#110B02] relative">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <SlideUp>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif text-elegant-white mb-4">Fiche de Partenariat</h2>
                <p className="text-elegant-white/50 text-sm uppercase tracking-widest">Informations à compléter pour valider votre engagement</p>
              </div>
            </SlideUp>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-16 border border-primary-gold/30 rounded-sm bg-primary-gold/10 glow-gold backdrop-blur-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-primary-gold/20 border border-primary-gold flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary-gold" />
                  </div>
                  <h3 className="text-3xl font-serif mb-4 text-elegant-white">Partenariat Enregistré !</h3>
                  <p className="text-elegant-white/70 mb-8 max-w-lg mx-auto text-lg">
                    Merci pour votre engagement. Votre fiche a été transmise avec succès. Notre équipe vous contactera dans les plus brefs délais pour finaliser les modalités.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedPack(null);
                      setFormData({ denomination: "", formeJuridique: "", titre: "", adresse: "", email: "", telephone: "", countryCode: "+241", montant: "", pack: "" });
                    }}
                    className="px-8 py-3 border border-primary-gold text-primary-gold uppercase tracking-wider text-sm font-medium hover:bg-primary-gold hover:text-primary-black transition-all duration-300 rounded-sm"
                  >
                    Nouvelle soumission
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#241806]/40 border border-white/10 p-8 md:p-12 rounded-sm backdrop-blur-md">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Dénomination / Nom et Prénom *</label>
                        <input
                          type="text" required value={formData.denomination}
                          onChange={e => setFormData({ ...formData, denomination: e.target.value })}
                          className="w-full px-5 py-4 bg-[#110B02]/50 border border-white/10 focus:border-primary-gold rounded-sm text-elegant-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Forme Juridique</label>
                        <input
                          type="text" value={formData.formeJuridique}
                          onChange={e => setFormData({ ...formData, formeJuridique: e.target.value })}
                          placeholder="Ex: SARL, SA, Association..."
                          className="w-full px-5 py-4 bg-[#110B02]/50 border border-white/10 focus:border-primary-gold rounded-sm text-elegant-white placeholder:text-white/20 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Titre / Fonction *</label>
                        <input
                          type="text" required value={formData.titre}
                          onChange={e => setFormData({ ...formData, titre: e.target.value })}
                          className="w-full px-5 py-4 bg-[#110B02]/50 border border-white/10 focus:border-primary-gold rounded-sm text-elegant-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Rang de Partenariat *</label>
                        <div className="relative">
                          <select
                            required value={formData.pack}
                            onChange={e => {
                              setFormData({ ...formData, pack: e.target.value });
                              const p = packs.find(pack => pack.title === e.target.value);
                              if (p) {
                                setSelectedPack(p.id);
                                setFormData(prev => ({ ...prev, montant: p.price }));
                              }
                            }}
                            className="w-full px-5 py-4 bg-[#110B02]/50 border border-white/10 focus:border-primary-gold rounded-sm text-elegant-white outline-none transition-colors appearance-none"
                          >
                            <option value="">— Sélectionnez —</option>
                            {packs.map(p => (
                              <option key={p.id} value={p.title} className="bg-[#241806]">{p.title}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-elegant-white/40 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Adresse *</label>
                      <input
                        type="text" required value={formData.adresse}
                        onChange={e => setFormData({ ...formData, adresse: e.target.value })}
                        className="w-full px-5 py-4 bg-[#110B02]/50 border border-white/10 focus:border-primary-gold rounded-sm text-elegant-white outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Email *</label>
                        <input
                          type="email" required value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 bg-[#110B02]/50 border border-white/10 focus:border-primary-gold rounded-sm text-elegant-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Téléphone *</label>
                        <div className="flex h-[58px]">
                          <div className="relative flex-shrink-0 h-full">
                            <select
                              value={formData.countryCode}
                              onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
                              className="h-full appearance-none bg-[#110B02]/50 border border-r-0 border-white/10 focus:border-primary-gold rounded-l-sm text-elegant-white px-4 pr-8 outline-none transition-colors cursor-pointer"
                            >
                              {countryCodes.map(c => (
                                <option key={c.name} value={c.code} className="bg-[#241806] text-base">
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-elegant-white/40 pointer-events-none" />
                          </div>
                          <input
                            type="tel" required value={formData.telephone}
                            onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                            className="w-full h-full px-5 bg-[#110B02]/50 border border-white/10 focus:border-primary-gold rounded-r-sm text-elegant-white outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-elegant-white/70 mb-3 font-medium">Montant de la Contribution (FCFA) *</label>
                      <input
                        type="text" required value={formData.montant}
                        onChange={e => setFormData({ ...formData, montant: e.target.value })}
                        className="w-full px-5 py-4 bg-[#110B02]/50 border border-primary-gold/40 focus:border-primary-gold rounded-sm text-gradient-gold font-bold text-lg outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-8 border-t border-white/10">
                      <button
                        type="submit"
                        className="w-full py-5 bg-primary-gold text-primary-black uppercase tracking-widest text-sm font-bold hover:bg-white transition-all duration-300 rounded-sm glow-gold flex items-center justify-center gap-3"
                      >
                        Valider mon partenariat
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <p className="text-center text-elegant-white/40 text-xs mt-6">
                        Ou retournez cette fiche dûment complétée à : <a href="mailto:associationaf2g@gmail.com" className="text-primary-gold hover:underline">associationaf2g@gmail.com</a>
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER CONTACT ═══════ */}
      <Divider />
      <section className="py-16 bg-[#1A1104] text-center">
        <div className="container mx-auto px-6">
          <p className="text-elegant-white/50 text-sm uppercase tracking-widest mb-6">Pour plus d'informations</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <a href="mailto:associationaf2g@gmail.com" className="flex items-center gap-3 text-elegant-white/70 hover:text-primary-gold transition-colors">
              <Mail className="w-5 h-5 text-primary-gold" />
              <span>associationaf2g@gmail.com</span>
            </a>
            <a href="tel:+24166672250" className="flex items-center gap-3 text-elegant-white/70 hover:text-primary-gold transition-colors">
              <Phone className="w-5 h-5 text-primary-gold" />
              <span>(+241) 66 67 22 50 / 074 41 30 71</span>
            </a>
            <a href="https://www.c-ig2026.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-elegant-white/70 hover:text-primary-gold transition-colors">
              <Globe className="w-5 h-5 text-primary-gold" />
              <span>www.c-ig2026.com</span>
            </a>
          </div>
          <div className="mt-16">
            <Link href="/" className="text-elegant-white/30 hover:text-elegant-white/70 text-xs uppercase tracking-widest transition-colors">
              ← Retour au site de l'AF2G
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
