import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICustomer } from './customer.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCustomer(): Promise<ICustomer[]> {
    return await this.prisma.customer.findMany();
  }

  async getCustomerById(
    whereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<ICustomer | null> {
    return await this.prisma.customer.findUnique({
      where: { id: +whereUniqueInput },
    });
  }

  async getCustomerByInn(inn): Promise<ICustomer | null> {
    return await this.prisma.customer.findUnique({
      where: { individual_tax_number: inn },
    });
  }

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<ICustomer> {
    return await this.prisma.customer.create({
      data,
    });
  }

  async updateCustomer(params: {
    data: Prisma.CustomerUpdateInput;
    where: Prisma.CustomerWhereUniqueInput;
  }): Promise<ICustomer> {
    return await this.prisma.customer.update({
      where: { id: +params.where },
      data: { ...params.data, updated_on: new Date().toISOString() },
    });
  }

  async deleteCustomer(
    whereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<ICustomer> {
    return await this.prisma.customer.delete({
      where: { id: +whereUniqueInput },
    });
  }
}
