import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import {request} from "express";

@Injectable()
export class UserService {
  constructor(@InjectRepository(Category)
    private categoryRepository: Repository<Category>) {}


  // async GetOne(id: string): Promise<Category> {
  //   const user = await this.categoryRepository.find({});
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }



  async remove(id: string): Promise<{ Message: string }> {
    await this.categoryRepository.delete(id);
    return {Message: 'User deleted successfully'};
  }

}

