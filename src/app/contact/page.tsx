"use client";

import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { Mail, MapPin, Phone, Share2, MessageCircle, Globe, Send } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre message ! Nous vous répondrons très bientôt.");
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-primary-black">
      {/* HEADER SECTION */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-elegant-white">Contactez-nous</h1>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-8"></div>
            <p className="text-xl text-elegant-white/70 max-w-2xl mx-auto font-light">
              Une question, une suggestion ou besoin d'informations ? Notre équipe est à votre écoute.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Infos Contact */}
            <div className="w-full lg:w-1/3">
              <FadeIn>
                <div className="bg-luxury-gray p-10 border border-white/5 rounded-sm h-full relative overflow-hidden group hover:border-primary-gold/30 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/10 rounded-bl-full pointer-events-none group-hover:bg-primary-gold/20 transition-colors" />
                  
                  <h2 className="text-2xl font-serif mb-10 text-elegant-white">Coordonnées</h2>
                  
                  <StaggerContainer className="space-y-8">
                    <StaggerItem>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-black border border-white/10 rounded-full flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-primary-gold" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-elegant-white mb-1">Adresse</h4>
                          <p className="text-elegant-white/60 font-light">
                            Boulevard Triomphal, Galerie Valée Sainte Marie, Box 05<br/>
                            à la Mezzanine (en face de l'hypermarché MBOLO)<br/>
                            BP: 12 201 Libreville - Gabon
                          </p>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-black border border-white/10 rounded-full flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-primary-gold" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-elegant-white mb-1">Téléphone</h4>
                          <p className="text-elegant-white/60 font-light">(+241) 66 67 22 50 / 074 41 30 71</p>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-black border border-white/10 rounded-full flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-primary-gold" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-elegant-white mb-1">Email</h4>
                          <p className="text-elegant-white/60 font-light">associationAF2G@gmail.com</p>
                        </div>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>

                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h4 className="font-serif text-lg text-elegant-white mb-4">Suivez-nous</h4>
                    <div className="flex items-center gap-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-primary-black border border-white/10 flex items-center justify-center text-elegant-white/60 hover:bg-primary-gold hover:text-primary-black hover:border-primary-gold transition-all">
                        <Share2 className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary-black border border-white/10 flex items-center justify-center text-elegant-white/60 hover:bg-primary-gold hover:text-primary-black hover:border-primary-gold transition-all">
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary-black border border-white/10 flex items-center justify-center text-elegant-white/60 hover:bg-primary-gold hover:text-primary-black hover:border-primary-gold transition-all">
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Formulaire */}
            <div className="w-full lg:w-2/3">
              <SlideUp>
                <div className="bg-luxury-gray/50 p-8 md:p-12 border border-white/5 rounded-sm">
                  <h2 className="text-2xl font-serif mb-8 text-elegant-white">Envoyez-nous un message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Nom complet</label>
                        <input required type="text" className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Email</label>
                        <input required type="email" className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Sujet</label>
                      <input required type="text" className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-elegant-white/80 uppercase tracking-wider">Message</label>
                      <textarea required rows={6} className="w-full bg-primary-black border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light resize-none"></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary-gold text-primary-black uppercase tracking-widest font-medium rounded-sm hover:bg-white transition-all duration-300 glow-gold-hover"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </button>
                  </form>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="h-96 w-full relative">
         <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
            {/* In a real scenario, this would be an iframe from Google Maps */}
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary-gold/50 mx-auto mb-4" />
              <span className="font-serif text-xl text-elegant-white/50 uppercase tracking-widest">Carte Interactive Google Maps</span>
            </div>
         </div>
         {/* Overlay gradient to blend with the footer smoothly */}
         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>
    </div>
  );
}
