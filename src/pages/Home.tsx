// src/pages/Home.tsx
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaTools,
  FaHandshake,
  FaBullseye,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import NewsletterBanner from "../components/NewsletterBanner";

const Home = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-between overflow-hidden text-[#2D1B13]">
      {/* Background Image Layer with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('assets/feiversfondo2.png')" }}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full backdrop-blur-sm">
        {/* Top Navigation */}
        <div className="flex justify-between items-center px-12 py-6">
          {/* Logo with Image */}
          <div className="flex items-center space-x-4">
            <img
              src="assets/Feiver logo.png"
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
            <div className="text-left leading-tight">
              <div className="flex items-center">
                <span className="text-lg font-bold">BARBIERE</span>
                <div className="h-8 w-1 mx-2 bg-yellow-500"></div>
              </div>
              <p className="text-xs mt-1">UOMO & DONNA</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex space-x-8 items-center uppercase text-sm font-semibold">
            <a href="#" className="text-[#2D1B13] hover:text-yellow-500 transition">
              Home
            </a>
            <a href="#" className="text-[#2D1B13] hover:text-yellow-500 transition">
              Chi siam
            </a>
            <a href="#" className="text-[#2D1B13] hover:text-yellow-500 transition">
              Servizi
            </a>
            <a href="#" className="text-[#2D1B13] hover:text-yellow-500 transition">
              Barbieri
            </a>
            <div className="flex items-center space-x-3">
              <a href="#" className="text-[#2D1B13] hover:text-yellow-500 transition">
                Contatti
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-[#2D1B13] hover:text-yellow-500 transition duration-200" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-[#2D1B13] hover:text-yellow-500 transition duration-200" />
              </a>
              <a href="mailto:info@feiver.it" aria-label="Email">
                <FaEnvelope className="text-[#2D1B13] hover:text-yellow-500 transition duration-200" />
              </a>
            </div>

            {/* LINK TO BOOKING FLOW */}
            <Link to="/prenota">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:brightness-110 transition">
                PRENOTA ORA
              </button>
            </Link>
          </div>
        </div>

        {/* Center Text */}
        <div className="flex flex-col items-center text-center px-4">
          <h1 className="text-4xl font-extrabold leading-tight drop-shadow-md font-sans mt-2">
            ECCELLENZA NELL’ARTE DEL TAGLIO
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-sm text-center px-4 drop-shadow-sm font-sans">
            Eleganza, precisione e tradizione per ogni cliente.
          </p>

          {/* Philosophy Pillars */}
          <div className="flex mt-10 space-x-10 text-sm font-semibold">
            <div className="flex flex-col items-center border border-[#2D1B13] w-48 h-32 justify-center px-4 py-4 rounded text-center transition-transform duration-200 hover:scale-105 hover:border-yellow-500">
              <FaTools className="mb-2 w-6 h-6 text-[#2D1B13] hover:text-yellow-500 transition duration-200" />
              <p className="font-bold">ARTIGIANALITÀ</p>
              <p className="text-xs font-normal mt-1">
                Ogni gesto nasce dalla tradizione.
              </p>
            </div>
            <div className="flex flex-col items-center border border-[#2D1B13] w-48 h-32 justify-center px-4 py-4 rounded text-center transition-transform duration-200 hover:scale-105 hover:border-yellow-500">
              <FaHandshake className="mb-2 w-6 h-6 text-[#2D1B13] hover:text-yellow-500 transition duration-200" />
              <p className="font-bold">FIDUCIA</p>
              <p className="text-xs font-normal mt-1">
                Un ambiente curato e familiare.
              </p>
            </div>
            <div className="flex flex-col items-center border border-[#2D1B13] w-48 h-32 justify-center px-4 py-4 rounded text-center transition-transform duration-200 hover:scale-105 hover:border-yellow-500">
              <FaBullseye className="mb-2 w-6 h-6 text-[#2D1B13] hover:text-yellow-500 transition duration-200" />
              <p className="font-bold">PRECISIONE</p>
              <p className="text-xs font-normal mt-1">
                Ogni taglio è un’opera mirata.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded font-bold text-sm hover:brightness-110 transition">
            SCOPRI DI PIÙ ▶
          </button>
        </div>

        <div className="h-16"></div>
      </div>

      <NewsletterBanner />
    </div>
  );
};

export default Home;