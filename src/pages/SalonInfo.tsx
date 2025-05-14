import React from 'react';

const SalonInfo = () => {
  return (
    <section className="p-6 md:p-12 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <h2 className="text-2xl font-semibold">Sul salone</h2>

      {/* Map and Address */}
      <div className="grid md:grid-cols-2 gap-6">
        <iframe
          title="Feiver map"
          className="w-full h-64 rounded shadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.329432773938!2d9.5910127!3d45.5251584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47813d876d90e2cf%3A0x68099e1c13fc6bd9!2sVia%20G.%20Mazzini%2C%2011%2C%2024047%20Treviglio%20BG%2C%20Italia!5e0!3m2!1sit!2sit!4v1714736800000!5m2!1sit!2sit"
          loading="lazy"
        ></iframe>

        <div>
          <h3 className="text-lg font-semibold">Feivèr</h3>
          <p className="text-sm text-gray-700">Via G. Mazzini, 11, 24047 Treviglio BG, Italia</p>

          <h4 className="mt-4 font-medium text-sm">Orari di apertura:</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li className="flex justify-between">
              <span className="text-gray-500">Lunedì</span>
              <span className="text-gray-400">Chiuso</span>
            </li>
            <li className="flex justify-between">
              <span>Martedì</span><span>09:20 – 20:40</span>
            </li>
            <li className="flex justify-between">
              <span>Mercoledì</span><span>09:20 – 20:40</span>
            </li>
            <li className="flex justify-between">
              <span>Giovedì</span><span>09:20 – 20:40</span>
            </li>
            <li className="flex justify-between">
              <span>Venerdì</span><span>09:20 – 20:40</span>
            </li>
            <li className="flex justify-between">
              <span>Sabato</span><span>09:00 – 20:00</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Domenica</span>
              <span className="text-gray-400">Chiuso</span>
            </li>
          </ul>
        </div>
      </div>

      {/* About Text */}
      <div className="space-y-4 text-sm text-gray-700">
        <p>
          Nel 2021, Feivèr apre il suo primo salone nel cuore di Treviglio, in provincia di Bergamo, precisamente in Via San Martino, una delle vie più frequentate e conosciute dai cittadini.
          È una vera e propria boutique del capello che prende forma dalla passione e dalla dedizione dei suoi titolari.
        </p>
        <p className="font-medium">Il team:</p>
        <p>
          I titolari, Anila e Alket, si trasferiscono da Milano, portando con sé oltre dieci anni di esperienza non solo nei capelli ma anche nel settore della moda. La loro nuova avventura consente loro di farsi conoscere e apprezzare dalla comunità locale.
          Dopo tre anni di attività, Alket riceve un’interessante proposta d’acquisto e, con grande coraggio, decide di accettarla.
          Questo passo lo porta ad aprire il suo primo negozio maschile in Via Giuseppe Mazzini 11, sempre nella città di Treviglio. Qui, Alket continua a portare avanti la sua passione per i tagli e barba, offrendo ai clienti un’esperienza unica e prodotti di alta qualità.
        </p>
      </div>
    </section>
  );
};

export default SalonInfo;
