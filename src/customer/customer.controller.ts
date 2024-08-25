import { CustomerService } from './customer.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ICustomer } from './customer.type';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomer(): Promise<ICustomer[] | []> {
    try {
      return await this.customerService.getAllCustomer();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getCustomer(@Param('id') id: number): Promise<ICustomer | null> {
    try {
      return await this.customerService.getCustomer({ id });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createCustomer(@Body() data): Promise<ICustomer> {
    try {
      return await this.customerService.createCustomer(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() data,
  ): Promise<ICustomer> {
    try {
      return await this.customerService.updateCustomer({ where: { id }, data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number): Promise<ICustomer> {
    try {
      return await this.customerService.deleteCustomer({ id });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
