import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class BookingRepository {
  constructor(private prisma: PrismaService) {}

  // [READ] Mengambil semua data dari MySQL
  async findAll() {
    return this.prisma.booking.findMany();
  }

  // [CREATE] Menambahkan data baru secara dinamis
  async create(data: { room: string; date: string; time: string; bookedBy: string; status: string }) {
    return this.prisma.booking.create({
      data: data,
    });
  }

  // [UPDATE] Mengubah data berdasarkan ID
  async update(id: string, data: Partial<{ room: string; date: string; time: string; bookedBy: string; status: string }>) {
    return this.prisma.booking.update({
      where: { id: id },
      data: data,
    });
  }

  // [DELETE] Menghapus data berdasarkan ID
  async delete(id: string) {
    return this.prisma.booking.delete({
      where: { id: id },
    });
  }

  // Fungsi Seed (Tetap dipertahankan untuk data awal)
  async createDataAwal() {
    return this.prisma.booking.create({
      data: {
        room: 'Lab 1',
        date: '2026-05-10',
        time: '08:00 - 10:00',
        bookedBy: 'Dosen A',
        status: 'Booked'
      }
    });
  }
}