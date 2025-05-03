import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f6f0e6] px-4 pt-0 pb-10">
      <div className="max-w-6xl mx-auto mt-0 px-6 py-10 border border-[#2D1B13] bg-[#f6f0e6] shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          {/* Orari di Apertura */}
          <div>
            <h4 className="font-semibold mb-2 text-[#2D1B13]">Orari di Apertura</h4>
            <p className="text-[#2D1B13]">Martedì – Venerdì: 09:30 – 20:30</p>
            <p className="text-[#2D1B13]">Sabato: 09:00 – 20:00</p>
            <p className="text-[#2D1B13]">Domenica e Lunedì: Chiuso</p>
          </div>

          {/* Logo and Brand Name */}
          <div>
            <img src="/assets/Feiver logo.png" alt="Feiver Logo" className="w-14 h-auto mb-2 mx-auto" />
            <p className="font-serif text-xl text-[#2D1B13]">Feivèr</p>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-semibold mb-2 text-[#2D1B13]">Contatti</h4>
            <p className="text-[#2D1B13]">📍 Via G. Mazzini 11, Treviglio (BG)</p>
            <p>
              📞{" "}
              <a href="tel:+393427575655" className="text-blue-600 hover:underline">
                +39 342 757 5655
              </a>
            </p>
            <p>
              ✉️{" "}
              <a href="mailto:info@feiverbarber.it" className="text-blue-600 hover:underline">
                info@feiverbarber.it
              </a>
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full transition">
            Prenota Ora
          </button>
        </div>

        {/* Social Icons */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Seguici sui social</p>
          <div className="flex justify-center gap-4 mt-2">
            <img src="assets/instagramicon.png" alt="Instagram" className="w-5 h-5" />
            <img src="assets/facebookiconn copy copy.png" alt="Facebook" className="w-5 h-5" />
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-gray-400">© Feivèr 2025</p>
      </div>
    </footer>
  );
};

export default Footer;