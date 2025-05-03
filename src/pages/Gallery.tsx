import React from "react";
import { motion } from "framer-motion";

const images = [
  { src: "assets/gallery1.png", className: "col-start-1 row-span-2" }, // Left tall
  { src: "assets/gallery2.png", className: "col-start-2 col-span-2 row-start-1" }, // Top wide
  { src: "assets/gallery3.png", className: "col-start-2 row-start-2" }, // Bottom left small
  { src: "assets/gallery5.png", className: "col-start-3 row-start-2 row-span-2" }, // Perfume - 3/4 height
  { src: "assets/gallery4.png", className: "col-start-4 row-span-3" }, // Right full height
];

const animationVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    scale: 0.8,
    x: [0, -50, 50, 0][i % 4],
    y: [0, 50, -50, 0][i % 4],
  }),
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      delay: i * 0.15, // ← this is the missing piece Bolt misunderstood
    },
  }),
};

const Gallery = () => {
  return (
    <section className="bg-[#f6f0e6] py-20 px-4">
      <div className="w-full max-w-[1400px] mx-auto">
        <h2 className="text-4xl font-serif font-bold text-[#2D1B13] mb-12 text-center">
          Galleria d'Arte del Barbiere
        </h2>

        <div className="grid grid-cols-[1fr_1fr_1fr_1.1fr] grid-rows-[240px_130px_180px] gap-[3px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden ${img.className}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants}
            >
              <img
                src={img.src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;