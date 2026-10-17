import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from '../../services/admin/user.service';
import { CreateAdminDto } from '../../dto/admin/create-admin.dto';
import { UpdateAdminDto } from '../../dto/admin/update-admin.dto';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  create(@Body(new ValidationPipe({forbidNonWhitelisted: true , whitelist: true})) createAdminDto: CreateAdminDto) {
    return this.userService.create(createAdminDto);
  }

  @Get()
  @Roles(["admin"])
  @UseGuards(AuthGuard,RolesGuard)
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  @Roles(["admin"])
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }
f
  @Patch(':id')
  @Roles(["admin"])
  @UseGuards(AuthGuard,RolesGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body(
    new ValidationPipe({forbidNonWhitelisted: true , whitelist: true})) updateAdminDto: UpdateAdminDto) {
    return this.userService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Roles(["admin"])
  @UseGuards(AuthGuard,RolesGuard)
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
