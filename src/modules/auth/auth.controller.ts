import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magic-login.strategy';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '@users/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private strategy: MagicLoginStrategy,
  ) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    return this.strategy.send(req, res);
  }

  @Get('login/callback')
  @UseGuards(AuthGuard('magiclogin'))
  async callback(@CurrentUser() user: User) {
    return this.authService.generateTokens(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('secure')
  async secure(@CurrentUser() user: User) {
    console.log('controller sec', user);

    return user;
  }
}
