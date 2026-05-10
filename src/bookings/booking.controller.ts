import { 
  Body, 
  Controller, 
  Get, 
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('bookings')
@Controller('v1/bookings')
export class BookingsController {
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Mengambil semua data booking' })
  findAll() {
    return [];
  }

  @Post()
  @ApiOperation({ summary: 'Membuat booking ruangan baru' })
  create(@Body() dto: CreateBookingDto) {
    return dto;
  }
  @Post('upload')
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueName =
          Date.now() + '-' + Math.round(Math.random() * 1e9);

        const fileExt = extname(file.originalname);

        callback(null, `${uniqueName}${fileExt}`);
      },
    }),
  }),
)
uploadRoomImage(@UploadedFile() file: Express.Multer.File) {
  return {
    success: true,
    message: 'Upload gambar berhasil',
    data: {
      filename: file.filename,
      imageUrl: `http://localhost:3000/uploads/${file.filename}`,
    },
  };
}
}