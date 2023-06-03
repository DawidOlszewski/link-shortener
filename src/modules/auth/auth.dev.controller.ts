import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DevGuard } from 'src/modules/auth/guards/test.guard';

@Controller()
@UseGuards(DevGuard)
export class AuthDevController {
  constructor(private authService: AuthService) {}

  @Get('test-token')
  async generateTestToken() {
    return this.authService.generateTestToken();
  }
}
