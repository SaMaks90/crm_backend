import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllItem(): Promise<any[] | []> {
    return await this.prisma.item.findMany();
  }

  async getItem(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<any | null> {
    return await this.prisma.item.findUnique({
      where: { id: +itemWhereUniqueInput.id },
    });
  }

  async createItem(data: Prisma.ItemCreateInput): Promise<any> {
    return await this.prisma.item.create({
      data,
    });
  }

  async updateItem(params: {
    where: Prisma.ItemWhereUniqueInput;
    data: Prisma.ItemUpdateInput;
  }): Promise<any> {
    const data = { ...params.data, updated_on: new Date().toISOString() };

    return await this.prisma.item.update({
      where: { id: +params.where },
      data,
    });
  }

  async deleteItem(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<any> {
    return await this.prisma.item.delete({
      where: itemWhereUniqueInput,
    });
  }
}
