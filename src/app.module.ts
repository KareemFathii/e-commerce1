import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import {JwtModule} from '@nestjs/jwt';


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
    }),ConfigModule.forRoot(), UserModule, JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ,
      signOptions: { expiresIn: '1h' }
    })],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
