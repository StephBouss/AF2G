"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Crown, Calendar, MapPin, Hash, User, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AF2G-";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) code += chars[Math.floor(Math.random() * chars.length)];
    if (i < 2) code += "-";
  }
  return code;
}

const PACK_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  BRONZE:          { text: "text-orange-400",  border: "border-orange-400/50",  bg: "bg-orange-400/10"  },
  "ARGENT / SILVER": { text: "text-slate-300",   border: "border-slate-300/50",   bg: "bg-slate-300/10"   },
  "OR / GOLD":     { text: "text-yellow-400",  border: "border-yellow-400/50",  bg: "bg-yellow-400/10"  },
  "PLATINE / PLATINUM": { text: "text-indigo-200", border: "border-indigo-200/50", bg: "bg-indigo-200/10" },
  "DIAMANT / DIAMOND":  { text: "text-cyan-300",  border: "border-cyan-300/50",  bg: "bg-cyan-300/10"  },
};

function Particle({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, backgroundColor: color }}
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{ opacity: 0, scale: 0, y: -120 + Math.random() * 60, x: (Math.random() - 0.5) * 80 }}
      transition={{ duration: 1.2 + Math.random() * 0.8, delay, ease: "easeOut" }}
    />
  );
}

function Confetti() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    color: ["#B8860B", "#D4AF37", "#F5F5F5", "#4ade80", "#60a5fa"][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.color} delay={p.delay} />
      ))}
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const nom     = searchParams.get("nom")     || "Partenaire";
  const pack    = searchParams.get("pack")    || "Pack Partenaire";
  const ref     = searchParams.get("ref")     || null;
  const montant = searchParams.get("montant") || "";

  const [code] = useState(() => ref || generateCode());
  const [showPopup, setShowPopup]   = useState(true);
  const [showTicket, setShowTicket] = useState(false);
  const [confetti, setConfetti]     = useState(false);

  const packStyle = PACK_COLORS[pack] ?? {
    text: "text-primary-gold",
    border: "border-primary-gold/50",
    bg: "bg-primary-gold/10",
  };

  useEffect(() => {
    setConfetti(true);
    const t1 = setTimeout(() => {
      setShowPopup(false);
      setTimeout(() => setShowTicket(true), 400);
    }, 3500);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="min-h-screen bg-[#110B02] flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-gold/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-[150px]" />
      </div>

      {/* Success popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative bg-[#1A1104] border border-primary-gold/40 rounded-lg p-10 max-w-sm w-full mx-6 text-center overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(184,134,11,0.25)" }}
            >
              {confetti && <Confetti />}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 220, damping: 15 }}
                className="w-24 h-24 rounded-full bg-green-500/15 border-2 border-green-400 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-14 h-14 text-green-400" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-serif font-bold text-elegant-white mb-3">
                  Transaction Réussie !
                </h2>
                <p className="text-elegant-white/60 text-sm mb-8 leading-relaxed">
                  Votre paiement a été confirmé avec succès.<br />Votre billet de partenariat est prêt.
                </p>
                <button
                  onClick={() => { setShowPopup(false); setTimeout(() => setShowTicket(true), 400); }}
                  className="px-8 py-3 bg-primary-gold text-primary-black font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-all duration-300 text-sm"
                >
                  Voir mon billet →
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket */}
      <AnimatePresence>
        {showTicket && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-2xl relative z-10"
          >
            <div
              className="relative bg-[#1A1104] border border-primary-gold/30 rounded-lg overflow-hidden"
              style={{ boxShadow: "0 0 80px rgba(184,134,11,0.15)" }}
            >
              {/* Top gold stripe */}
              <div className="h-1.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" />

              {/* Header */}
              <div className="px-8 py-6 flex items-center justify-between border-b border-primary-gold/15">
                <div>
                  <p className="text-primary-gold text-[10px] uppercase tracking-[0.3em] font-medium mb-1">
                    Billet de Partenariat Officiel
                  </p>
                  <h1 className="text-xl md:text-2xl font-serif font-bold text-elegant-white leading-tight">
                    1<sup>er</sup> Congrès International des Greffiers
                  </h1>
                </div>
                <Crown className="w-10 h-10 text-primary-gold/50 flex-shrink-0 ml-4" />
              </div>

              {/* Body */}
              <div className="px-8 py-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Partenaire */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-elegant-white/40 text-[10px] uppercase tracking-widest mb-1">Partenaire</p>
                      <p className="text-elegant-white font-bold text-base leading-snug">{nom}</p>
                    </div>
                  </div>

                  {/* Catégorie */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Package className="w-4 h-4 text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-elegant-white/40 text-[10px] uppercase tracking-widest mb-1">Catégorie</p>
                      <span className={`inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${packStyle.text} ${packStyle.border} ${packStyle.bg} border`}>
                        {pack}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar className="w-4 h-4 text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-elegant-white/40 text-[10px] uppercase tracking-widest mb-1">Date</p>
                      <p className="text-elegant-white font-bold text-base">08 – 10 Juin 2026</p>
                    </div>
                  </div>

                  {/* Lieu */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-elegant-white/40 text-[10px] uppercase tracking-widest mb-1">Lieu</p>
                      <p className="text-elegant-white font-bold text-base">Libreville, Gabon</p>
                    </div>
                  </div>

                </div>

                {/* Montant si disponible */}
                {montant && (
                  <div className="flex items-center gap-2 py-3 border-t border-white/5">
                    <p className="text-elegant-white/40 text-xs uppercase tracking-widest">Contribution :</p>
                    <p className="text-primary-gold font-bold">{montant} FCFA</p>
                  </div>
                )}

                {/* Code */}
                <div className="border-t border-dashed border-primary-gold/25 pt-6">
                  <div className={`${packStyle.bg} ${packStyle.border} border rounded-sm p-5 flex items-center gap-4`}>
                    <Hash className="w-6 h-6 text-primary-gold flex-shrink-0" />
                    <div>
                      <p className="text-elegant-white/40 text-[10px] uppercase tracking-[0.2em] mb-1">
                        Code de Confirmation
                      </p>
                      <p className={`font-mono font-bold text-2xl tracking-[0.15em] ${packStyle.text}`}>
                        {code}
                      </p>
                    </div>
                  </div>
                  <p className="text-elegant-white/30 text-xs mt-3 text-center">
                    Conservez ce code précieusement — il vous sera demandé lors de l&apos;accueil au congrès.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-5 bg-primary-gold/5 border-t border-primary-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-elegant-white/30 text-xs text-center sm:text-left">
                  Une copie vous sera envoyée par email à l&apos;adresse fournie.
                </p>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-6 py-2.5 border border-primary-gold/50 text-primary-gold text-xs uppercase tracking-widest hover:bg-primary-gold hover:text-primary-black transition-all duration-300 rounded-sm flex-shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Retour au site
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
