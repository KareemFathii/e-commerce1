import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';

import { SignupCreateDto } from '../../dto/user/signup-create.dto';
import { SigninDto } from '../../dto/user/signin.dto';
import { AuthService } from '../../services/auth/auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("signup")
  signup(@Body(new ValidationPipe({forbidNonWhitelisted: true , whitelist: true})) signupCreateDto: SignupCreateDto) {
    return this.authService.Signup(signupCreateDto);
  }
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin( @Body( new ValidationPipe({forbidNonWhitelisted: true , whitelist: true})) signinDto: SigninDto)  {
    return this.authService.signin(signinDto.email, signinDto.password);
  }
 
}
