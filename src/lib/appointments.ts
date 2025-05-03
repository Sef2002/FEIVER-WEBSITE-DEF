import { supabase } from './supabase';

export async function getBarberAppointments(barberId: string, selectedDate: Date) {
  const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('appointment_time, duration_min')
    .eq('barber_id', barberId)
    .eq('appointment_date', formattedDate)
    .order('appointment_time');

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }

  return appointments.map(appointment => {
    // Parse time string into hours and minutes
    const [hours, minutes] = appointment.appointment_time.split(':').map(Number);
    
    // Calculate end time
    const endHours = Math.floor((minutes + appointment.duration_min) / 60) + hours;
    const endMinutes = (minutes + appointment.duration_min) % 60;
    
    return {
      start: appointment.appointment_time.substring(0, 5), // HH:mm
      end: `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
    };
  });
}