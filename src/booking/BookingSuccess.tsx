import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f0e6] text-center px-4">
      <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-[#2D1B13] mb-2">
        L'appuntamento è confermato
      </h1>
      <p className="text-neutral-600 max-w-sm mb-6">
        Ti abbiamo inviato una mail con i dettagli della prenotazione. Grazie per aver scelto Feivèr.
      </p>

      <Link to="/">
        <button className="bg-[#3B2C20] hover:bg-[#2A1F18] text-white px-6 py-3 rounded-md font-semibold transition">
          Torna alla Home
        </button>
      </Link>
    </div>
  );
};

export default BookingSuccess;