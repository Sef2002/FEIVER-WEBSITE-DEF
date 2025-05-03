import { supabase } from './supabase';

export async function getAvailableTimeSlots(barberId: string, date: Date): Promise<string[]> {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const isoDate = date.toLocaleDateString('sv-SE'); // ✅ FIXED: Local time format

  // Fetch base availability
  const { data: baseAvailability, error: baseError } = await supabase
    .from('barbers_availabilities')
    .select('*')
    .eq('barber_id', barberId)
    .eq('weekday', dayName);

  if (baseError) {
    console.error('Error fetching availability:', baseError.message);
    return [];
  }

  // Fetch holidays
  const { data: holidays } = await supabase
    .from('barbers_holidays')
    .select('date')
    .eq('barber_id', barberId)
    .eq('date', isoDate);

  if (holidays && holidays.length > 0) return [];

  // Fetch exceptions
  const { data: exceptions } = await supabase
    .from('barbers_exceptions')
    .select('*')
    .eq('barber_id', barberId)
    .eq('date', isoDate);

  const availability = exceptions?.length ? exceptions : baseAvailability;

  // 🟡 Fetch existing appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('appointment_time, duration_min')
    .eq('barber_id', barberId)
    .eq('appointment_date', isoDate);

  const bookedTimes = new Set<string>();

  if (appointments) {
    for (const appointment of appointments) {
      const [hour, minute] = appointment.appointment_time.split(':').map(Number);
      const start = new Date(date);
      start.setHours(hour, minute, 0, 0);

      const end = new Date(start.getTime() + appointment.duration_min * 60000);
      let current = new Date(start);

      while (current < end) {
        bookedTimes.add(current.toTimeString().slice(0, 5));
        current.setMinutes(current.getMinutes() + 30);
      }
    }
  }

  // ✅ Build final slot list excluding booked ones
  const slots: string[] = [];

  for (const block of availability || []) {
    const [startHour, startMin] = block.start_time.split(':').map(Number);
    const [endHour, endMin] = block.end_time.split(':').map(Number);

    let current = new Date(date);
    current.setHours(startHour, startMin, 0, 0);

    const end = new Date(date);
    end.setHours(endHour, endMin, 0, 0);

    while (current < end) {
      const time = current.toTimeString().slice(0, 5);
      if (!bookedTimes.has(time)) {
        slots.push(time);
      }
      current.setMinutes(current.getMinutes() + 30);
    }
  }

  return slots;
}