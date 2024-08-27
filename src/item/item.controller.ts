import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  async getAllItem(): Promise<any[] | []> {
    try {
      return await this.itemService.getAllItem();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getItem(@Param('id') id): Promise<any> {
    try {
      return this.itemService.getItem({ id });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createItem(@Body() data): Promise<any> {
    try {
      return await this.itemService.createItem(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateItem(@Param('id') id, @Body() data): Promise<any> {
    try {
      return await this.itemService.updateItem({ where: id, data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<any> {
    try {
      return await this.itemService.deleteItem({ id });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
