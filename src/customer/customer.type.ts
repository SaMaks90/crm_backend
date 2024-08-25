export interface ICustomer {
  id: number;
  name: string;
  created_on: Date;
  updated_on: Date;
  individual_tax_number: string;
  tax: string;
  email?: string;
  phone?: string;
  comment?: string;
  type: string;
}

export enum Tax {
  'ZERO',
  'SEVEN',
  'TWENTY',
}

export enum TypeCustomer {
  IE,
  LLC,
}
