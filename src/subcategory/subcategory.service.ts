import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class SubcategoryService {
  constructor(@InjectRepository(Subcategory) private readonly subCategoryRepo: Repository<Subcategory>,
              @InjectRepository(Category) private readonly CategoryRepo: Repository<Category>    
) { }

  async create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const subCategory = await this.subCategoryRepo.findOne({ where: { name: createSubcategoryDto.name } })
    if (subCategory) {
      throw new ConflictException('SubCategory already exists')
    }
    const categoryExsist = await this.CategoryRepo.findOne({where:{name:createSubcategoryDto.category}})
    if(!categoryExsist){
      throw new NotFoundException("category not found")
    }
    
    const newSubCategory = await this.subCategoryRepo.create({ name: createSubcategoryDto.name, category: { name: createSubcategoryDto.category } })
    await this.subCategoryRepo.save(newSubCategory)
    return newSubCategory;
  }

  async findAll(): Promise<Subcategory[]> {
    return await this.subCategoryRepo.find({ relations: { category: true } })//select:{name:true,id:true,category:{name:true,id:true}}
  }

  async findOne(id: string): Promise<Subcategory> {
    const subCategory = await this.subCategoryRepo.findOne({ where: { id: id } })
    if (!subCategory) {
      throw new NotFoundException("SubCategory not found")
    }
    return subCategory;
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    const exsist = await this.subCategoryRepo.findOne({ where: { id } });
    if (!exsist) {
      throw new NotFoundException("SubCategory not found ")
    }
    return await this.subCategoryRepo.save({ ...updateSubcategoryDto, ...exsist });
  }

  async remove(id: string): Promise<{}> {
    const deleteSubCategory = await this.subCategoryRepo.delete(id)
    if (deleteSubCategory.affected === 0) {
      throw new NotFoundException("SubCategory not found")
    }
    return { message: "SubCategory deleted successfully" }
  }
}
