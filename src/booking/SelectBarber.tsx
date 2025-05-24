import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Assicurati che questo path sia corretto

const SelectBarber: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [barbers, setBarbers] = useState<any[]>([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      const { data, error } = await supabase.from('barbers').select('*');
      if (!error && data) {
        // Mock fields if needed for display
        const enriched = data.map((barber) => ({
          id: barber.id,
          name: barber.name,
          role: 'Stylist', // You can add this in DB later
          experience: 'Esperto/a in stile', // Default placeholder
          specialties: ['Taglio', 'Colore'] // Optional default
        }));
        setBarbers(enriched);
      }
    };
    fetchBarbers();
  }, []);

  const handleContinue = () => {
    if (selectedBarber) {
      navigate('/prenota/conferma', {
        state: {
          ...location.state,
          barberId: selectedBarber
        }
      });
    }
  };

  return (
    <main className="pt-24">
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h5 className="text-gold tracking-widest uppercase mb-2">Prenota</h5>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">Scegli il Professionista</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Seleziona il professionista che si prenderà cura di te
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {barbers.map((barber) => (
                <div
                  key={barber.id}
                  className={`p-6 border ${
                    selectedBarber === barber.id
                      ? 'border-gold bg-gold bg-opacity-10'
                      : 'border-gray-800 hover:border-gold'
                  } rounded-lg cursor-pointer transition-all`}
                  onClick={() => setSelectedBarber(barber.id)}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-xl font-heading mb-2">{barber.name}</h3>
                    <p className="text-gold mb-2">{barber.role}</p>
                    <p className="text-sm text-gray-400 mb-4">{barber.experience}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {barber.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs bg-black bg-opacity-50 text-gold px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={handleContinue}
                disabled={!selectedBarber}
                className={`btn ${
                  selectedBarber ? 'btn-primary' : 'bg-gray-700 cursor-not-allowed'
                } text-lg px-8 py-3`}
              >
                Continua
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectBarber;