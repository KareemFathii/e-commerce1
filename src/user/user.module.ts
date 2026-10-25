import { Module } from '@nestjs/common';
import { AdminService } from './services/users/admin/admin.service';
import { UserController } from './controllers/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './services/users/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/users/user/user.service';
import { AdminController } from './controllers/admin/admin.controller';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Category])],
  controllers: [UserController,AuthController, AdminController],
  providers: [AdminService , AuthService,UserService],
})
export class UserModule {}
