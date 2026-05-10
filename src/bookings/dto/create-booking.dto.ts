import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'Ruang Meeting A' })
  room: string;

  @ApiProperty({ example: 'Budi Santoso' })
  bookedBy: string;

  @ApiProperty({ example: '2026-05-10' })
  date: string;

  @ApiProperty({ example: '09:00 - 10:00' })
  time: string;
}