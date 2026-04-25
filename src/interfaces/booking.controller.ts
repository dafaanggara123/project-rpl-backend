import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BookingService } from '../application/booking.service';

@Controller('v1/rooms')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // [READ] Untuk Tampilan Web
  @Get('web')
  async getWebData() {
    return { success: true, data: await this.bookingService.getFullBooking() };
  }

  // [READ] Untuk Tampilan Mobile
  @Get('mobile')
  async getMobileData() {
    return { success: true, data: await this.bookingService.getSimpleBooking() };
  }

  // [CREATE] Endpoint untuk Tambah Ruangan
  @Post()
  async create(@Body() body: any) {
    await this.bookingService.addBooking(body);
    return { success: true, message: 'Data berhasil ditambahkan!' };
  }

  // [UPDATE] Endpoint untuk Edit Ruangan (Berdasarkan ID)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.bookingService.updateBooking(id, body);
    return { success: true, message: 'Data berhasil diperbarui!' };
  }

  // [DELETE] Endpoint untuk Hapus Ruangan (Berdasarkan ID)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.bookingService.deleteBooking(id);
    return { success: true, message: 'Data berhasil dihapus!' };
  }

  // [SEED] Data Awal
  @Post('seed')
  async seedDatabase() {
    await this.bookingService.seedData();
    return { success: true, message: 'Data awal berhasil ditambahkan ke Database!' };
  }
}