import { Module } from '@nestjs/common';
import { UserService } from './services/admin/user.service';
import { UserController } from './controllers/admin/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController,AuthController],
  providers: [UserService , AuthService],
})
export class UserModule {}
