import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBuilder = () => {
    navigate("/setup");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-280",
          scrolled ? "bg-[#FCFAF5]/90 backdrop-blur-md border-b border-border py-4" : "py-6 bg-gradient-to-b from-black/20 to-transparent"
        )}
      >
        <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16 flex items-center justify-between gap-6">
          <a href="#" className="font-serif text-[1.375rem] font-medium tracking-tight text-primary">
            Wisor Move-In
          </a>

          <div className="hidden md:flex items-center gap-0">
            <a href="#how" className="text-[0.8125rem] tracking-wider uppercase text-secondary px-4 py-2 hover:text-primary transition-colors">How it works</a>
            <a href="#included" className="text-[0.8125rem] tracking-wider uppercase text-secondary px-4 py-2 hover:text-primary transition-colors">What's included</a>
            <a href="#faq" className="text-[0.8125rem] tracking-wider uppercase text-secondary px-4 py-2 hover:text-primary transition-colors">FAQ</a>
          </div>

          <div className="hidden sm:flex">
            <Button variant="dark" size="sm" onClick={openBuilder}>
              Build My Setup
            </Button>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-dark z-40 flex flex-col justify-end p-10 sm:p-20 transition-transform duration-300 ease-out",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col gap-2">
          <a href="#how" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl sm:text-5xl text-white/35 hover:text-white transition-colors py-2">How it works</a>
          <a href="#included" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl sm:text-5xl text-white/35 hover:text-white transition-colors py-2">What's included</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl sm:text-5xl text-white/35 hover:text-white transition-colors py-2">FAQ</a>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 w-full">
          <Button variant="primary" size="lg" className="w-full" onClick={openBuilder}>
            Build My Setup
          </Button>
        </div>
      </div>
    </>
  );
}
