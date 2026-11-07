import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Roles } from '../user/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../user/guards/roles/roles.guard';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}


  @Post("admin/addSubCategory")
  @Roles(["admin"])
  @UseGuards(AuthGuard,RolesGuard)
  addSubCategory(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoryService.create(createSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(id);
  }

  @Patch('admin/updateSubCategory/:id')
  @Roles(["admin"])
  @UseGuards(AuthGuard,RolesGuard)
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.update(id, updateSubcategoryDto);
  }

  @Delete('admin/deleteSubCategory/:id')
  @Roles(["admin"])
  @UseGuards(AuthGuard,RolesGuard)
  remove(@Param('id') id: string) {
    return this.subcategoryService.remove(id);
  }
}
