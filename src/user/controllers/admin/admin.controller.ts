import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards, Query } from '@nestjs/common';
import { AdminService } from '../../services/users/admin/admin.service';
import { CreateAdminDto } from '../../dto/admin/create-admin.dto';
import { UpdateAdminDto } from '../../dto/admin/update-admin.dto';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('admin/users')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post("create")
  create(@Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true })) createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @Roles(["admin"])
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query() query) {
    return this.adminService.findAll(query);
  }
  @Get(':id')
  @Roles(["admin"])
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @Roles(["admin"])
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true })) updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Roles(["admin"])
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.remove(id);
  }
}
