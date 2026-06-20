import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data";

export function Footer() {
  return (
    <footer className="bg-primary text-white/45">
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-10 md:px-16">
        <div className="py-12 md:py-20 grid grid-cols-1 sm:grid-cols-[1.75fr_1fr_1fr] gap-10 md:gap-12">
          
          <div>
            <div className="mb-4">
              <span className="font-serif text-[1.375rem] font-medium tracking-tight text-white/80">
                Wisor Move-In
              </span>
            </div>
            <p className="text-[0.875rem] leading-[1.75] mb-5 max-w-[340px]">
              A premium move-in concierge for freshers joining IIIT Allahabad and MNNIT Allahabad. Everything you need, delivered before day one.
            </p>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.8125rem] text-success border border-success/25 rounded-sm px-4 py-2 transition-all hover:bg-success/10 hover:border-success/50"
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <p className="text-[0.6875rem] font-medium tracking-widest uppercase text-white/20 mb-4">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#how" className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors">How it works</a></li>
              <li><a href="#included" className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors">What's included</a></li>
              <li><a href="#why" className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors">Why Wisor</a></li>
              <li><a href="#faq" className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6875rem] font-medium tracking-widest uppercase text-white/20 mb-4">Colleges</p>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#" className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors">IIIT Allahabad</a></li>
              <li><a href="#" className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors">MNNIT Allahabad</a></li>
            </ul>
            <p className="text-[0.6875rem] font-medium tracking-widest uppercase text-white/20 mb-4 mt-6">Partners</p>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#dealers" className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors">For Dealers</a></li>
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I%27m%20interested%20in%20partnering%20with%20Wisor%20to%20supply%20products%20for%20IIIT%20Allahabad%20and%20MNNIT%20Allahabad%20students.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[0.9rem] text-white/40 hover:text-white/80 transition-colors"
                >
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="py-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[0.8rem]">
          <span>&copy; {new Date().getFullYear()} Wisor. All rights reserved.</span>
          <span className="text-white/15">Made with care, for freshers.</span>
        </div>
      </div>
    </footer>
  );
}
