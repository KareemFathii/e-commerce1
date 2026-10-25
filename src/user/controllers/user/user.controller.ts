import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from "../../services/users/user/user.service";
import { AuthGuard } from '../../guards/auth/auth.guard';
import { RolesGuard } from "../../guards/roles/roles.guard";
import { Roles } from "../../decorators/roles.decorator";
import { UpdateUserDto } from '../../dto/user/auth.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @Roles(["user"])
  @UseGuards(AuthGuard, RolesGuard)
  GetOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.GetOne(id);
  }

  @Patch(':id')
  @Roles(["user"])
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true })) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(["user"])
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
