import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, ValidationPipe, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Roles } from '../../user/decorators/roles.decorator';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../user/guards/roles/roles.guard';

@Controller('category')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post("admin/addCategory")
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.addCategory(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoryService.findAll();
  }
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.categoryService.findOne(name);
  }

  @Patch('admin/updateCategory/:id')
  @Roles(["admin"])
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, })) updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('admin/deleteCategory/:id')
  @Roles(["admin"])
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }

}
// ----------------------------------------------------------------------
// user role 


@Controller('user/category')
export class UserCategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Get(':id')
  @Roles(["user"])
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOne(id);
  }
}

