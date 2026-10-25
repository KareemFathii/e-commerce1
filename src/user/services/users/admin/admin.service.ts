import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from '../../../dto/admin/create-admin.dto';
import { UpdateAdminDto } from '../../../dto/admin/update-admin.dto';
import jwt from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import * as bcrypt from 'bcryptjs';



@Injectable()
export class AdminService {
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

  async findAll(query): Promise<User[]> {
    const {page , limit ,order} = query
    const skip = (page-1)* limit
    if(Number.isNaN(+limit) || Number.isNaN(+page) || limit < 1 || page < 1) 
      throw new HttpException('Invalid page or limit', 400); 
    return await this.usersRepository.find({skip, take : limit , order:{ "email" :"DESC"} ,
      select:{ id: true ,
               name : true ,
               email : true ,
               role : true,
               age : true,
               phoneNumber : true
      }});
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

