import { Tax } from '../customer/customer.type';

export interface IItem {
  id: number;
  name: string;
  created_on: Date;
  updated_on: Date;
  default_tax: Tax;
  description: string;
}
