import { Module } from '@nestjs/common';
import { BookingController } from './interfaces/booking.controller';
import { BookingService } from './application/booking.service';
import { BookingRepository } from './infrastructure/booking.repository';
import { PrismaService } from './infrastructure/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule} from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, PrismaService],
})
export class AppModule {}