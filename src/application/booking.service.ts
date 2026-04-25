import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../infrastructure/booking.repository';

@Injectable()
export class BookingService {
  constructor(private readonly repository: BookingRepository) {}

  // 1. SEED DATA (Data Awal)
  async seedData() {
    return await this.repository.createDataAwal();
  }

  // 2. READ (Data Lengkap untuk Web)
  async getFullBooking() {
    const data = await this.repository.findAll();
    return data.map(booking => ({
      id: booking.id, // WAJIB: Tambahkan ID agar Frontend bisa Edit/Hapus
      room: booking.room,
      date: booking.date,
      time: booking.time,
      bookedBy: booking.bookedBy,
      status: booking.status
    }));
  }

  // 3. READ (Data Ringkas untuk Mobile)
  async getSimpleBooking() {
    const data = await this.repository.findAll();
    return data.map(booking => ({
      room: booking.room,
      time: booking.time.split(' - ')[0], 
      status: booking.status
    }));
  }

  // 4. CREATE
  async addBooking(data: any) {
    return await this.repository.create(data);
  }

  // 5. UPDATE
  async updateBooking(id: string, data: any) {
    return await this.repository.update(id, data);
  }

  // 6. DELETE
  async deleteBooking(id: string) {
    return await this.repository.delete(id);
  }
}