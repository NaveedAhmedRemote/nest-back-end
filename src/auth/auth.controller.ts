import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CONSTANTS } from 'src/Constants';
import { CurrentUser } from 'src/decorator/user.decorator';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { RoleGuard } from 'src/role.guard';
import { AuthService } from './auth.service';
import { OWNER_OF } from './user/enums/user-owner.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body()
    register: {
      username: string;
      password: string;
      email: string;
      role: string;
      ownerOf: OWNER_OF.DEFAULT;
    },
  ) {
    return this.authService.create({ ...register });
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): any {
    // Authenticated User
    console.log('here is User', req.user);
    const accessToken = this.authService.generateToken({ ...req.user });
    return { token: accessToken, user: req.user };
  }

  @Get('/users')
  @UseGuards(
    AuthGuard('jwt'),
    AuthMiddleware,
    new RoleGuard(CONSTANTS.ROLE.Admin),
  )
  getProfile(@CurrentUser() user): string {
    return user;
  }
}
