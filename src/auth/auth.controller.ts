import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApplyVersionHeader } from 'src/common/decorators/apply-version-header.decorator';

@ApplyVersionHeader()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  create(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
