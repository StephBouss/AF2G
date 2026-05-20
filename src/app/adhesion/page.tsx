"use client";

import { useState } from "react";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { Check, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const formules = [
  {
    id: "standard",
    name: "Standard",
    price: "25 000",
    desc: "L'adhésion de base pour soutenir nos actions.",
    features: [
      "Carte de membre officielle",
      "Accès aux assemblées générales",
      "Participation aux actions sociales",
      "Newsletter mensuelle",
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "50 000",
    desc: "Un engagement fort pour le leadership féminin.",
    isPopular: true,
    features: [
      "Tous les avantages Standard",
      "Accès prioritaire aux formations",
      "Mentorat professionnel",
      "Invitations VIP aux galas",
    ]
  },
  {
    id: "soutien",
    name: "Soutien",
    price: "100 000",
    desc: "Pour les bienfaiteurs et partenaires d'honneur.",
    features: [
      "Tous les avantages Premium",
      "Mention spéciale sur le site",
      "Rencontres exclusives avec le bureau",
      "Cadeau annuel institutionnel",
    ]
  }
];

export default function Adhesion() {
  const [selectedFormule, setSelectedFormule] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Merci pour votre demande d'adhésion ! Ce formulaire sera bientôt relié à Supabase et aux solutions de paiement (Airtel Money, Moov, etc.).");
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-primary-black">
      {/* HEADER SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary-gold/10 via-primary-black to-primary-black -z-10" />
        <div className="container mx-auto px-6 text-center">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-elegant-white">Adhérer à l'AF2G</h1>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-8"></div>
            <p className="text-xl text-elegant-white/70 max-w-2xl mx-auto font-light">
              Rejoignez un réseau de femmes puissantes et solidaires. Choisissez la formule qui correspond à votre engagement.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {formules.map((formule) => (
              <StaggerItem key={formule.id}>
                <div 
                  onClick={() => setSelectedFormule(formule.id)}
                  className={cn(
                    "relative p-8 h-full rounded-sm border cursor-pointer transition-all duration-500 group flex flex-col",
                    selectedFormule === formule.id 
                      ? "bg-luxury-gray border-primary-gold glow-gold scale-105 z-10" 
                      : "bg-primary-black border-white/10 hover:border-primary-gold/50 hover:bg-luxury-gray/50"
                  )}
                >
                  {formule.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-gold text-primary-black px-4 py-1 text-xs uppercase tracking-widest font-bold rounded-sm">
                      Le plus choisi
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-serif mb-2 text-elegant-white group-hover:text-primary-gold transition-colors">{formule.name}</h3>
                  <p className="text-elegant-white/60 font-light text-sm mb-6 h-10">{formule.desc}</p>
                  
                  <div className="mb-8 flex items-end gap-2">
                    <span className="text-4xl font-serif text-primary-gold font-bold">{formule.price}</span>
                    <span className="text-elegant-white/60 mb-1">FCFA / an</span>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {formule.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
                        <span className="text-elegant-white/80 font-light text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={cn(
                      "w-full py-3 uppercase tracking-wider text-sm font-medium transition-all rounded-sm",
                      selectedFormule === formule.id
                        ? "bg-primary-gold text-primary-black"
                        : "bg-transparent border border-primary-gold text-primary-gold group-hover:bg-primary-gold group-hover:text-primary-black"
                    )}
                  >
                    Sélectionner
                  </button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FORMULAIRE D'ADHÉSION */}
      <section className="py-24 bg-luxury-gray relative">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <FadeIn>
            <div className="bg-primary-black border border-white/5 p-8 md:p-12 rounded-sm relative overflow-hidden">
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="mb-10">
                <h2 className="text-3xl font-serif mb-4 text-primary-gold">Formulaire d'Inscription</h2>
                <p className="text-elegant-white/70 font-light">
                  Veuillez remplir vos informations. Les paiements mobiles (Airtel Money, Moov) seront disponibles prochainement.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Nom</label>
                    <input required type="text" className="w-full bg-luxury-gray border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Prénom</label>
                    <input required type="text" className="w-full bg-luxury-gray border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Email</label>
                    <input required type="email" className="w-full bg-luxury-gray border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Téléphone</label>
                    <input required type="tel" className="w-full bg-luxury-gray border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Ville / Province</label>
                    <input required type="text" className="w-full bg-luxury-gray border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Fonction / Structure</label>
                    <input required type="text" className="w-full bg-luxury-gray border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <label className="text-sm text-elegant-white/80 uppercase tracking-wider block mb-4">Formule Choisie</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {formules.map((f) => (
                      <div 
                        key={f.id}
                        onClick={() => setSelectedFormule(f.id)}
                        className={cn(
                          "border p-4 rounded-sm cursor-pointer transition-colors text-center",
                          selectedFormule === f.id
                            ? "border-primary-gold bg-primary-gold/10 text-primary-gold"
                            : "border-white/10 hover:border-primary-gold/50 text-elegant-white/70"
                        )}
                      >
                        <span className="font-serif block mb-1">{f.name}</span>
                        <span className="text-xs">{f.price} FCFA</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary-gold text-primary-black uppercase tracking-widest font-medium rounded-sm hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 glow-gold-hover"
                  >
                    <CreditCard className="w-5 h-5" />
                    Procéder au paiement
                  </button>
                  <p className="text-center text-elegant-white/40 text-xs mt-4 font-light">
                    Transactions sécurisées. Vos données seront stockées conformément à notre politique de confidentialité.
                  </p>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
