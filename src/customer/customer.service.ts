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

  async getCustomer(
    whereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<ICustomer | null> {
    return await this.prisma.customer.findUnique({
      where: whereUniqueInput,
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
      where: params.where,
      data: { ...params.data, updated_on: new Date().toISOString() },
    });
  }

  async deleteCustomer(
    whereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<ICustomer> {
    return await this.prisma.customer.delete({ where: whereUniqueInput });
  }
}
