import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly CategoryRepo: Repository<Category>) { }


  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const exsistCateg = await this.CategoryRepo.findOne({ where: { name: createCategoryDto.name } })

    if (exsistCateg) {
      throw new BadRequestException("Category already exists")
    }
    const category = await this.CategoryRepo.create(createCategoryDto);
    await this.CategoryRepo.save(category);
    return category
  }

  async findAll() {
    return await this.CategoryRepo.find({ where: {}, relations: { subCategories: true } }); //relations:{subCategory:true}
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.CategoryRepo.findOne({ where: { id: id } });//relations:{subCategory:true}
    if (!category) {
      throw new NotFoundException("Category not found")
    }
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.CategoryRepo.findOne({ where: { id: id } })
    if (!category) {
      throw new NotFoundException("Category not found")
    }
    const updatedCategory = await this.CategoryRepo.save({ ...category, ...updateCategoryDto })
    return updatedCategory
  }

  async remove(id: string): Promise<{ message: string }> {
    const category = await this.CategoryRepo.delete(id)
    if (category.affected == 0) {
      throw new NotFoundException("Category not found")
    }
    return { message: "Category deleted successfully " }
  }
}
