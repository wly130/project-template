import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import {ItemDto} from '../../validation/items.dto';

type Item = {id: number; name: string};

@Controller('api/items')
export class ItemsController {
    private readonly items = new Map<number, Item>();
    private nextId = 1;

    @Get()
    list() {
        return [...this.items.values()];
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        const item = this.items.get(id);
        if (!item) throw new NotFoundException('Item not found');
        return item;
    }

    @Post()
    create(@Body() {name}: ItemDto) {
        const item = {id: this.nextId++, name};
        this.items.set(item.id, item);
        return item;
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() {name}: ItemDto) {
        const item = this.get(id);
        item.name = name;
        return item;
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.get(id);
        this.items.delete(id);
    }
}
