import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ItemService } from './item.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ItemService],
})
export class ItemModule {}
