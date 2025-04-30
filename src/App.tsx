import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServicesSection from "./pages/Services";
import Gallery from "./pages/Gallery";
import Footer from "./pages/Footer";
import SelectService from "./booking/SelectService";
import SelectBarber from "./booking/SelectBarber";
import ConfirmBooking from "./booking/ConfirmBooking";
import BookingSuccess from "./booking/BookingSuccess";
import { BookingProvider } from "./context/BookingContext";

const App = () => {
  return (
    <BookingProvider>
      <div className="font-sans">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <ServicesSection />
                  <Gallery />
                  <Footer />
                </>
              }
            />
            <Route path="/prenota" element={<SelectService />} />
            <Route path="/seleziona-barbiere" element={<SelectBarber />} />
            <Route path="/conferma" element={<ConfirmBooking />} />
            <Route path="/conferma-successo" element={<BookingSuccess />} />
          </Routes>
        </Router>
      </div>
    </BookingProvider>
  );
};

export default App;