"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Payment failed or was cancelled.";
  const ref     = searchParams.get("ref")     || null;

  const [showPopup, setShowPopup]   = useState(true);
  const [showPanel, setShowPanel]   = useState(false);

  useEffect(() => {
    // Mise à jour du statut en base
    if (ref) {
      fetch("/api/singpay/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref, statut: "failed" }),
      }).catch(() => {});
    }
    const t = setTimeout(() => {
      setShowPopup(false);
      setTimeout(() => setShowPanel(true), 400);
    }, 4000);
    return () => clearTimeout(t);
  }, [ref]);

  return (
    <div className="min-h-screen bg-[#110B02] flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[150px]" />
      </div>

      {/* Error popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="bg-[#1A1104] border border-red-500/40 rounded-lg p-10 max-w-sm w-full mx-6 text-center"
              style={{ boxShadow: "0 0 60px rgba(239,68,68,0.15)" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 220, damping: 15 }}
                className="w-24 h-24 rounded-full bg-red-500/15 border-2 border-red-500/60 flex items-center justify-center mx-auto mb-6"
              >
                <XCircle className="w-14 h-14 text-red-400" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-serif font-bold text-elegant-white mb-2">
                  Transaction Échouée
                </h2>
                <p className="text-red-400/80 text-xs uppercase tracking-widest font-mono mb-4">
                  — {message}
                </p>
                <p className="text-elegant-white/50 text-sm mb-8 leading-relaxed">
                  Votre paiement n&apos;a pas pu être traité. Aucun montant n&apos;a été débité.
                </p>
                <button
                  onClick={() => { setShowPopup(false); setTimeout(() => setShowPanel(true), 400); }}
                  className="px-8 py-3 border border-red-500/50 text-red-400 font-bold uppercase tracking-wider rounded-sm hover:bg-red-500/10 transition-all duration-300 text-sm"
                >
                  Voir les détails
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-lg relative z-10"
          >
            <div
              className="bg-[#1A1104] border border-red-500/25 rounded-lg overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(239,68,68,0.08)" }}
            >
              {/* Top red stripe */}
              <div className="h-1.5 bg-gradient-to-r from-red-700 to-red-500" />

              {/* Header */}
              <div className="px-8 py-7 flex items-center gap-4 border-b border-red-500/15">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-elegant-white">Paiement non abouti</h2>
                  <p className="text-elegant-white/40 text-xs mt-0.5 uppercase tracking-widest">
                    Transaction rejetée
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-8 space-y-5">

                {/* English error */}
                <div className="bg-red-500/8 border border-red-500/20 rounded-sm p-4">
                  <p className="text-red-400/60 text-[10px] uppercase tracking-widest mb-1 font-mono">
                    Error details
                  </p>
                  <p className="text-red-300/80 font-mono text-sm leading-relaxed">
                    — {message}
                  </p>
                  {ref && (
                    <p className="text-elegant-white/30 font-mono text-xs mt-2">
                      ref: {ref}
                    </p>
                  )}
                </div>

                {/* Explanations */}
                <div className="space-y-3">
                  {[
                    "Vérifiez que votre solde est suffisant.",
                    "Assurez-vous que vos informations de paiement sont correctes.",
                    "Réessayez ou choisissez un autre moyen de paiement.",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-elegant-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-gold/60 mt-2 flex-shrink-0" />
                      {tip}
                    </div>
                  ))}
                </div>

                <p className="text-elegant-white/30 text-xs text-center pt-2">
                  Besoin d&apos;aide ?{" "}
                  <a href="mailto:associationaf2g@gmail.com" className="text-primary-gold hover:underline">
                    associationaf2g@gmail.com
                  </a>
                </p>
              </div>

              {/* Footer */}
              <div className="px-8 py-5 bg-white/2 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/congres#packs"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-gold text-primary-black font-bold uppercase tracking-wider text-xs rounded-sm hover:bg-white transition-all duration-300"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Réessayer — Voir les packs
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-elegant-white/60 text-xs uppercase tracking-wider rounded-sm hover:border-white/30 hover:text-elegant-white transition-all duration-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Accueil
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
