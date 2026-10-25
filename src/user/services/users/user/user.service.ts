import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import {UpdateUserDto} from "../../../dto/user/auth.dto";
import {request} from "express";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private usersRepository: Repository<User>) {}


  async GetOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } ,
        select :{
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          age: true,
          phoneNumber: true,
          address: true,
          verificationCode: false,
          gender: true,
          }});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } ,select :{
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      age: true,
      phoneNumber: true,
      address: true,
      gender: true,
    }});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }


  async remove(id: string): Promise<{ Message: string }> {
    await this.usersRepository.delete(id);
    return {Message: 'User deleted successfully'};
  }

}

