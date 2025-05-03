// src/components/NewsletterForm.tsx
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const NewsletterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const { error } = await supabase.from("newsletter").insert({
      customer_name: name.trim() || null,
      customer_email: email.trim(),
      customer_phone: phone.trim() || null,
      customer_birthdate: birthdate.trim() || null,
    });

    setLoading(false);
    if (error) {
      alert("Errore durante l'iscrizione. Riprova.");
      console.error(error);
    } else {
      alert("Iscrizione avvenuta con successo!");
      onSuccess(); // nasconde il form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 text-sm">
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded border text-black"
      />
      <input
        type="email"
        required
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded border text-black"
      />
      <input
        type="text"
        placeholder="Telefono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 rounded border text-black"
      />
      <input
        type="text"
        placeholder="Data di nascita (gg/mm/aaaa)"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="p-2 rounded border text-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        {loading ? "Invio in corso..." : "ISCRIVITI"}
      </button>
    </form>
  );
};

export default NewsletterForm;