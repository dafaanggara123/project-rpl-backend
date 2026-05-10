import { 
    Controller, 
    Get,
    Post,
    UseGuards, 
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';

@ApiTags('rooms')
@Controller('v1/rooms')
export class RoomsController {
  @Get()
  findAll(){
    return[];
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createRoom(){
    return {
        message: 'Ruangan berhasil ditambahkan',
    };
  }
}