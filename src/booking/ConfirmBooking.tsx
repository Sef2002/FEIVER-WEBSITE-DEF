import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { DayPicker } from "react-day-picker";
import { supabase } from "../lib/supabase";
import "react-day-picker/dist/style.css";

const timeslots = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

const correctEmail = (email: string): string => {
  const corrections: { [key: string]: string } = {
    "gmial.com": "gmail.com",
    "gnail.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "yaho.com": "yahoo.com",
  };
  for (const typo in corrections) {
    if (email.includes(typo)) {
      return email.replace(typo, corrections[typo]);
    }
  }
  return email;
};

const ConfirmBooking = () => {
  const { services, selectedBarber } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const navigate = useNavigate();
  const brown = "#3B2C20";

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormComplete =
    selectedDate &&
    selectedTime &&
    fullName.trim() !== "" &&
    validatePhone(phone) &&
    validateEmail(correctEmail(email)) &&
    selectedBarber;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const corrected = correctEmail(e.target.value);
    setEmail(corrected);
  };

  const handleSubmit = async () => {
    if (!isFormComplete || !selectedDate || !services.length || !selectedBarber) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("appointments")
        .insert({
          service_id: services[0].id,
          barber_id: selectedBarber.id,
          appointment_date: selectedDate.toISOString().split('T')[0],
          appointment_time: selectedTime,
          duration_min: parseInt(services[0].duration.split(" ")[0], 10),
          customer_name: fullName.trim(),
          customer_email: correctEmail(email.trim()),
          customer_phone: phone.trim()
          // birthdate will go to rubrica in future
        });

      if (error) {
        throw error;
      }

      navigate("/conferma-successo");
    } catch (error) {
      alert("Errore durante la prenotazione. Riprova più tardi.");
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f0e6] flex flex-col">
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
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            {["Servizio", "Staff", "Conferma"].map((step, index) => (
              <div key={step} className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-full ${index < 2 ? "w-5 h-5" : "w-3 h-3 border-2"}`}
                    style={{ backgroundColor: index < 2 ? brown : "transparent", borderColor: brown }}
                  />
                  <span className="text-xs mt-1" style={{ color: brown }}>{step}</span>
                </div>
                {index < 2 && <div className="w-12 h-0.5 bg-neutral-400" />}
              </div>
            ))}
          </div>
        </div>
        <div className="w-20 h-20" />
      </div>

      <div className="flex flex-1 px-10 pb-10 gap-10 items-start">
        <div className="w-2/3 flex flex-col gap-8">
          <div>
            <label className="block text-sm font-medium text-[#2D1B13] mb-2">Seleziona la data</label>
            <div className="rounded-md border border-neutral-300 shadow-sm bg-white p-3 w-fit">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                fromDate={new Date()}
                weekStartsOn={1}
                modifiersClassNames={{
                  selected: "bg-[#3B2C20] text-white",
                  today: "text-yellow-700 font-bold",
                }}
                classNames={{
                  caption: "text-sm font-semibold text-[#2D1B13]",
                  head_cell: "text-xs font-medium text-neutral-500",
                  cell: "w-10 h-10 text-sm hover:bg-neutral-100 rounded",
                  nav_button: "text-neutral-500 hover:text-black",
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D1B13] mb-2">Seleziona l'orario</label>
            <div className="grid grid-cols-4 gap-4">
              {timeslots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-md border text-sm transition ${
                    selectedTime === time
                      ? "bg-[#3B2C20] text-white border-yellow-500"
                      : "bg-white text-[#2D1B13] border-neutral-300 hover:shadow"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col items-center">
          <div className="w-full bg-neutral-200 px-6 py-4 rounded-xl">
            <p className="font-semibold mb-3">Riepilogo appuntamento</p>
            {services.map((service, index) => (
              <div key={index} className="bg-white px-4 py-2 mb-2 rounded-md">
                <p className="text-sm font-medium text-[#2D1B13]">{service.name}</p>
                <p className="text-xs text-neutral-500">{service.price} · {service.duration}</p>
              </div>
            ))}
            <p className="mt-2 text-sm">
              <span className="font-medium text-[#2D1B13]">Barbiere:</span> {selectedBarber?.name || "Non selezionato"}
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#2D1B13]">Data:</span> {selectedDate?.toLocaleDateString("it-IT") || "—"}
            </p>
            <p className="text-sm mb-4">
              <span className="font-medium text-[#2D1B13]">Orario:</span> {selectedTime || "—"}
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome e Cognome *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border text-sm border-neutral-300 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Numero di telefono *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-md border text-sm border-neutral-300 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 rounded-md border text-sm border-neutral-300 focus:outline-none"
              />
              <input
                type="text"
                placeholder="gg/mm/aaaa"
                value={birthdate}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d/]/g, "");
                  if (raw.length <= 10) setBirthdate(raw);
                }}
                pattern="\d{2}/\d{2}/\d{4}"
                className="w-full px-3 py-2 border rounded-md text-sm border-neutral-300 focus:outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>

          <button
            disabled={!isFormComplete || isSubmitting}
            onClick={handleSubmit}
            className={`mt-4 w-full py-3 rounded-md text-white text-sm font-semibold transition ${
              !isFormComplete || isSubmitting
                ? "bg-[#3B2C20]/40 cursor-not-allowed"
                : "bg-[#3B2C20] hover:bg-[#2A1F18]"
            }`}
          >
            {isSubmitting ? "PRENOTAZIONE IN CORSO..." : "CONFERMA PRENOTAZIONE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;