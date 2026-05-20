"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Bureau", href: "/bureau" },
  { name: "Actions", href: "/actions" },
  { name: "Galerie", href: "/galerie" },
  { name: "Partenariats", href: "/partenariats" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-primary-black/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo.png" 
              alt="Logo AF2G" 
              width={50} 
              height={50} 
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm uppercase tracking-widest font-medium transition-colors hover:text-primary-gold",
                  pathname === link.href ? "text-primary-gold" : "text-elegant-white/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/adhesion"
              className="ml-4 px-6 py-2.5 border border-primary-gold text-primary-gold uppercase tracking-wider text-sm font-medium hover:bg-primary-gold hover:text-primary-black transition-all duration-300 glow-gold-hover rounded-sm"
            >
              Adhérer
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-elegant-white hover:text-primary-gold transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary-black/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 md:right-12 text-elegant-white hover:text-primary-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl uppercase tracking-widest font-serif transition-colors hover:text-primary-gold",
                      pathname === link.href ? "text-primary-gold" : "text-elegant-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  href="/adhesion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-8 py-4 bg-primary-gold text-primary-black uppercase tracking-wider text-lg font-medium hover:bg-white transition-all duration-300 rounded-sm"
                >
                  Adhérer à l'AF2G
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
