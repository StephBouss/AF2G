"use client";

import Image from "next/image";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { Handshake, HeartHandshake, TrendingUp, ShieldCheck } from "lucide-react";
import { partenaires } from "@/data/partenaires";

export default function Partenariats() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre proposition de partenariat ! Notre équipe vous contactera dans les plus brefs délais.");
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-primary-black">
      {/* HEADER SECTION */}
      <section className="py-20 relative bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-primary-black/80 backdrop-blur-sm" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-elegant-white">Devenir Partenaire</h1>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-8"></div>
            <p className="text-xl text-elegant-white/80 max-w-2xl mx-auto font-light">
              Associez votre image à une institution d'excellence. Ensemble, construisons un avenir plus équitable.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* ILS NOUS FONT CONFIANCE */}
      <section className="py-20 bg-dark-gray border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <SlideUp>
            <h2 className="text-3xl font-serif text-center mb-2">Ils nous font confiance</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-14" />
          </SlideUp>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {partenaires.map((p, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-md p-4 flex items-center justify-center h-28 w-full">
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={140}
                    height={80}
                    className="object-contain max-h-20 w-auto"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* POURQUOI NOUS SOUTENIR & AVANTAGES */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Pourquoi nous soutenir */}
            <div>
              <SlideUp>
                <h2 className="text-3xl font-serif mb-8 text-primary-gold">Pourquoi soutenir l'AF2G ?</h2>
                <div className="space-y-6 text-elegant-white/70 font-light leading-relaxed">
                  <p>
                    En devenant partenaire de l'Association des Femmes Greffières du Gabon, vous vous engagez concrètement pour l'égalité des genres, le leadership féminin et l'amélioration du système judiciaire.
                  </p>
                  <p>
                    Vos contributions soutiennent directement nos programmes de formation, nos actions sociales sur le terrain et nos campagnes de sensibilisation auprès des populations vulnérables.
                  </p>
                </div>
              </SlideUp>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                <StaggerItem>
                  <div className="p-6 bg-luxury-gray border border-white/5 rounded-sm">
                    <HeartHandshake className="w-8 h-8 text-primary-gold mb-4" />
                    <h4 className="font-serif text-lg mb-2 text-elegant-white">Impact Social</h4>
                    <p className="text-sm text-elegant-white/60">Soutien direct aux femmes et communautés défavorisées.</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-6 bg-luxury-gray border border-white/5 rounded-sm">
                    <TrendingUp className="w-8 h-8 text-primary-gold mb-4" />
                    <h4 className="font-serif text-lg mb-2 text-elegant-white">Développement</h4>
                    <p className="text-sm text-elegant-white/60">Participation à la formation continue de l'élite judiciaire.</p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Avantages Partenaires */}
            <div className="bg-luxury-gray p-10 border border-primary-gold/20 rounded-sm">
              <SlideUp>
                <h3 className="text-2xl font-serif mb-8 text-elegant-white flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary-gold" />
                  Vos Avantages
                </h3>
                <ul className="space-y-6">
                  {[
                    "Visibilité institutionnelle sur tous nos supports de communication (site web, brochures, réseaux sociaux).",
                    "Invitation en tant qu'invité d'honneur à nos événements officiels et galas de charité.",
                    "Possibilité de co-créer des événements ou des campagnes de sensibilisation ciblées.",
                    "Valorisation de votre démarche RSE (Responsabilité Sociétale des Entreprises)."
                  ].map((avantage, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-2 shrink-0" />
                      <span className="text-elegant-white/70 font-light leading-relaxed">{avantage}</span>
                    </li>
                  ))}
                </ul>
              </SlideUp>
            </div>

          </div>
        </div>
      </section>

      {/* FORMULAIRE PARTENARIAT */}
      <section className="py-24 bg-luxury-gray border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <FadeIn>
            <div className="text-center mb-12">
              <Handshake className="w-12 h-12 text-primary-gold mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-serif mb-4 text-elegant-white">Proposer un partenariat</h2>
              <p className="text-elegant-white/60 font-light">
                Remplissez ce formulaire et notre bureau vous recontactera pour échanger sur les modalités de collaboration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Nom de l'Entreprise / ONG</label>
                  <input required type="text" className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Secteur d'activité</label>
                  <input required type="text" className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Nom du Contact</label>
                  <input required type="text" className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Email Professionnel</label>
                  <input required type="email" className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Message / Proposition</label>
                <textarea required rows={5} className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light resize-none"></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary-gold text-primary-black uppercase tracking-widest font-medium rounded-sm hover:bg-white transition-all duration-300 glow-gold-hover"
              >
                Envoyer la proposition
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
