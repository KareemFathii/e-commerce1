import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from '../../dto/admin/create-admin.dto';
import { UpdateAdminDto } from '../../dto/admin/update-admin.dto';
import jwt from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private usersRepository: Repository<User>) {}

  async create(createAdminDto: CreateAdminDto) : Promise<User> {
    
    const existUser =  await this.usersRepository.findOne({ where: { email: createAdminDto.email } });
    if (existUser !== null) {
      throw new ConflictException('User already exists');
    }
    const { password, ...rest } = createAdminDto;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user =  this.usersRepository.create({...rest, password: hashedPassword});
    await this.usersRepository.save(user);
    return user; 
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.save({ ...user, ...updateAdminDto });
  }

  async remove(id: string): Promise<{ Message: string }> {
     await this.usersRepository.delete(id);
     return {Message: 'User deleted successfully'};
    }
}

