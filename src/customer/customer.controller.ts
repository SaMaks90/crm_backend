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
import { Prisma } from '@prisma/client';

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
  async getCustomer(
    @Param('id') id: Prisma.CustomerWhereUniqueInput,
  ): Promise<ICustomer | null> {
    try {
      return await this.customerService.getCustomerById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createCustomer(
    @Body() data: Prisma.CustomerCreateInput,
  ): Promise<ICustomer> {
    try {
      const customer = await this.customerService.getCustomerByInn(
        data.individual_tax_number,
      );

      if (customer) {
        throw new HttpException(
          'This customer is created early.',
          HttpStatus.CONFLICT,
        );
      }

      return await this.customerService.createCustomer(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: Prisma.CustomerWhereUniqueInput,
    @Body() data: Prisma.CustomerUpdateInput,
  ): Promise<ICustomer> {
    try {
      return await this.customerService.updateCustomer({ where: id, data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteCustomer(
    @Param('id') id: Prisma.CustomerWhereUniqueInput,
  ): Promise<ICustomer> {
    try {
      const customer = await this.customerService.getCustomerById(id);

      if (!customer) {
        throw new HttpException('Don`t find customer', HttpStatus.NO_CONTENT);
      }

      return await this.customerService.deleteCustomer(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
