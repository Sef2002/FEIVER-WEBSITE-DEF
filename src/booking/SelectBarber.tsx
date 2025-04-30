// src/booking/SelectBarber.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useBooking, Barber } from "../context/BookingContext";

// ✅ Replace these UUIDs with real ones from Supabase
const barbers: Barber[] = [
  { id: "421add1b-66d3-477d-8244-af3f4fe21f39", name: "Alket" },
  { id: "dafdd2d8-a439-45d6-addb-7fb50ff24c5c", name: "Gino" },
  { id: "d84c3f47-9305-4909-a21f-ee599b830d51", name: "Qualsiasi Staff" },
];

const SelectBarber = () => {
  const { services, selectedBarber, setSelectedBarber } = useBooking();
  const navigate = useNavigate();
  const brown = "#3B2C20";

  const handleContinue = () => {
    if (selectedBarber) {
      navigate("/conferma");
    }
  };

  return (
    <div className="h-screen w-full bg-[#f6f0e6] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-12 py-4">
        <div className="flex items-center space-x-4">
          <img src="/assets/Feiver logo.png" alt="Logo" className="w-20 h-20 object-contain" />
          <div className="text-left leading-tight">
            <div className="flex items-center">
              <span className="text-lg font-bold">BARBIERE</span>
              <div className="h-8 w-1 mx-2 bg-yellow-500" />
            </div>
            <p className="text-xs mt-1">UOMO & DONNA</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: brown }} />
              <span className="text-xs mt-1" style={{ color: brown }}>Servizio</span>
            </div>
            <div className="w-12 h-0.5 bg-neutral-400" />
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: brown }} />
              <span className="text-xs mt-1" style={{ color: brown }}>Staff</span>
            </div>
            <div className="w-12 h-0.5 bg-neutral-400" />
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: brown }} />
              <span className="text-xs mt-1" style={{ color: brown }}>Conferma</span>
            </div>
          </div>
        </div>

        <div className="w-20 h-20" />
      </div>

      {/* Body */}
      <div className="flex flex-1 justify-center items-start gap-10 px-10 pb-10">
        {/* Left: Barber Selection */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {barbers.slice(0, 2).map((barber) => (
              <div
                key={barber.id}
                onClick={() => setSelectedBarber(barber)}
                className={`w-40 h-40 rounded-xl bg-white shadow-md flex flex-col justify-center items-center cursor-pointer border transition ${
                  selectedBarber?.id === barber.id ? "border-yellow-500" : "border-neutral-200 hover:shadow-lg"
                }`}
              >
                <div className="w-16 h-16 bg-neutral-200 rounded-md flex items-center justify-center text-xs text-neutral-400 mb-2">
                  IMG
                </div>
                <span className="text-sm font-medium text-[#2D1B13]">{barber.name}</span>
              </div>
            ))}
          </div>

          <div
            onClick={() => setSelectedBarber(barbers[2])}
            className={`w-full h-12 rounded-xl bg-white shadow-md flex items-center justify-center cursor-pointer border transition ${
              selectedBarber?.id === barbers[2].id ? "border-yellow-500" : "border-neutral-200 hover:shadow-lg"
            }`}
          >
            <span className="text-sm font-medium text-[#2D1B13]">Qualsiasi staff</span>
          </div>
        </div>

        {/* Right: Appointment Summary */}
        <div className="flex flex-col items-center">
          <div
            className="w-80 rounded-xl px-6 py-4 bg-neutral-200 text-sm transition-all"
            style={{
              minHeight: services.length === 0 ? "120px" : "auto",
            }}
          >
            <p className="font-semibold mb-3">Riepilogo appuntamento</p>
            {services.length === 0 ? (
              <div className="text-neutral-500 text-sm text-center py-6">
                Nessun servizio aggiunto
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white px-4 py-2 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#2D1B13]">{service.name}</p>
                      <p className="text-xs text-neutral-500">
                        {service.price} · {service.duration}
                      </p>
                    </div>
                    <Trash2 className="w-4 h-4 text-neutral-300" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            disabled={!selectedBarber}
            onClick={handleContinue}
            className={`mt-4 w-80 py-3 rounded-md text-white text-sm font-semibold transition ${
              !selectedBarber
                ? "bg-[#3B2C20]/40 cursor-not-allowed"
                : "bg-[#3B2C20] hover:bg-[#2A1F18]"
            }`}
          >
            CONTINUA
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBarber;