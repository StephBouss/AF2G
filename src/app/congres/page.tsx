"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import {
  Calendar, MapPin, Mail, Phone, Users, BookOpen,
  Globe, Coffee, Briefcase, Utensils, ChevronDown, ArrowRight, Check
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
const categories = [
  { num: 1, title: "Société", desc: "3 personnes + RCCM Obligatoire", price: "40.000", icon: Briefcase },
  { num: 2, title: "Chefs d'Entreprises", desc: "Dirigeants & Entrepreneurs", price: "35.000", icon: Users },
  { num: 3, title: "Professions Libérales", desc: "Avocats, Notaires, Huissiers…", price: "30.000", icon: BookOpen },
  { num: 4, title: "Magistrats & Greffiers", desc: "Professionnels de la Justice", price: "25.000", icon: Globe },
  { num: 5, title: "Fonctionnaires", desc: "Agents de l'État", price: "20.000", icon: Users },
  { num: 6, title: "Enseignants Chercheurs", desc: "Universitaires & Chercheurs", price: "15.000", icon: BookOpen },
  { num: 7, title: "Participants", desc: "Autres", price: "10.000", icon: Users },
  { num: 8, title: "Étudiants", desc: "Carte Étudiant Obligatoire", price: "5.000", icon: BookOpen },
];

const activities = [
  { label: "Conférences", icon: BookOpen },
  { label: "Tables Rondes", icon: Users },
  { label: "Exposition", icon: Globe },
  { label: "Networking", icon: Coffee },
  { label: "B2B", icon: Briefcase },
  { label: "Dîner de Gala", icon: Utensils },
];

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent" />;
}

