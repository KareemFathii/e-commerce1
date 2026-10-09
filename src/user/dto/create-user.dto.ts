import type { UserRole, Gender } from '../types/user.types';
import { IsString, IsEmail, IsEnum, IsBoolean, IsNumber, IsUUID, Matches, IsOptional,Length } from 'class-validator';
export class CreateUserDto {
        @IsUUID()
        id: string;
        @IsString()
        name: string;
        @IsEmail()
        email: string;
        @IsString()
        @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")  
        password: string;
        @IsEnum(["admin" , "user" ])
        role: UserRole; 
        @IsString()
        @IsOptional()
        avatar :string;
        @IsNumber() 
        @IsOptional()
        age : number
        @IsString()
        @Length(11)
        @IsOptional()
        phoneNumber : string
        @IsString()
        @IsOptional()
        address : string
        @IsBoolean()
        @IsOptional()
        @IsEnum(["true" , "false" ])
        active : boolean
        @IsString()
        @IsOptional()
        verificationCode : string
        @IsEnum(["male" , "female" ])
        @IsOptional()
        gender : Gender
        createdAt: Date;
}
