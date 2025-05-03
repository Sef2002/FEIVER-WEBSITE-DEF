import React, { useEffect, useState } from "react";
import { Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { supabase } from "../lib/supabase";

const SelectService = () => {
  const { services, setServices } = useBooking();
  const [allServices, setAllServices] = useState([]);
  const navigate = useNavigate();
  const brown = "#3B2C20";

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html, body, #root {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (!error) {
        const formatted = data.map(service => ({
          ...service,
          duration: `${service.duration_min} min`,
          price: `€${service.price.toFixed(2)}`,
        }));
        setAllServices(formatted);
      }
    };
    fetchServices();
  }, []);

  const toggleService = (service) => {
    const isSelected = services.some((s) => s.id === service.id);
    if (isSelected) {
      setServices(services.filter((s) => s.id !== service.id));
    } else {
      setServices([...services, service]);
    }
  };

  const handleContinue = () => {
    if (services.length > 0) {
      navigate("/seleziona-barbiere");
    }
  };

  const isSelected = (service) =>
    services.some((s) => s.id === service.id);

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
              <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: brown }} />
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
      <div className="flex flex-1 px-10 pb-4 gap-6 items-start">
        {/* Left: Services */}
        <div className="w-1/2 flex flex-col gap-[8px]">
          {allServices.map((service, index) => (
            <div
              key={index}
              onClick={() => toggleService(service)}
              className={`bg-white rounded-xl px-4 py-3 shadow-sm transition-all border cursor-pointer flex items-center gap-4
                ${isSelected(service) ? "border-yellow-500" : "border-neutral-200 hover:shadow-md"}`}
              style={{ height: "100px" }}
            >
              <div className="w-16 h-16 bg-neutral-200 rounded-md flex items-center justify-center text-xs text-neutral-400">
                IMG
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <h3 className="text-sm font-semibold text-[#2D1B13] leading-tight">
                  {service.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-col items-end justify-center h-full">
                <div className="bg-[#3B2C20] text-white text-[10px] px-3 py-[2px] rounded-md shadow">
                  {service.price}
                </div>
                <div className="flex items-center text-[10px] text-neutral-500 mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Appointment Summary */}
        <div className="w-1/2 flex flex-col items-center">
          <div
            className="w-full rounded-xl px-6 py-4 bg-neutral-200 text-sm transition-all"
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
                    <button
                      onClick={() =>
                        setServices((prev) =>
                          prev.filter((s) => s.id !== service.id)
                        )
                      }
                      className="text-neutral-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            disabled={services.length === 0}
            onClick={handleContinue}
            className={`mt-4 w-full py-3 rounded-md text-white text-sm font-semibold transition ${
              services.length === 0
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

export default SelectService;
