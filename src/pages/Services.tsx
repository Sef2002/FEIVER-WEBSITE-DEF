import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Taglio e Barba con rifinitura a macchinetta",
    description: "40 min · €25 · Dettagli importanti del trattamento",
    image: "assets/feviercut.png",
  },
  {
    title: "Taglio Uomo con Shampoo",
    description: "30 min · €20 · Dettagli importanti del trattamento",
    image: "assets/feiverbarbercuttingscissor.png",
  },
  {
    title: "Modellatura Barba",
    description: "20 min · €15 · Dettagli importanti del trattamento",
    image: "assets/feiderfade.png",
  },
  {
    title: "Taglio e Barba con rifinitura a lametta",
    description: "50 min · €30 · Dettagli importanti del trattamento",
    image: "assets/fevierpremium.png",
  },
  {
    title: "Modellatura barba lunga",
    description: "30 min · €20 · Dettagli importanti del trattamento",
    image: "assets/feiverluxury.png",
  },
];

const ServicesSection = () => {
  return (
    <div
      className="relative w-full py-24 px-6 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('assets/feiversfondo.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <img
            src="assets/Feiver logo.png"
            alt="Feiver Logo"
            className="h-10 w-auto" // corrected aspect ratio
          />
        </div>

        <h2 className="text-4xl font-bold text-yellow-500 text-center mb-2">
          I NOSTRI SERVIZI
        </h2>
        <p className="text-center max-w-2xl mx-auto text-sm text-white mb-12">
          Eleganza, tradizione e tecnica. Scopri l'anima del nostro lavoro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="relative overflow-hidden group shadow-md transition-transform origin-center rounded-none"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/60 p-4 text-center">
                <h3 className="text-sm font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;