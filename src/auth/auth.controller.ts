import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';


@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post('register')
register(@Body() body: any) {
  console.log('BODY REGISTER:', body);
  return this.authService.register(body);
}

 @Post('login')
login(@Body() body: any) {
  console.log('BODY LOGIN:', body);
  return this.authService.login(body);
}
}