// ---------- Page ----------
export default function CongresPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", telephone: "",
    organisation: "", categorie: "", pays: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedCat = categories.find(c => c.num === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-black">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-gray via-primary-black to-primary-black" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#B8860B 0,#B8860B 1px,transparent 0,transparent 50%)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary-gold/8 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-primary-gold/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center py-24">
          {/* Badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 border border-primary-gold/40 rounded-full mb-10 bg-primary-gold/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary-gold animate-pulse" />
              <span className="text-primary-gold text-xs uppercase tracking-[0.2em] font-medium">
                1<sup>er</sup> Congrès International des Greffiers
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-elegant-white leading-none mb-4">
              REJOIGNEZ-NOUS
            </h1>
            <p className="text-lg md:text-xl text-gradient-gold font-medium uppercase tracking-[0.15em] mb-10">
              Pour cet événement historique
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-14 text-elegant-white/75 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-gold" />
                Du 08 au 10 Juin 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-gold" />
                Libreville, Gabon
              </span>
            </div>
          </FadeIn>

          {/* Countdown */}
          <FadeIn delay={0.45}>
            <div className="max-w-lg mx-auto mb-14">
              <p className="text-xs uppercase tracking-[0.2em] text-elegant-white/35 mb-5">L'événement commence dans</p>
              <Countdown />
            </div>
          </FadeIn>

          {/* CTAs — même style exact que "Adhérer" */}
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="#inscription"
                className="px-8 py-4 bg-primary-gold text-primary-black uppercase tracking-wider text-sm font-medium hover:bg-white transition-all duration-300 rounded-sm glow-gold"
              >
                S'inscrire Maintenant
              </a>
              <a
                href="#tarifs"
                className="px-8 py-4 border border-primary-gold text-primary-gold uppercase tracking-wider text-sm font-medium hover:bg-primary-gold hover:text-primary-black transition-all duration-300 glow-gold-hover rounded-sm"
              >
                Voir les Tarifs
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ THÈME ═══════ */}
      <Divider />
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <SlideUp>
              <p className="text-gradient-gold text-xs uppercase tracking-[0.2em] mb-5 font-medium">Thème officiel</p>
              <h2 className="text-xl md:text-3xl font-serif font-bold text-elegant-white leading-relaxed">
                &ldquo;Le Greffe au Cœur de la Modernisation de l&rsquo;État : Pilier de la Performance Économique, de la Transition Numérique et de la Gouvernance Interinstitutionnelle&rdquo;
              </h2>
              <div className="w-20 h-0.5 bg-gradient-gold mx-auto mt-10" />
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ═══════ ACTIVITÉS ═══════ */}
      <Divider />
      <section className="py-20 bg-primary-black">
        <div className="container mx-auto px-6 md:px-12">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-2 text-elegant-white">Au Programme</h2>
            <p className="text-center text-elegant-white/50 text-sm mb-14 uppercase tracking-widest">Des journées riches en échanges</p>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {activities.map((act, i) => (
              <StaggerItem key={i}>
                <div className="text-center p-5 md:p-6 border border-white/5 bg-luxury-gray/50 hover:bg-luxury-gray hover:border-primary-gold/50 transition-all duration-500 rounded-sm group cursor-default">
                  <act.icon className="w-7 h-7 text-primary-gold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm text-elegant-white/80 font-medium leading-tight">{act.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ TARIFS ═══════ */}
      <Divider />
      <section id="tarifs" className="py-20 bg-dark-gray">
        <div className="container mx-auto px-6 md:px-12">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-2 text-elegant-white">Frais de Participation</h2>
            <p className="text-center text-elegant-white/50 text-sm mb-14 uppercase tracking-widest">Choisissez votre catégorie — cliquez pour sélectionner</p>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <StaggerItem key={cat.num}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat.num);
                    setFormData(f => ({ ...f, categorie: String(cat.num) }));
                    document.getElementById("inscription")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full text-left p-5 rounded-sm border transition-all duration-300 group relative overflow-hidden ${
                    selectedCategory === cat.num
                      ? "border-primary-gold bg-primary-gold/10 glow-gold"
                      : "border-white/5 bg-luxury-gray/50 hover:border-primary-gold/50 hover:bg-luxury-gray"
                  }`}
                >
                  {selectedCategory === cat.num && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-gold flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-black" />
                    </div>
                  )}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-primary-black font-bold text-xs flex-shrink-0 mt-0.5">
                      {cat.num}
                    </span>
                    <h3 className="font-serif font-bold text-elegant-white text-base leading-snug">{cat.title}</h3>
                  </div>
                  <p className="text-elegant-white/50 text-xs mb-4 pl-10">{cat.desc}</p>
                  <div className="pl-10">
                    <span className="text-2xl font-serif font-bold text-gradient-gold">{cat.price}</span>
                    <span className="text-xs text-elegant-white/50 ml-1">FCFA</span>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {selectedCat && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 max-w-md mx-auto text-center p-5 border border-primary-gold/40 rounded-sm bg-primary-gold/10 glow-gold"
            >
              <p className="text-elegant-white/70 text-sm">Catégorie sélectionnée :</p>
              <p className="text-gradient-gold font-serif font-bold text-lg">{selectedCat.title} — {selectedCat.price} FCFA</p>
              <a href="#inscription" className="inline-flex items-center gap-2 text-xs text-elegant-white/50 hover:text-primary-gold transition-colors mt-2 uppercase tracking-wider">
                Compléter le formulaire <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════ FORMULAIRE ═══════ */}
      <Divider />
      <section id="inscription" className="py-20 bg-primary-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-2 text-elegant-white">Inscription en Ligne</h2>
              <p className="text-center text-elegant-white/50 text-sm mb-14 uppercase tracking-widest">Réservez votre place dès maintenant</p>
            </SlideUp>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-16 border border-primary-gold/30 rounded-sm bg-primary-gold/10 glow-gold"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-gold/20 border border-primary-gold flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-primary-gold" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4 text-elegant-white">Inscription Enregistrée !</h3>
                  <p className="text-elegant-white/60 mb-8 max-w-sm mx-auto">
                    Votre demande a été prise en compte. Vous recevrez sous peu une confirmation avec les instructions de paiement.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedCategory(null);
                      setFormData({ nom: "", prenom: "", email: "", telephone: "", organisation: "", categorie: "", pays: "", message: "" });
                    }}
                    className="px-6 py-2.5 border border-primary-gold text-primary-gold uppercase tracking-wider text-sm font-medium hover:bg-primary-gold hover:text-primary-black transition-all duration-300 rounded-sm"
                  >
                    Nouvelle inscription
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Nom *</label>
                      <input
                        type="text" required value={formData.nom}
                        onChange={e => setFormData({ ...formData, nom: e.target.value })}
                        placeholder="Votre nom"
                        className="w-full px-5 py-4 bg-luxury-gray/50 border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white placeholder:text-white/25 outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Prénom *</label>
                      <input
                        type="text" required value={formData.prenom}
                        onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                        placeholder="Votre prénom"
                        className="w-full px-5 py-4 bg-luxury-gray/50 border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white placeholder:text-white/25 outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Email *</label>
                      <input
                        type="email" required value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre@email.com"
                        className="w-full px-5 py-4 bg-luxury-gray/50 border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white placeholder:text-white/25 outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Téléphone *</label>
                      <input
                        type="tel" required value={formData.telephone}
                        onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                        placeholder="+241 XX XX XX XX"
                        className="w-full px-5 py-4 bg-luxury-gray/50 border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white placeholder:text-white/25 outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Organisation / Institution</label>
                    <input
                      type="text" value={formData.organisation}
                      onChange={e => setFormData({ ...formData, organisation: e.target.value })}
                      placeholder="Nom de votre organisation"
                      className="w-full px-5 py-4 bg-luxury-gray/50 border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white placeholder:text-white/25 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Catégorie de participation *</label>
                    <div className="relative">
                      <select
                        required value={formData.categorie}
                        onChange={e => {
                          setFormData({ ...formData, categorie: e.target.value });
                          setSelectedCategory(e.target.value ? Number(e.target.value) : null);
                        }}
                        className="w-full px-5 py-4 bg-luxury-gray border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white outline-none transition-colors appearance-none text-sm"
                      >
                        <option value="" className="bg-luxury-gray">— Sélectionnez votre catégorie —</option>
                        {categories.map(cat => (
                          <option key={cat.num} value={cat.num} className="bg-luxury-gray">
                            {cat.num}. {cat.title} — {cat.price} FCFA
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-elegant-white/40 pointer-events-none" />
                    </div>
                    {selectedCat && (
                      <p className="text-gradient-gold text-xs mt-2 pl-1">
                        Montant : <strong>{selectedCat.price} FCFA</strong>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Pays de provenance *</label>
                    <input
                      type="text" required value={formData.pays}
                      onChange={e => setFormData({ ...formData, pays: e.target.value })}
                      placeholder="Ex : Gabon, France, Cameroun…"
                      className="w-full px-5 py-4 bg-luxury-gray/50 border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white placeholder:text-white/25 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-elegant-white/60 mb-2">Message (facultatif)</label>
                    <textarea
                      rows={4} value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Informations complémentaires, besoins spéciaux…"
                      className="w-full px-5 py-4 bg-luxury-gray/50 border border-white/10 focus:border-primary-gold/60 rounded-sm text-elegant-white placeholder:text-white/25 outline-none transition-colors resize-none text-sm"
                    />
                  </div>

                  {/* Bouton — même style exact que "Adhérer" dans la Navbar, agrandi */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full px-10 py-5 bg-primary-gold text-primary-black uppercase tracking-widest text-sm font-medium hover:bg-white transition-all duration-300 rounded-sm glow-gold flex items-center justify-center gap-3"
                    >
                      Soumettre mon Inscription
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-elegant-white/30 text-xs mt-4">
                      * Champs obligatoires — Le paiement sera effectué à l&rsquo;étape suivante
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <Divider />
      <section className="py-14 bg-dark-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
            <a
              href="mailto:araban20@yahoo.fr"
              className="flex items-center gap-4 text-elegant-white/65 hover:text-primary-gold transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-primary-gold/30 group-hover:border-primary-gold/70 flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-primary-gold" />
              </div>
              <span className="text-sm">araban20@yahoo.fr</span>
            </a>
            <a
              href="tel:+24106667225"
              className="flex items-center gap-4 text-elegant-white/65 hover:text-primary-gold transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-primary-gold/30 group-hover:border-primary-gold/70 flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5 text-primary-gold" />
              </div>
              <span className="text-sm">+241 066 67 22 50 / 074 41 30 71</span>
            </a>
          </div>
          <div className="text-center mt-10">
            <Link href="/" className="text-elegant-white/30 hover:text-elegant-white/70 text-xs uppercase tracking-widest transition-colors">
              ← Retour au site AF2G
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
