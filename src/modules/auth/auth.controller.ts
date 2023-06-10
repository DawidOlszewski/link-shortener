import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magic-login.strategy';
import { Request, Response } from 'express';
import { CurrentUser } from '@users/decorators/current-user.decorator';
import { User } from '@users/user.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LogicDto } from './dtos/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private strategy: MagicLoginStrategy,
  ) {}

  @Post('login')
  @ApiBody({ type: LogicDto })
  async login(@Req() req: Request, @Res() res: Response) {
    return this.strategy.send(req, res);
  }

  @Get('login/callback')
  @ApiQuery({ name: 'token' })
  @UseGuards(AuthGuard('magiclogin'))
  async callback(@CurrentUser() user: User) {
    return this.authService.generateTokens(user);
  }
}
