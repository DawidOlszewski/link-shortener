import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './types/jwt-payload.type';
import getenv from 'getenv';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: getenv('AUTHORIZATION_SECRET'), //getenv('PASSPORT_SECRET', 'FIXME: deleteme'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ email }: JwtPayload) {
    console.log('jwt strat', email);

    return this.authService.validate(email);
  }
}
