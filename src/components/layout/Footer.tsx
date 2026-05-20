"use client";

import Link from "next/link";
import Image from "next/image";
import { Share2, MessageCircle, Globe, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="Logo AF2G" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </Link>
            <p className="text-elegant-white/60 leading-relaxed font-light">
              Amour • Solidarité • Pouvoir. <br />
              L'Association des Femmes Greffières du Gabon, œuvrant pour l'excellence et le leadership féminin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-elegant-white mb-6 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {["Accueil", "À propos", "Bureau", "Nos Actions", "Galerie"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === "Accueil" ? "" : item.toLowerCase().replace(" ", "-")}`}
                    className="text-elegant-white/60 hover:text-primary-gold transition-colors font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-elegant-white mb-6 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-elegant-white/60">
                <MapPin className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
                <span className="font-light">
                  Boulevard Triomphal, Galerie Valée Sainte Marie, Box 05<br />
                  à la Mezzanine (en face de l'hypermarché MBOLO)<br />
                  BP: 12 201 Libreville - Gabon
                </span>
              </li>
              <li className="flex items-center gap-3 text-elegant-white/60">
                <Phone className="w-5 h-5 text-primary-gold shrink-0" />
                <span className="font-light">(+241) 66 67 22 50 / 074 41 30 71</span>
              </li>
              <li className="flex items-center gap-3 text-elegant-white/60">
                <Mail className="w-5 h-5 text-primary-gold shrink-0" />
                <span className="font-light">associationAF2G@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-elegant-white mb-6 uppercase tracking-widest">Newsletter</h4>
            <p className="text-elegant-white/60 font-light mb-4">
              Restez informée de nos dernières actions et actualités.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre adresse email"
                className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-elegant-white focus:outline-none focus:border-primary-gold transition-colors font-light"
              />
              <button className="bg-primary-gold text-primary-black font-medium py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-white transition-colors">
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-elegant-white/40 text-sm font-light text-center md:text-left">
            © {new Date().getFullYear()} Association des Femmes Greffières du Gabon. Tous droits réservés.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-elegant-white/60 hover:bg-primary-gold hover:text-primary-black transition-all">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-elegant-white/60 hover:bg-primary-gold hover:text-primary-black transition-all">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-elegant-white/60 hover:bg-primary-gold hover:text-primary-black transition-all">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
