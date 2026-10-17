import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupCreateDto } from '../../dto/user/signup-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
    private usersRepository: Repository<User> , private jwtService: JwtService) {}

  async Signup(signupUserDto: SignupCreateDto) : Promise<User> {
    
    const existUser =  await this.usersRepository.findOne({ where: { email: signupUserDto.email } });
    if (existUser !== null) {
      throw new ConflictException('User already exists');
    }
    const { password, ...rest } = signupUserDto;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user =  this.usersRepository.create({...rest, password: hashedPassword});
    await this.usersRepository.save(user);
    return user; 
  }
  async signin(email: string, password: string): Promise <{token: string}> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if(!user){
      throw new UnauthorizedException('Invalid email or password');
    }
    const isMatchedPassword = await bcrypt.compareSync(password, user.password);
    if(!isMatchedPassword){
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: user.email, id: user.id , role: user.role, name: user.name };
    const token = await this.jwtService.signAsync(payload);
    user.token = token;
    await this.usersRepository.save(user);
    return {token: user.token};
  }
}
