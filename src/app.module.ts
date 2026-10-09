import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: "Admin123",
      database: 'e-commerce-backend',
      autoLoadEntities: true,
      synchronize: true,
    }),ConfigModule.forRoot(), UserModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
