import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards, Render, Res, Query } from '@nestjs/common';
import { SignupCreateDto } from '../../dto/user/auth.dto';
import { SigninDto } from '../../dto/user/auth.dto';
import { AuthService } from '../../services/users/auth/auth.service';
import { confirmedPasswordDto, ResetPasswordDto } from '../../dto/user/auth.dto';
import express from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("signup")
  
  async  signup(@Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),) signupCreateDto: SignupCreateDto,@Res() res:express.Response) {
    await  this.authService.Signup(signupCreateDto);
    return res.redirect("getSigninPage");
  }
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true })) signinDto: SigninDto) {
    return this.authService.signin(signinDto.email, signinDto.password);
  }

  // -----------------------------------------------------------------------------------------
  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) { email }: ResetPasswordDto,@Res() res:express.Response) {
    await this.authService.resetPassword(email)
    return res.redirect(`getEmailSentPage?email=${encodeURIComponent(email)}`);
  }

  @Post("verify-code")
  @HttpCode(HttpStatus.OK)
  async verifyCode(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) verifyCode: { code: string, email: string },@Res() res:express.Response) {
    await this.authService.verifyCode(verifyCode);
    return res.redirect(`getChangePasswordPage?email=${encodeURIComponent(verifyCode.email)}`);
  }

  @Post("change-password")
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) changePassword: confirmedPasswordDto,@Query("email") email:string , @Res() res:express.Response) {
    await this.authService.changePassword(changePassword,email);
    return res.redirect("success-reset");
  }
  
  @Get('getSignupPage')
  @Render('register')
  getSignupPage() {
    return {};
  }
  @Get('getSigninPage')
  @Render('login')
  getSigninPage() {
    return {};
  }
  @Get("getForgotPasswordPage")
  @Render('getForgetPassword')
  getForgotPasswordPage() {
    return {};
  }
@Get('getEmailSentPage')
@Render('emailsent')
showEmailSentPage(@Query('email') email: string) {
    return { email };
}
@Get("getChangePasswordPage")
@Render("reset-password")
getChangePasswordPage(@Query("email") email:string) {
    return { email };
}
@Get("success-reset")
@Render("success-reset")
successReset() {
    return {};
}
}
