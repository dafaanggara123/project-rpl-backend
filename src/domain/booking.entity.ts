export class Booking {
  id: string;
  room: string;
  date: string;
  time: string;
  bookedBy: string;
  status: string; // contoh: 'Available', 'Booked'

  constructor(partial: Partial<Booking>) {
    Object.assign(this, partial);
  }
}