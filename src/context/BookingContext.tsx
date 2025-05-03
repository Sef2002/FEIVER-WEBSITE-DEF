import React, { createContext, useContext, useState } from "react";

// Updated Barber type with UUID
export type Barber = {
  id: string;     // Supabase UUID
  name: string;   // Display name (e.g., "Andrea")
};

export type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
};

export type BookingContextType = {
  services: Service[];
  setServices: (services: Service[]) => void;
  selectedBarber: Barber | null;
  setSelectedBarber: (barber: Barber | null) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  return (
    <BookingContext.Provider value={{ services, setServices, selectedBarber, setSelectedBarber }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
