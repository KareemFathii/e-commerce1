
import { IsString, IsEmail, IsEnum, IsBoolean, IsNumber, IsUUID, Matches, IsOptional,Length, IsUrl, IsPhoneNumber, isString } from 'class-validator';
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
