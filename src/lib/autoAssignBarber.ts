import { supabase } from './supabase';
import { format } from 'date-fns';

const BARBERS = {
  ALKET: '421add1b-66d3-477d-8244-af3f4fe21f39',
  GINO: 'dafdd2d8-a439-45d6-addb-7fb50ff24c5c',
};

export async function getLeastBookedBarber() {
  const today = format(new Date(), 'yyyy-MM-dd');

  const { data, error } = await supabase
    .from('appointments')
    .select('barber_id')
    .eq('appointment_date', today);

  if (error || !data) {
    console.error('Error fetching appointments:', error);
    return BARBERS.ALKET; // Fallback
  }

  const counts = {
    [BARBERS.ALKET]: 0,
    [BARBERS.GINO]: 0,
  };

  data.forEach(({ barber_id }) => {
    if (counts[barber_id] !== undefined) counts[barber_id]++;
  });

  return counts[BARBERS.ALKET] <= counts[BARBERS.GINO]
    ? BARBERS.ALKET
    : BARBERS.GINO;
}