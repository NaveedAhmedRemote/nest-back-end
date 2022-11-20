import { PartialType } from '@nestjs/mapped-types';
import { CreateWarhaDto } from './create-warha.dto';

export class UpdateWarhaDto extends PartialType(CreateWarhaDto) {}
