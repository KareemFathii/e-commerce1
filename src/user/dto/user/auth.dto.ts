import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsEnum, IsBoolean, IsNumber, Matches, IsOptional,Length, IsUrl, IsPhoneNumber, isString } from 'class-validator';

export class SigninDto {
    @IsEmail({}, { message: 'Email must be a valid email' })
    @IsString({ message: 'Email must be a string' })
    email: string;
    @IsString({ message: 'Password must be a string' })
    password: string;
}
export class SignupCreateDto {
        @IsString()
        name: string;
        @IsEmail()
        email: string;
        @IsString()
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        password: string;
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
        @IsEnum(["male" , "female" ], { message: 'Gender must be either "male" or "female"' })
        gender : string
}

export class UpdateUserDto extends PartialType(SignupCreateDto) {}


export class ResetPasswordDto {
    @IsEmail({}, { message: 'Email must be a valid email' })
    @IsString({ message: 'Email must be a string' })
    email: string;
}

export class confirmedPasswordDto{
    // @IsEmail({}, { message: 'Email must be a valid email' })
    // @IsString({ message: 'Email must be a string' })
    // email: string;
    @IsString({ message: 'Password must be a string' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
    password: string;
    @IsString({ message: 'Confirmed Password required' })
    confirmedPassword: string;
}
