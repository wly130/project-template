import {IsInt, IsNotEmpty, IsString, Max, MaxLength, Min,} from 'class-validator';

export class getInfoListDto {
    @IsInt({message: '请传入当前页数'})
    @Min(1)
    page: number;

    @IsInt({message: '请传入每页条数'})
    @Min(10)
    @Max(20)
    pageSize: number;

    @IsString({message: '请传入搜索关键字'})
    @MaxLength(100)
    searchText: string;
}

export class addInfoDto {
    @IsString({message: '请传入名称'})
    name: string;
}

export class delInfoDto {
    @IsInt({message: '请传入Id'})
    @IsNotEmpty()
    id: number;

    @IsString({message: '请传入名称'})
    @IsNotEmpty()
    name: string;
}

export class updateInfoDto extends addInfoDto {
    @IsNotEmpty({message: '请传入Id'})
    @IsInt({message: '请传入Id'})
    id: number;
}