import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupCreateDto } from '../../../dto/user/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';
import { resetPasswordHtml } from '../../../templates/resetPasswordHtmlMail';
import { Render } from '@nestjs/common';


import { confirmedPasswordDto } from '../../../dto/user/auth.dto';



@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
  private usersRepository: Repository<User>, private jwtService: JwtService,
    private mailerService: MailerService) { }

  async Signup(signupUserDto: SignupCreateDto): Promise<{ message: string, status: number, data: {} }> {

    const existUser = await this.usersRepository.findOne({ where: { email: signupUserDto.email } });
    if (existUser !== null) {
      throw new ConflictException('User already exists');
    }
    const { password, ...rest } = signupUserDto;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = this.usersRepository.create({ ...rest, password: hashedPassword },);
    await this.usersRepository.save(user);
    return {
      message: "User signed up successfully", status: HttpStatus.CREATED, data: { id: user.id, email: user.email }
    }
  }
  async signin(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isMatchedPassword = await bcrypt.compareSync(password, user.password);
    if (!isMatchedPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: user.email, id: user.id, role: user.role, name: user.name };
    const token = await this.jwtService.signAsync(payload);
    user.token = token;
    await this.usersRepository.save(user);
    return { token: user.token };
  }
  async resetPassword(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException("Email is not registered")
    }
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    user.verificationCode = code;
    user.verificationCodeExpiry = new Date(Date.now() + 5 * 60 * 1000); //5 minutes
    await this.usersRepository.save(user);
    const htmlText = resetPasswordHtml(code, user.verificationCodeExpiry, user)
    try {

      this.mailerService.sendMail({
        to: user.email,
        subject: "Reset Password",
        html: htmlText,
      })
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to send reset password email")
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Code has been sent to your email"
    }
  }
  async verifyCode({ email, code }: { email: string, code: string }) {
    const user = await this.usersRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException("Email is not registered")
    }
    if (user.verificationCode !== code || user.verificationCodeExpiry! < new Date) {
      throw new UnauthorizedException("Invalid code")
    }
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    await this.usersRepository.save(user);
    return {
      statusCode: HttpStatus.OK,
      message: "Code verified successfully"
    }
  }
  async changePassword({ password, confirmedPassword }: confirmedPasswordDto, email: string) {
    const user = await this.usersRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException("Email is not registered")
    }
    if (password !== confirmedPassword) {
      throw new UnauthorizedException("Confirmed password dosen't match")
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    await this.usersRepository.save(user);
    return {
      statusCode: HttpStatus.OK,
      message: "Password changed successfully"
    }
  }

  // const logout = asynchandler(async (req,res,next) => {
  //     const LoggedOutUser = await User.findById(req.user.id);
  //     if(!LoggedOutUser){
  //         const error = errorhandler.createError(HttpStatus.FAIL ,404, "You are not logged in ");
  //         return next(error);
  //     }
  //     LoggedOutUser.token = " " ;
  //     await LoggedOutUser.save();
  //     res.clearCookie("access-token");
  //     res.status(200).json({status : HttpStatus.SUCCESS , message : "Logged out successfully"});
  // });

  // async  getForgetPassword() {
  //     response.render("getForgetPassword");
  // }

  // async getResetPassword () {
  //     const  id = req.params.id;
  //     const  token = req.params.token;
  //     const user = await User.findById(id);
  //     if(!user){
  //         const error = errorhandler.createError(HttpStatus.FAIL ,404, "Invalid user");
  //         return next(error);
  //     }
  //     const secret = process.env.JWT_SECRET + user.password ;
  //     try{

  //      jwt.verify(token , secret);
  //      res.render("reset-password" , {email:user.email} );
  //     }
  //     catch(err){
  //         const error = errorhandler.createError(HttpStatus.FAIL ,403, "Token expired");
  //         return next(error);
  //     }
  // }

}
