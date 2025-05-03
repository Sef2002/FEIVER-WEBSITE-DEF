import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const NewsletterBanner = () => {
  const [visible, setVisible] = useState(false);
  const [customer_name, setCustomerName] = useState("");
  const [customer_email, setCustomerEmail] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const [customer_birthdate, setCustomerBirthdate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!customer_email) return alert("Email obbligatoria.");

    setSubmitting(true);
    const birthdateFormatted = customer_birthdate
      ? customer_birthdate.split("/").reverse().join("-")
      : null;

    const { error } = await supabase.from("newsletter").insert({
      customer_name,
      customer_email,
      customer_phone,
      customer_birthdate: birthdateFormatted,
    });

    setSubmitting(false);

    if (error) {
      console.error("Errore iscrizione newsletter:", error);
      alert("Errore. Riprova più tardi.");
    } else {
      setSuccess(true);
      setTimeout(() => setVisible(false), 3000);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-yellow-500 text-black p-4 z-50 shadow-md animate-slide-up">
      <div className="relative max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium text-center md:text-left">
          Iscriviti alla nostra newsletter per ricevere aggiornamenti esclusivi!
        </div>

        {!success ? (
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Nome"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
              className="p-2 rounded border text-sm text-black w-full md:w-auto"
            />
            <input
              type="email"
              placeholder="Email *"
              value={customer_email}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="p-2 rounded border text-sm text-black w-full md:w-auto"
              required
            />
            <input
              type="text"
              placeholder="Telefono"
              value={customer_phone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="p-2 rounded border text-sm text-black w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="gg/mm/aaaa"
              maxLength={10}
              value={customer_birthdate}
              onChange={(e) => {
                let raw = e.target.value.replace(/[^\d]/g, "");
                if (raw.length > 2) raw = raw.slice(0, 2) + "/" + raw.slice(2);
                if (raw.length > 5) raw = raw.slice(0, 5) + "/" + raw.slice(5, 9);
                setCustomerBirthdate(raw);
              }}
              className="p-2 rounded border text-sm text-black w-full md:w-auto"
              pattern="\d{2}/\d{2}/\d{4}"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:brightness-110 transition"
            >
              {submitting ? "Invio..." : "ISCRIVITI ORA"}
            </button>
          </div>
        ) : (
          <div className="text-green-800 font-medium text-sm">
            ✅ Iscrizione completata!
          </div>
        )}

        {/* X close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-1 right-2 text-lg text-black hover:text-red-600 transition"
          aria-label="Chiudi"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NewsletterBanner;