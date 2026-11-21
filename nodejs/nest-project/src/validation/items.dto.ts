import {Transform} from 'class-transformer';
import {IsNotEmpty, IsString} from 'class-validator';

export class ItemDto {
    @Transform(({value, obj}) => (typeof obj.name === 'string' ? value.trim() : obj.name))
    @IsString()
    @IsNotEmpty()
    name: string;
}
