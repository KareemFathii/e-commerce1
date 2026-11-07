import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AdminCategoryController , UserCategoryController} from './controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Category])],
  controllers: [AdminCategoryController , UserCategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
