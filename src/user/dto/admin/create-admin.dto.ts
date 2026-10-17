
import { IsString, IsEmail, IsEnum, IsBoolean, IsNumber, IsUUID, Matches, IsOptional,Length, IsUrl, IsPhoneNumber } from 'class-validator';
export class CreateAdminDto {
        @IsString()
        name: string;
        @IsEmail()
        email: string;
        @IsString()
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        password: string;
        @IsEnum(["admin" , "user" ], { message: 'Role must be either "admin" or "user"' })
        role: string; 
        @IsString()
        @IsOptional()
        @IsUrl({}, { message: 'Avatar must be a valid URL' })
        avatar :string;
        @IsNumber() 
        @IsOptional()
        age : number
        @IsString()
        @Length(11)
        @IsOptional()
        @IsPhoneNumber("EG", { message: 'Phone number must be a valid phone number' })
        phoneNumber : string
        @IsString()
        @IsOptional()
        address : string
        @IsBoolean()
        @IsOptional()
        @IsEnum(["true" , "false" ], { message: 'Active must be either "true" or "false"' })
        active : boolean
        @IsString()
        @IsOptional()
        verificationCode : string
        @IsEnum(["male" , "female" ], { message: 'Gender must be either "male" or "female"' })
        @IsOptional()
        gender : string
}
