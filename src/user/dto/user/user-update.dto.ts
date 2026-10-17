import { PartialType } from '@nestjs/mapped-types';
import { SignupCreateDto } from './signup-create.dto';

export class UpdateUserDto extends PartialType(SignupCreateDto) {}
