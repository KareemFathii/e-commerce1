import { IsString, Length } from "class-validator";

export class CreateSubcategoryDto {
    @IsString()
    @Length(3, 20)
    name: string
    @IsString()
    category: string

}
